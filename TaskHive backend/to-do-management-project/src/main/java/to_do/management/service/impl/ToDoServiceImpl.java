package to_do.management.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import to_do.management.dto.ToDoDto;
import to_do.management.entity.Todo;
import to_do.management.exception.ResourceNotFoundException;
import to_do.management.repository.ToDoRepository;
import to_do.management.service.ToDoService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private ToDoRepository toDoRepository;
    private ModelMapper modelMapper;

    @Override
    public ToDoDto addToDo(ToDoDto toDoDto) {
        Todo todo = modelMapper.map(toDoDto, Todo.class);
        Todo savedToDo = toDoRepository.save(todo);
        return modelMapper.map(savedToDo, ToDoDto.class);
    }

    @Override
    public ToDoDto getToDo(Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo not found with id: " + id));
        return modelMapper.map(todo, ToDoDto.class);
    }

    @Override
    public List<ToDoDto> getAllToDo() {
        List<Todo> todos = toDoRepository.findAll();
        return todos.stream().map((todo) -> modelMapper.map(todo, ToDoDto.class)).collect(Collectors.toList());
    }

    @Override
    public ToDoDto updateToDo(ToDoDto toDoDto, Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo not found with id: " + id));
        todo.setTitle(toDoDto.getTitle());
        todo.setDescription(toDoDto.getDescription());
        todo.setCompleted(toDoDto.isCompleted());

        Todo updatedToDo = toDoRepository.save(todo);
        return modelMapper.map(updatedToDo, ToDoDto.class);
    }

    @Override
    public void deleteToDo(Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo not found with id: " + id));
        toDoRepository.deleteById(id);
    }

    @Override
    public ToDoDto completeToDo(Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo not found with id: " + id));
        todo.setCompleted(Boolean.TRUE);

        Todo updatedToDo = toDoRepository.save(todo);
        return modelMapper.map(updatedToDo, ToDoDto.class);
    }

    @Override
    public ToDoDto incompleteToDo(Long id) {
        Todo todo = toDoRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("ToDo not found with id: " + id));
        todo.setCompleted(Boolean.FALSE);

        Todo updatedToDo = toDoRepository.save(todo);
        return modelMapper.map(updatedToDo, ToDoDto.class);
    }
}
