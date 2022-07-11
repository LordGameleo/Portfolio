import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounce } from '../utils/debounce';
import { fullpage_api, options } from '../utils/fullpage';

const componentsSequence = ['home', 'about', 'skills', 'work', 'contact'];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    title = 'PortFolio';
    key!: string;
    currentStep: BehaviorSubject<number> = new BehaviorSubject(0);
    scrollingElement!: Element;
    elementPositionArray: number[] = [0, 704, 1408, 2112, 2816];
    config!: options;
    fullpage_api!: fullpage_api;

    constructor(private route: ActivatedRoute) {
        this.scrollingElement = document.scrollingElement as Element;
        this.config = {

            // fullpage options
            licenseKey: 'gplv3-license',
            anchors: ['home', 'about', 'skills', 'work', 'contact'],
            dragAndMove: true,

            // fullpage callbacks
            afterResize: () => {
                console.log("After resize");
            },
            afterLoad: (origin: any, destination: any, direction: any) => {
                console.log(origin.index);
            }
        };
    }

    ngOnInit() {
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event.key);
        if (event.key?.toUpperCase() === 'ARROWLEFT') {
            this.togglePrevious();
        }
        else if (event.key?.toUpperCase() === 'ARROWRIGHT') {
            this.toggleNext();
        }
        else if (event.key?.toUpperCase() === 'ARROWUP') {
            this.togglePrevious();
        }
        else if (event.key?.toUpperCase() === 'ARROWDOWN') {
            this.toggleNext();
        }
        else if (event.key?.toUpperCase() === ' ') {
            this.toggleNext();
        }
        else if (event.key?.toUpperCase() === 'ENTER') {
            this.toggleNext();
        }
        else if (event.key?.toUpperCase() === 'PAGEUP') {
            this.togglePrevious();
        }
        else if (event.key?.toUpperCase() === 'PAGEDOWN') {
            this.toggleNext();
        }
    }

    @HostListener("mousewheel", ["$event"])
    @debounce(1000, { leading: true, maxWait: 1000, trailing: false })
    onMouseWheel(event: WheelEvent) {
        console.log("Changing", event)
        if (event.deltaY > 0) {
            this.toggleNext();
        }
        else if (event.deltaY < 0) {
            this.togglePrevious();
        }

    }


    getRef(fullPageRef:any) {
        this.fullpage_api = fullPageRef;
    }


    toggleNext() {
        if (this.currentStep.value < this.elementPositionArray.length - 1) {
            this.currentStep.next(this.currentStep.value + 1);
        }
    }

    togglePrevious() {
        if (this.currentStep.value) {
            this.currentStep.next(this.currentStep.value - 1);
        }
    }

    toggleToStep(step: number) {
        this.currentStep.next(step);
    }
}
