import { Component, inject, OnInit, signal } from '@angular/core';
import { Todo } from '../model/todo.types';
import { TodoService } from '../services/todo-service';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoItemComponent, TodoFormComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todoService: TodoService = inject(TodoService);
  todos = signal<Todo[] | undefined>(undefined);

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.retrieveAllTodos().subscribe({
      next: (todoList) => {
        this.todos.set(todoList);
      }
    });
  }

  updateTodoItemStatus(todo: Todo) {
    this.todoService.updateTodo(todo.id, !todo.complete).subscribe({
      next: (_res) => { 
        this.todos.set(
          this.todos()?.map((todoItem) => {
            if (todoItem.id === todo.id) {
              todoItem.complete = !todoItem.complete;
            }
            return todoItem;
          })
        );
        console.log("Todo updated");
      },

      error: (err) => {
        console.log("Something went wrong");
      }
    });
  }
}
