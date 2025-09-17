import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav-list',
  imports: [MaterialModule, RouterModule],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css'
})

export class SideNavComponent implements OnInit{
  @Output() sidenavClose = new EventEmitter();
  constructor(){}
  ngOnInit(): void {    
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}