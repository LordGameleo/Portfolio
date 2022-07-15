import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-skill-and-tools',
    templateUrl: './skill-and-tools.component.html',
    styleUrls: ['./skill-and-tools.component.scss']
})
export class SkillAndToolsComponent implements OnInit {

    counter = new BehaviorSubject(0);
    interval:any;

    constructor(private activatedRoute: ActivatedRoute) {
        activatedRoute.fragment.subscribe({
            next: (fragment) => {
                if (fragment == 'skills') {
                    this.interval = setInterval(() => {
                        console.log('interval')
                        this.counter.next(this.counter.value + 1);
                        this.counter.next(this.counter.value % 12);
                    }, 1000);
                }
                else {
                    this.counter.next(0);
                    clearInterval(this.interval);
                }

            }
        })
    }

    ngOnInit(): void {
    }

}
