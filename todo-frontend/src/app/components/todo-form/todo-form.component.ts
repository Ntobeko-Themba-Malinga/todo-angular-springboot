import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo-service';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  todoService: TodoService = inject(TodoService);
  todoSaved = output<boolean>();
  todoForm = new FormGroup({
    title: new FormControl<string | undefined>(undefined, Validators.required),
    dueBy: new FormControl<Date | undefined>(undefined, Validators.required)
  });

  saveTodo() {
    if (this.todoForm.valid) {
      this.todoService.saveTodo(this.todoForm.controls.title.value, this.todoForm.controls.dueBy.value).subscribe({
        next: (_res) => {
          this.todoForm.reset();
          console.log("Saved!");
          this.todoSaved.emit(true);
        } 
      });
    } else {
      console.log("Enter all fields");
    }
  }
}
