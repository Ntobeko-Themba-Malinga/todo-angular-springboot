import { Component, input } from '@angular/core';
import { Todo } from '../../model/todo.types';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  todoItem = input.required<Todo>();
}
