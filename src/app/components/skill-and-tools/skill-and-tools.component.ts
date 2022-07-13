import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-skill-and-tools',
    templateUrl: './skill-and-tools.component.html',
    styleUrls: ['./skill-and-tools.component.scss']
})
export class SkillAndToolsComponent implements OnInit {

    counter = new BehaviorSubject(0);

    constructor() {
        setInterval(()=>{
            this.counter.next(this.counter.value+1);
            this.counter.next(this.counter.value%12);
        },1000);
    }

    ngOnInit(): void {
    }

}
