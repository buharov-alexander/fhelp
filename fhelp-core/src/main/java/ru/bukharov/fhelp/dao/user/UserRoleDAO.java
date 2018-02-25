package ru.bukharov.fhelp.dao.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.user.UserRole;

import java.util.List;

public interface UserRoleDAO extends CrudRepository<UserRole, Long> {

    @Query("Select a from UserRole a, User b where b.username=?1 and a.userId=b.id")
    List<UserRole> findRoleByUserName(String username);
}
