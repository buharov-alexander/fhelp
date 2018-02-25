package ru.bukharov.fhelp.dao.account;

import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.account.AccountState;

public interface AccountStateDAO extends CrudRepository<AccountState, Long> {
}
