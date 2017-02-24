package ru.bukharov.fhelp.dao;

import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.Account;

public interface AccountDAO extends CrudRepository<Account, Long> {
}
