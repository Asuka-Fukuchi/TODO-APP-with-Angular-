import { Component, OnInit } from '@angular/core';

import { Task } from '../task.inter';
import { TaskComponent } from '../task/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../../material/material-module';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [MaterialModule, TaskComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

export class TasksComponent implements OnInit {
  showMessage = false;
  submitted = false;

  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  addTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get title() {
    return this.addTaskForm.get('title')!;
  }

  get description() {
    return this.addTaskForm.get('description')!;
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe((tasks: Task[]) => {
      this.todo = [];
      this.inProgress = [];
      this.done = [];

      tasks.forEach(task => {
        switch (task.list) {
          case 'todo':
            this.todo.push(task);
            break;
          case 'inProgress':
            this.inProgress.push(task);
            break;
          case 'done':
            this.done.push(task);
            break;
        }
      });
    });
  }

  addTask(): void {
    if (this.addTaskForm.invalid) {
      return;
    }
    const title = this.addTaskForm.value.title!;
    const description = this.addTaskForm.value.description!;
    const newTask: Task = { title, description, list: 'todo' };

    this.taskService.addTask(newTask).then(res => {
      newTask.id = res.id;
      this.todo.push(newTask);
      this.addTaskForm.reset();
    });
  }

  update(task: Task): void {
    this.taskService.update(task).then(() => {
      console.log('Task updated:', task);
    });
  }

  deleteIt(list: string, task: Task): void {
    this.taskService.deleteTask(task).then(() => {
      if (list === 'todo') {
        this.todo = this.todo.filter(t => t !== task);
      } else if (list === 'inProgress') {
        this.inProgress = this.inProgress.filter(t => t !== task);
      } else if (list === 'done') {
        this.done = this.done.filter(t => t !== task);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const movedTask = event.container.data[event.currentIndex];
    movedTask.list = event.container.id;
    this.update(movedTask);
  }

  editMode = false;
  editTaskData: Task | null = null;

  editTaskForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  editTask(list: string, task: Task): void {
    this.editMode = true;
    this.editTaskData = { ...task };
    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
    });
    console.log('Edit task:', list, task);
  }

  updateTaskDetails(): void {
    if (!this.editTaskData || this.editTaskForm.invalid) return;

    const updatedTask: Task = {
      ...this.editTaskData,
      title: this.editTaskForm.value.title!,
      description: this.editTaskForm.value.description!
    };

    this.taskService.updateDetails(updatedTask).then(() => {
      this.editMode = false;
      this.editTaskData = null;
      this.loadTasks();
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editTaskData = null;
  }
}
