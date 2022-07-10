import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/enums/Page.enum';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  pageEnum = Page;
  goToPage!:Page;
  currentPage!: Page;

  constructor() { }

  ngOnInit(): void {
  }

  navigate(targetPage:Page){
    this.goToPage = targetPage;
    // Do stuff
    this.currentPage = targetPage;
  }

}
