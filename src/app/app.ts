import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MaterialModule } from './material/material-module';

import { HeaderComponent } from './components/header/header';
import { SideNavComponent } from './components/side-nav/side-nav';
import { HomeComponent } from './components/home/home';
import { TaskComponent } from './components/task/task';
import { TasksComponent } from './components/tasks/tasks';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MaterialModule, 
    HeaderComponent, 
    SideNavComponent,
    HomeComponent,
    TaskComponent,
    TasksComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Todo-app';
}
