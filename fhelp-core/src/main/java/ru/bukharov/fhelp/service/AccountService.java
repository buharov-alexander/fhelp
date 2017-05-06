package ru.bukharov.fhelp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bukharov.fhelp.dao.AccountDAO;
import ru.bukharov.fhelp.dao.AccountStateDAO;
import ru.bukharov.fhelp.domain.Account;
import ru.bukharov.fhelp.domain.AccountState;
import ru.bukharov.fhelp.dto.AccountStateDTO;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class AccountService {

    @Autowired
    AccountDAO accountRepository;
    @Autowired
    AccountStateDAO accountStateRepository;

    public Account createAccount(Account account) {
        //TODO: add validation
        AccountState accountState = new AccountState();
        accountState.setAccount(account);
        accountState.setBalance(account.getBalance());
        accountState.setDate(new Date());

        Set<AccountState> states = new HashSet<>();
        states.add(accountState);
        account.setStates(states);
        Account savedAccount = accountRepository.save(account);
        return savedAccount;
    }

    @Transactional
    public AccountState addAccountState(AccountStateDTO accountStateDTO) {
        //TODO: add validation
        AccountState accountState = new AccountState();
        accountState.setDate(accountStateDTO.getDate());
        accountState.setBalance(accountStateDTO.getBalance());

        Account account = accountRepository.findOne(accountStateDTO.getAccountId());
        accountState.setAccount(account);
        AccountState savedAccountState = accountStateRepository.save(accountState);
        return savedAccountState;
    }
}
