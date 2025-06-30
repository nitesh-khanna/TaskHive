package to_do.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import to_do.management.entity.Todo;

public interface ToDoRepository extends JpaRepository<Todo,Long> {
}
