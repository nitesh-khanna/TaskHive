package to_do.management.service;

import to_do.management.dto.ToDoDto;

import java.util.List;

public interface ToDoService {
    ToDoDto addToDo(ToDoDto toDoDto);
    ToDoDto getToDo(Long id);
    List<ToDoDto> getAllToDo();
    ToDoDto updateToDo(ToDoDto toDoDto, Long id);
    void deleteToDo(Long id);
    ToDoDto completeToDo(Long id);
    ToDoDto incompleteToDo(Long id);
}
