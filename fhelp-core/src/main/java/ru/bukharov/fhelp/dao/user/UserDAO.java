package ru.bukharov.fhelp.dao.user;

import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.user.User;

public interface UserDAO extends CrudRepository<User, Long> {

    User findByUsername(String username);
}
