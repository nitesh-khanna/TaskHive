package to_do.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import to_do.management.entity.PasswordResetToken;
import to_do.management.entity.User;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByUser(User user);
}
