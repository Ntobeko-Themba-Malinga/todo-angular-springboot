package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/todos")
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = this.todoService.retrieveAllTodos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable long id) {
        Optional<Todo> todo = this.todoService.retrieveTodoById(id);

        if (todo.isPresent()) {
            return new ResponseEntity<>(todo.get(), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    String.format("Todo with id '%d' was not found", id)
            );
        }
    }

    @PostMapping
    public ResponseEntity<HttpStatus> saveNewTodo(@Valid @RequestBody Todo todo
            , BindingResult result) {
        if (!result.hasErrors()) {
            this.todoService.saveTodo(todo);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            String errMsg = result.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, errMsg);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<HttpStatus> updateTodo(@PathVariable long id, @RequestBody Todo todo) {
        try {
            this.todoService.updateTodo(id, todo);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    e.getMessage()
            );
        }
    }
}
