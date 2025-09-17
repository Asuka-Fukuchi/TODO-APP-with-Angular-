import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../components/task.inter';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasksCollection;

  constructor(private firestore: Firestore) {
    this.tasksCollection = collection(this.firestore, 'tasks');
  }

  addTask(task: Task): Promise<any> {
    return addDoc(this.tasksCollection, task);
  }

  getAllTasks(): Observable<Task[]> {
    return collectionData(this.tasksCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  update(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, { list: task.list });
  }

  updateDetails(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, {
      title: task.title,
      description: task.description
    });
  }

  deleteTask(task: Task): Promise<void> {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return deleteDoc(taskDoc);
  }
}
