package ru.bukharov.fhelp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bukharov.fhelp.dao.AccountDAO;
import ru.bukharov.fhelp.dao.AccountStateDAO;
import ru.bukharov.fhelp.domain.Account;
import ru.bukharov.fhelp.domain.AccountState;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class AccountService {

    @Autowired
    AccountDAO accountRepository;
    @Autowired
    AccountStateDAO accountStateRepository;

    public AccountDTO saveAccount(AccountDTO accountDTO) {
        new AccountDTOValidator().validate(accountDTO);

        Account account = createAccount(accountDTO);
        AccountState accountState = new AccountState();
        accountState.setAccount(account);
        accountState.setDate(new Date());
        accountState.setBalance(accountDTO.getBalance());

        List<AccountState> states = new ArrayList<>();
        states.add(accountState);
        account.setStates(states);
        Account savedAccount = accountRepository.save(account);

        accountDTO.setId(savedAccount.getId());
        return accountDTO;
    }

    public AccountDTO getAccount(Long id) {
        Account account = accountRepository.findOne(id);
        return createAccountDTO(account);
    }

    public List<AccountStateDTO> getStatesByAccountId(Long accountId) {
        List list = new ArrayList();
        Account account = accountRepository.findOne(accountId);
        for (AccountState state : account.getStates()) {
            AccountStateDTO stateDTO = createAccountStateDTO(state);
            list.add(stateDTO);
        }
        return list;
    }

    @Transactional
    public AccountStateDTO saveAccountState(AccountStateDTO accountStateDTO) {
        new AccountStateDTOValidator().validate(accountStateDTO);

        AccountState accountState = new AccountState();
        accountState.setDate(accountStateDTO.getDate());
        accountState.setBalance(accountStateDTO.getBalance());

        Account account = accountRepository.findOne(accountStateDTO.getAccountId());
        accountState.setAccount(account);
        AccountState savedAccountState = accountStateRepository.save(accountState);

        savedAccountState.setId(savedAccountState.getId());
        return accountStateDTO;
    }

    public List<AccountDTO> getAccounts() {
        List<AccountDTO> list = new ArrayList<>();
        for (Account account : accountRepository.findAll()) {
            AccountDTO accountDTO = createAccountDTO(account);
            list.add(accountDTO);
        }
        return list;
    }

    private AccountStateDTO createAccountStateDTO(AccountState accountState) {
        AccountStateDTO accountStateDTO = new AccountStateDTO();
        accountStateDTO.setId(accountState.getId());
        accountStateDTO.setBalance(accountState.getBalance());
        accountStateDTO.setDate(accountState.getDate());
        accountStateDTO.setAccountId(accountState.getAccount().getId());

        return accountStateDTO;
    }

    private Account createAccount(AccountDTO accountDTO) {
        Account account = new Account();
        account.setName(accountDTO.getName());
        account.setId(accountDTO.getId());
        account.setType(accountDTO.getType());
        account.setValuta(accountDTO.getValuta());

        return account;
    }

    private AccountDTO createAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setName(account.getName());
        accountDTO.setType(account.getType());
        accountDTO.setValuta(account.getValuta());

        List<AccountState> states = account.getStates();
        Double balance = states.isEmpty() ? 0 : states.get(0).getBalance();
        accountDTO.setBalance(balance);
        return accountDTO;
    }
}
