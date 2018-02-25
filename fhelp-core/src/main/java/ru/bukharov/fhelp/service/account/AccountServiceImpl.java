package ru.bukharov.fhelp.service.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bukharov.fhelp.dao.account.AccountDAO;
import ru.bukharov.fhelp.dao.account.AccountStateDAO;
import ru.bukharov.fhelp.domain.account.Account;
import ru.bukharov.fhelp.domain.account.AccountState;
import ru.bukharov.fhelp.domain.user.User;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.dto.AccountWithStatesDTO;
import ru.bukharov.fhelp.service.user.UserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDAO accountRepository;
    @Autowired
    private AccountStateDAO accountStateRepository;
    @Autowired
    private UserService userService;

    @Override
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

    @Override
    public Account getAccount(Long accountId) throws AccountServiceException {
        return getAccountById(accountId);
    }

    @Override
    @Transactional
    public AccountStateDTO saveAccountState(AccountStateDTO accountStateDTO) throws AccountServiceException {
        new AccountStateDTOValidator().validate(accountStateDTO);

        AccountState accountState = new AccountState();
        accountState.setDate(accountStateDTO.getDate());
        accountState.setBalance(accountStateDTO.getBalance());

        Account account = getAccountById(accountStateDTO.getAccountId());
        accountState.setAccount(account);
        AccountState savedAccountState = accountStateRepository.save(accountState);

        savedAccountState.setId(savedAccountState.getId());
        return accountStateDTO;
    }

    @Override
    public List<Account> getAccounts() {
        User user = userService.getCurrentLoggedInUser();
        return accountRepository.findByUserId(user.getId());
    }

    private Account getAccountById(Long accountId) throws AccountServiceException {
        User user = userService.getCurrentLoggedInUser();
        Account account = accountRepository.findByIdAndUserId(accountId, user.getId());
        if (account == null) {
            throw new AccountServiceException(String.format("Account with ID %s is not found", accountId));
        }
        return account;
    }

    private Account createAccount(AccountDTO accountDTO) {
        Account account = new Account();
        account.setName(accountDTO.getName());
        account.setId(accountDTO.getId());
        account.setType(accountDTO.getType());
        account.setValuta(accountDTO.getValuta());

        User user = userService.getCurrentLoggedInUser();
        account.setUserId(user.getId());

        return account;
    }

}
