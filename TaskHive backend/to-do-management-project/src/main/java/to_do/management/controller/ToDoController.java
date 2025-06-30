package to_do.management.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import to_do.management.dto.ToDoDto;
import to_do.management.service.ToDoService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class ToDoController {

    private ToDoService toDoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ToDoDto> addToDo(@RequestBody ToDoDto toDoDto){
        ToDoDto savedToDo = toDoService.addToDo(toDoDto);
        return new ResponseEntity<>(savedToDo, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ToDoDto> getToDo(@PathVariable Long id){
        ToDoDto toDoDto = toDoService.getToDo(id);
        return ResponseEntity.ok(toDoDto);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<List<ToDoDto>> getAllToDo(){
        List<ToDoDto> toDoDtos = toDoService.getAllToDo();
        return ResponseEntity.ok(toDoDtos);
    }

    @PutMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ToDoDto> updateToDo(@RequestBody ToDoDto toDoDto , @PathVariable Long id){
        ToDoDto updatedToDoDto = toDoService.updateToDo(toDoDto, id);
        return ResponseEntity.ok(updatedToDoDto);
    }

    @DeleteMapping("{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteToDo(@PathVariable Long id){
        toDoService.deleteToDo(id);
        return ResponseEntity.ok("ToDo deleted successfully");
    }

    @PatchMapping("{id}/complete")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ToDoDto> completeToDo(@PathVariable Long id){
        ToDoDto updatedToDoDto = toDoService.completeToDo(id);
        return ResponseEntity.ok(updatedToDoDto);
    }

    @PatchMapping("{id}/incomplete")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<ToDoDto> incompleteToDo(@PathVariable Long id){
        ToDoDto updatedToDoDto = toDoService.incompleteToDo(id);
        return ResponseEntity.ok(updatedToDoDto);
    }
}
