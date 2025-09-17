import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../task.inter';
import { MaterialModule } from '../../material/material-module';

@Component({
  selector: 'app-task',
  imports: [MaterialModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})

export class TaskComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  constructor() { }
  ngOnInit(): void {
  }
}


