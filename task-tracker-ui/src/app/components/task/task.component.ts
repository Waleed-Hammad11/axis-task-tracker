import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (cleanTasks) => {
        this.tasks = cleanTasks;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  addTask(): void {
    if (!this.newTaskTitle.trim()) return;

    this.taskService.addTask(this.newTaskTitle).subscribe({
      next: (newTask) => {
        this.tasks = [newTask, ...this.tasks];
        this.newTaskTitle = '';
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  deleteTask(id: string): void {
    const backupTasks = [...this.tasks];
    this.tasks = this.tasks.filter(task => task._id !== id);
    this.cdr.detectChanges();

    this.taskService.deleteTask(id).subscribe({
      next: () => {},
      error: (err) => {
        this.tasks = backupTasks;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  toggleTask(task: Task): void {
    const newStatus = !task.completed;
    const backupTasks = [...this.tasks];

    this.tasks = this.tasks.map(t =>
      t._id === task._id ? { ...t, completed: newStatus } : t
    );
    this.cdr.detectChanges(); //

    this.taskService.updateTask(task._id, newStatus).subscribe({
      next: () => {},
      error: (err) => {
        this.tasks = backupTasks;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }
}
