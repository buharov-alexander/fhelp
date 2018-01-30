package ru.bukharov.fhelp.dao;

import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.AccountState;

public interface AccountStateDAO extends CrudRepository<AccountState, Long> {
}
