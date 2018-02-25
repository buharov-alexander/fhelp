package ru.bukharov.fhelp.dao.account;

import org.springframework.data.repository.CrudRepository;
import ru.bukharov.fhelp.domain.account.Account;

import java.util.List;

public interface AccountDAO extends CrudRepository<Account, Long> {

    Account findByIdAndUserId(Long accountId, Long id);

    List<Account> findByUserId(Long id);
}
