import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounce } from '../utils/debounce';

const componentsSequence = ['home', 'about', 'skills', 'work', 'contact'];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [       // metadata array
        // trigger('visibility',
        //     [
        //         transition(':enter', [
        //             style({ transform: 'translateX(100%)', opacity: 0 }),
        //             animate('500ms', style({ transform: 'translateX(100%)', opacity: 1 }))
        //         ]),
        //         transition(':leave', [
        //             style({ transform: 'translateX(0)', opacity: 1 }),
        //             animate('500ms', style({ transform: 'translateX(100%)', opacity: 1 }))
        //         ])
        //     ]
        // )
    ],
})
export class AppComponent {
    title = 'PortFolio';
    key!: string;
    currentStep: BehaviorSubject<number> = new BehaviorSubject(0);
    scrollingElement!: Element;
    elementPositionArray: number[] = [0, 704, 1408, 2112, 2816];

    constructor(private route: ActivatedRoute) {
        this.scrollingElement = document.scrollingElement as Element;
    }

    ngOnInit() {
        this.route.fragment.subscribe(
            {
                next: (fragment: string | null) => {
                    console.log(fragment);
                    switch (fragment) {
                        case componentsSequence[0]: this.toggleToStep(0); break;
                        case componentsSequence[1]: this.toggleToStep(1); break;
                        case componentsSequence[2]: this.toggleToStep(2); break;
                        case componentsSequence[3]: this.toggleToStep(3); break;
                        case componentsSequence[4]: this.toggleToStep(4); break;
                    }
                    console.log(this.currentStep);
                }
            }
        )
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



    toggleNext() {
        if (this.currentStep.value < this.elementPositionArray.length - 1) {
            this.currentStep.next(this.currentStep.value+1);
        }
    }

    togglePrevious() {
        if (this.currentStep.value) {
            this.currentStep.next(this.currentStep.value-1);
        }
    }

    toggleToStep(step:number) {
        this.currentStep.next(step);
    }
}
