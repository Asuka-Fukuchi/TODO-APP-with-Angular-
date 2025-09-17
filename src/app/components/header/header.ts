import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material/material-module';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})

export class HeaderComponent implements OnInit{
  @Output() public sideNavToggle = new EventEmitter();
  
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void { 
    setInterval(() => {
      this.isLoggedIn = this.authService.isLogged;
    }, 1000);   
  }
  
  onToggleSidenav(){
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.SignOut();
  }
}
