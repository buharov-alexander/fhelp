package ru.bukharov.fhelp.service.account;

import ru.bukharov.fhelp.domain.account.Account;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;

import java.util.List;

public interface AccountService {
    AccountDTO saveAccount(AccountDTO accountDTO);

    Account getAccount(Long id) throws AccountServiceException;

    AccountStateDTO saveAccountState(AccountStateDTO accountStateDTO) throws AccountServiceException;

    List<Account> getAccounts();
}
