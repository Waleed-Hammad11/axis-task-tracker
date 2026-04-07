import { Component, signal } from '@angular/core';
import { TaskComponent } from "./components/task/task.component";

@Component({
  selector: 'app-root',
  imports: [TaskComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-tracker-ui');
}
