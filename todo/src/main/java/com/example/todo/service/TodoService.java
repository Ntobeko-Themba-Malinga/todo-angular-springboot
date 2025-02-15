package com.example.todo.service;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> retrieveAllTodos() {
        return this.todoRepository.findAll();
    }

    public Optional<Todo> retrieveTodoById(long id) {
        return this.todoRepository.findById(id);
    }

    public void saveTodo(Todo todo) {
        this.todoRepository.save(todo);
    }

    public void updateTodo(long id, Todo todo) {
        Optional<Todo> todoOptional = this.todoRepository.findById(id);

        if (todoOptional.isPresent()) {
            Todo savedTodo = todoOptional.get();
            savedTodo.setComplete(todo.isComplete());
            this.todoRepository.save(savedTodo);
        } else {
            throw new IllegalArgumentException(
                    String.format("Todo with id '%d' does not exist", id)
            );
        }
    }
}
