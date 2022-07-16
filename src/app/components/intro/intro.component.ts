import { NgtCamera, NgtCreatedState, NgtLoader, NgtSize } from '@angular-three/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationClip, AnimationMixer, Box3, Clock, Color, DoubleSide, FogExp2, Group, LoopOnce, LoopRepeat, Material, Mesh, PerspectiveCamera, Scene, SpotLight, Texture, Vector2, Vector3 } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three-stdlib';
import { Easing, Tween } from '@tweenjs/tween.js'
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/enums/Page.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

  modelHouse$: Observable<GLTF> = this.loader.use(GLTFLoader, '../../../assets/3d-models/forest_house/scene.gltf');
  modelRobot$: Observable<GLTF> = this.loader.use(GLTFLoader, '../../../assets/3d-models/robot/RobotExpressive.glb');
  modelBoard$: Observable<GLTF> = this.loader.use(GLTFLoader, '../../../assets/3d-models/intro_board/intro_board.gltf');
  camera!: NgtCamera;
  scene!: Scene;
  house!: Group;
  first = true;
  size!: NgtSize;
  planeSize!: number;
  planeMaterialParameters!: any;
  planeTexture!: Texture;
  controls!: OrbitControls;
  robot!: Group;
  robotAnimations!: AnimationClip[];
  animationMixer!: AnimationMixer;
  clock: Clock = new Clock();
  math = Math;
  vector2 = new Vector2(1, 1)
  spotLight!: SpotLight;
  robotWalkingAnimation: AnimationClip | undefined;
  robotTween!: Tween<any>;
  houseTween!: Tween<any>;
  animationDone: boolean = false;
  robotWaveAnimation: AnimationClip | undefined;
  board!: Group;
  boardMaterials: Material[] = [];
  cursor!: Vector3;
  torusPosition: Vector3 = new Vector3();
  torusCursor!: Mesh;
  page!: Page;
  pageEnum = Page;



  constructor(private loader: NgtLoader, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit(): void {
  }

  setDefaultCamera() {
    console.log("Default")
    this.camera.position.set(0, 1, 4);
    (this.camera as PerspectiveCamera).fov = 50;
  }

  setSceneBackground() {
    this.scene.background = new Color('rgb(193, 219, 227)');
  }


  scaleHouse(scale: number) {
    this.house.scale.setScalar(scale);
  }

  positionHouse(x: number, y: number, z: number) {
    this.house.position.set(x, y, z);
  }

  setFog(density: number) {
    this.scene.fog = new FogExp2('#ffedcf', density);
  }

  setZoom(target: boolean) {
    this.controls.enableZoom = target;
  }

  setPan(target: boolean) {
    this.controls.enablePan = target;
  }

  setRotate(target: boolean) {
    this.controls.enableRotate = target;
  }


  setMinZoomDist(minZoomValue: number) {
    this.controls.minDistance = minZoomValue;
  }

  setMaxZoomDist(maxZoomValue: number) {
    this.controls.maxDistance = maxZoomValue;
  }

  setMinXRotateAngle(minRotateValue: number) {
    this.controls.minAzimuthAngle = minRotateValue;
  }

  setMaxXRotateAngle(maxRotateValue: number) {
    this.controls.maxAzimuthAngle = maxRotateValue;
  }

  setMinYZRotateAngle(minRotateValue: number) {
    this.controls.minPolarAngle = minRotateValue;
  }

  setMaxYZRotateAngle(maxRotateValue: number) {
    this.controls.maxPolarAngle = maxRotateValue;
  }


  canvasCreated(createdScene: NgtCreatedState) {
    console.log("Created")
    this.camera = createdScene.camera;
    this.scene = createdScene.scene;
    this.size = createdScene.size;
    this.setSceneBackground();
    this.setDefaultCamera();
  }



  setHouseAtDefaultPosition() {
    let bb = new Box3().setFromObject(this.house);
    let size = bb.getSize(new Vector3());
    this.positionHouse(0.5, -1 * size.y / 2, 0);
  }


  setHouse(house: Group) {
    this.camera.visible = true;
    this.house = house;
    this.house.rotation.y = Math.PI / 2.8;
    this.scaleHouse(22);
    this.setHouseAtDefaultPosition();
  }

  setRobot(robot: GLTF) {
    this.robot = robot.scene;
    this.robot.scale.setScalar(0.1);
    let bb = new Box3().setFromObject(this.house ? this.house : new Group());
    let size = bb.getSize(new Vector3());
    this.robot.rotation.y = 0;
    this.robot.position.set(-0.3, -1 * size.y / 2 + 0.25, 0.75);

    this.robotAnimations = robot.animations;
    console.log(this.robotAnimations)
    this.animationMixer = new AnimationMixer(this.robot);
    this.robotWalkingAnimation = this.robotAnimations.find((value: AnimationClip) => value.name == "Walking");
    this.robotWaveAnimation = this.robotAnimations.find((value: AnimationClip) => value.name == "Wave");


    if (this.robotWalkingAnimation) {
      this.walkRobotToRoad(this.robotWalkingAnimation);
    }
  }

  setBoard(board: GLTF) {
    this.board = board.scene;
    this.board.scale.setScalar(0.1);
    this.board.up.set(0, 1, 1);
    this.board.rotation.x = Math.PI / 2;
    this.board.rotation.z = this.robot.rotation.z + 0.29;
    this.board.position.x = -0.2;
    this.board.position.y = -0.3;
    this.board.position.z = 1.2;
    this.board.traverse((node: any) => {
      if (node.material) {
        node.material.opacity = 0;
        node.material.transparent = true;
        this.boardMaterials.push(node.material);
      }
    });
  }

  walkRobotToRoad(animation: AnimationClip) {
    const walkOut = this.animationMixer.clipAction(animation)
      .setEffectiveTimeScale(0.75)
      .setEffectiveWeight(1)
      .play();
    let position = { z: this.robot.position.z };
    this.robotTween = new Tween(position)
      .to({
        z: 1.2
      }, 2000)
      .easing(Easing.Linear.None)
      .onUpdate(() => {
        this.robot.position.z = position.z
        this.camera.lookAt(this.robot.position);
      })
      .onComplete(() => {
        walkOut.stop();
        this.lowerTheCamera();
        this.robotTween.stop();
      }).start();
  }

  lowerTheCamera() {
    let positionAndOpacity = { y: this.camera.position.y, opacity: 0, x: this.camera.position.x };
    this.robotTween = new Tween(positionAndOpacity)
      .to({
        y: 0,
        x: -0.93,
        opacity: 1
      }, 1000)
      .easing(Easing.Linear.None)
      .onUpdate(() => {
        this.boardMaterials.forEach((material: Material) => {
          material.opacity = positionAndOpacity.opacity;
        })
        this.camera.position.y = positionAndOpacity.y;
        this.camera.position.x = positionAndOpacity.x;
        this.robot.lookAt(this.camera.position.clone().sub(new Vector3(0, 1, 0)));
        this.camera.lookAt(this.robot.position.clone().add(new Vector3(0.1, 1.2, 0)));
      })
      .onComplete(() => {
        this.robotTween.stop();
        this.animationDone = true;
        if (this.robotWaveAnimation) {
          this.waveToCamera(this.robotWaveAnimation);
        }
      }).start();
  }

  waveToCamera(animation: AnimationClip) {
    let position = { y: this.camera.position.y };
    const wave = this.animationMixer.clipAction(animation)
      .setEffectiveTimeScale(0.75)
      .setEffectiveWeight(1)
      .play().setLoop(LoopRepeat, 2);

    this.robotTween = new Tween(position)
      .to({
        y: 0
      }, 1000)
      .easing(Easing.Linear.None)
      .onUpdate(() => {
        this.controls.enabled = true;
      })
      .onComplete(() => {
        this.robotTween.stop();
      }).start();
  }


  setPlaneMaterialParameters() {
    this.planeMaterialParameters = {
      map: this.planeTexture,
      side: DoubleSide,
    }
  }


  setOrbitControl(control: OrbitControls) {
    console.log("Setting Orbital Control")
    this.controls = control;
    this.controls.target = this.robot.position.clone().add(new Vector3(0, 1.2, 0));
    this.controls.enabled = false;
    this.setZoom(false);
    this.setPan(false);
    this.setMaxXRotateAngle(Math.PI / 6);
    this.setMinXRotateAngle(-1 * Math.PI / 6);
    this.setMaxYZRotateAngle(Math.PI / 2);
    this.setMinYZRotateAngle(Math.PI / 3);
  }

  setLightOnRobot(spotLight: SpotLight) {
    this.spotLight = spotLight;
  }

  createTorusCursor(torusCursor: Mesh) {
    this.torusCursor = torusCursor;
  }

  onMouseMove(event: any) {
    if (this.cursor) {
      this.cursor.x = (event.clientX / window.innerWidth) * 2 - 2;
      this.cursor.y = - (event.clientY / window.innerHeight) * 2 + 0.5;
      this.cursor.z = 5;
    }
    else {
      this.cursor = new Vector3();
      this.cursor.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.cursor.y = - (event.clientY / window.innerHeight) * 2 + 1;
      this.cursor.z = 20;
    }
    this.torusPosition.x = this.cursor.x;
    this.torusPosition.y = this.cursor.y;
  }


  animate(event: any) {
    if (this.first) {
      this.first = false;
      console.log("Event", event);
    }
  }

  animateRobot() {
    if (this.cursor)
      this.robot.lookAt(this.cursor);
    this.animationMixer?.update(this.clock.getDelta());
    this.robotTween?.update();
    this.houseTween?.update();
  }

  animateRandomAction() {
    const randomActionIndex = Math.round(Math.random() * (this.robotAnimations?.length - 1));
    this.animationMixer.stopAllAction();

    const animation = this.animationMixer?.clipAction(this.robotAnimations[randomActionIndex])
      ?.setEffectiveTimeScale(1)
      ?.setEffectiveWeight(1)
      ?.play()?.setLoop(LoopOnce, 1);

    this.robotTween = new Tween({ y: 10 })
      .to({
        y: 0
      }, 1000)
      .easing(Easing.Linear.None)
      .onUpdate(() => {
        this.controls.enabled = true;
      })
      .onComplete(() => {
        this.robotTween.stop();
      }).start();
  }

  animateCursor() {
    this.torusCursor.position.x = this.cursor?.x + 0.3;
    this.torusCursor.position.y = this.cursor?.y + 0.8;
    this.torusCursor.position.z = this.camera?.position?.z - 0.7;
  }


  test(event: any) {
    console.log("Event", event)
  }

  removeHouse() {
    console.log()
    let opacity = { v: 1 }

    this.house.traverse((object: any) => {
      if(object?.material)
      console.log(object)
    })
    this.houseTween = new Tween(opacity)
      .to({
        v: 0
      }, 3000)
      .easing(Easing.Linear.None)
      .onUpdate(() => {
        console.log("HERE")
      }).start();
    
  }


}


