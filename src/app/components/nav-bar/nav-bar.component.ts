import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnChangeValue } from 'react-select';
import { BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/enums/Page.enum';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnChanges {

    currentPage!: BehaviorSubject<Page>;
    pageEnum = Page;

    constructor(private activatedRoute: ActivatedRoute, public route: Router) {
        this.currentPage = new BehaviorSubject<Page>(Page.HOME);
        this.activatedRoute.fragment.subscribe({
            next: (value: any) => {
                switch(value){
                    case 'home': this.currentPage.next(Page.HOME); break;
                    case 'about': this.currentPage.next(Page.ABOUT); break;
                    case 'skills':  this.currentPage.next(Page.SKILL_AND_TOOLS); break;
                    case 'work':  this.currentPage.next(Page.WORK); break;
                    case 'contact':  this.currentPage.next(Page.CONTACT); break;
                    default: this.currentPage.next(Page.HOME); break;
                }
            }
        })
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes['currentPage'].previousValue,changes['currentPage'].currentValue);
    }

    ngOnInit(): void {
    }

}
