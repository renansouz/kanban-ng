import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, query, where, DocumentData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { Subscription } from 'rxjs';

interface Column {
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    DragDropModule,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  tasksSubscription?: Subscription;

  taskTitle: string = '';
  taskDescription: string = '';

  columns: Column[] = [
    { name: 'Ideas', tasks: [] },
    { name: 'In progress', tasks: [] },
    { name: 'Done', tasks: [] },
  ];

  ngOnInit() {
    this.loadTasks();
  }

  async addTask() {
    const user = this.auth.currentUser;
    if (!user) return alert('User not authenticated');

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
      column: this.columns[0].name,
      title: this.taskTitle,
      description: this.taskDescription,
      createdAt: new Date(),
      userId: user.uid,
    };

    const tasksCollection = collection(this.firestore, 'tasks');
    await addDoc(tasksCollection, newTask);

    this.columns[0].tasks.push(newTask); // Add to "Ideas" column

    this.taskTitle = '';
    this.taskDescription = '';
  }

  async loadTasks() {
    const user = this.auth.currentUser;
    if (!user) return;

    const tasksCollection = collection(this.firestore, 'tasks');
    const userTasksQuery = query(tasksCollection, where('userId', '==', user.uid));

    // Unsubscribe from previous subscription to prevent memory leaks
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }

    // Fetch tasks that belong to the current user
    this.tasksSubscription = collectionData(userTasksQuery, { idField: 'id' }).subscribe((tasks: DocumentData[]) => {
      this.columns.forEach((column) => (column.tasks = [])); // Clear columns

      // Map the raw data (DocumentData) to Task type
      tasks.forEach((taskData: DocumentData) => {
        const task: Task = {
          id: taskData['id'],
          title: taskData['title'],
          description: taskData['description'],
          createdAt: taskData['createdAt'].toDate(), // Firestore timestamp to JavaScript Date
          userId: taskData['userId'],
          column: taskData['column']
        };

        const column = this.columns.find((col) => col.name === task.column);
        if (column) {
          column.tasks.push(task);
        }
      });
    });
  }

  async drop(event: CdkDragDrop<Task[]>, columnName: string) {
    const task = event.item.data; // Get the dropped task

    if (event.previousContainer === event.container) {
      // Task moved within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Task moved between columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Update the task's column in Firestore
      const taskRef = doc(this.firestore, 'tasks', task.id);
      await updateDoc(taskRef, { column: columnName });
    }

    // Update the local columns array to reflect the move
    const sourceColumn = this.columns.find(col => col.name === event.previousContainer.id);
    const destinationColumn = this.columns.find(col => col.name === columnName);

    if (sourceColumn && destinationColumn) {
      const movedTask = sourceColumn.tasks.splice(event.previousIndex, 1)[0];
      destinationColumn.tasks.push(movedTask);
    }
  }
}
