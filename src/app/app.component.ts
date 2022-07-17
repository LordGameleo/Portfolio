import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounce } from '../utils/debounce';
import { fullpage_api, options } from '../utils/fullpage';

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
    config!: options;
    fullpage_api!: fullpage_api;

    constructor() {
        this.config = {

            // fullpage options
            licenseKey: 'gplv3-license',
            anchors: ['home', 'about', 'skills', 'work', 'contact'],
			lockAnchors: false,
			scrollOverflow: false,
			slidesNavigation: false,
			controlArrows: false,
			slidesNavPosition: 'bottom',
			loopHorizontal: false,
			scrollOverflowReset: true,
            normalScrollElements: 'scrollable',
			scrollOverflowOptions: {
				'fadeScrollbars' : true
			},

            // fullpage callbacks
            afterResize: () => {
                console.log("After resize");
            },
            afterLoad: (origin: any, destination: any, direction: any) => {
                console.log("Loaded");
            }
        };
    }

    ngOnInit() {
    }

    getRef(fullPageRef:any) {
        this.fullpage_api = fullPageRef;
    }

}
