package to_do.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import to_do.management.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String role);
}
