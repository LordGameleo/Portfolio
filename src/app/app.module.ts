import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { NgtCoreModule } from '@angular-three/core';
import { NgtStatsModule } from '@angular-three/core/stats'
import { NgtCameraModule } from '@angular-three/core/cameras';
import { NgtPrimitiveModule } from '@angular-three/core/primitive';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtAmbientLightModule, NgtDirectionalLightModule, NgtSpotLightModule } from '@angular-three/core/lights';
import { NgtAxesHelperModule, NgtCameraHelperModule, NgtDirectionalLightHelperModule, NgtSpotLightHelperModule } from '@angular-three/core/helpers';
import { NgtBoxGeometryModule, NgtPlaneGeometryModule, NgtTorusGeometryModule, NgtTorusKnotGeometryModule } from '@angular-three/core/geometries';
import { NgtMeshBasicMaterialModule, NgtMeshPhongMaterialModule, NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtSobaOrbitControlsModule } from '@angular-three/soba/controls';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { WorkComponent } from './components/work/work.component';
import { SkillAndToolsComponent } from './components/skill-and-tools/skill-and-tools.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    AboutComponent,
    NavBarComponent,
    ContactComponent,
    HomeComponent,
    WorkComponent,
    SkillAndToolsComponent,
  ],
  imports: [
    AngularFullpageModule,
    BrowserAnimationsModule,
    NgtStatsModule,
    NgtTorusKnotGeometryModule,
    NgtCameraModule,
    NgtCameraHelperModule,
    NgtMeshBasicMaterialModule,
    NgtSpotLightHelperModule,
    NgtSpotLightModule,
    NgtDirectionalLightModule,
    NgtDirectionalLightHelperModule,
    NgtAmbientLightModule,
    NgtAxesHelperModule,
    NgtPlaneGeometryModule,
    NgtSobaOrbitControlsModule,
    NgtPrimitiveModule,
    NgtBoxGeometryModule,
    NgtMeshStandardMaterialModule,
    NgtMeshPhongMaterialModule,
    NgtMeshModule,
    NgtCoreModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
