package ru.bukharov.fhelp.service.user;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.bukharov.fhelp.dto.user.UserDTO;

public interface UserService extends UserDetailsService {

    UserDTO saveUser(UserDTO userDTO);

    String getCurrentLoggedInUsername();
}
