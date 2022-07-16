import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { WorkData, WORK_DATA,  } from '../../constant/work-data';

@Component({
    selector: 'app-work',
    templateUrl: './work.component.html',
    styleUrls: ['./work.component.scss'],
    animations: [
        trigger('spin', [
            transition(':increment', [
                style({ transform: 'rotate(0deg)' }),
                animate('1.5s', style({ transform: 'rotate(-90deg)' }))
            ]),
            transition(':decrement', [
                style({ transform: 'rotate(0deg)' }),
                animate('1.5s', style({ transform: 'rotate(90deg)' }))
            ])
        ])
    ]
})
export class WorkComponent implements OnInit {

    counter = 0;
    dataArray!:WorkData[];
    data!:WorkData;
    constructor() {
        this.dataArray = WORK_DATA;
        this.data = this.dataArray[0];
    }

    ngOnInit(): void {
    }

    togglePrev() {
        this.counter--;
    }

    toggleNext() {
        this.counter++;
    }

    setContent(){
        this.data = this.dataArray[(this.counter + 10*this.dataArray.length) % this.dataArray.length];
    }


}
