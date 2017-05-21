package ru.bukharov.fhelp.service;

import org.springframework.stereotype.Service;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.dto.AccountWithStatesDTO;

import java.util.List;

public interface AccountService {
    AccountDTO saveAccount(AccountDTO accountDTO);

    AccountDTO getAccount(Long id);

    AccountWithStatesDTO getAccountWithStates(Long id);

    List<AccountStateDTO> getStatesByAccountId(Long accountId);

    AccountStateDTO saveAccountState(AccountStateDTO accountStateDTO);

    List<AccountDTO> getAccounts();
}
