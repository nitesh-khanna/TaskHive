package to_do.management.service;

import to_do.management.dto.JwtAuthResponse;
import to_do.management.dto.LoginDto;
import to_do.management.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponse login(LoginDto loginDto);
    String initiatePasswordReset(String usernameOrEmail);
    String changeUserPassword(String token, String newPassword);
}
