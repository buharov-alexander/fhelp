package ru.bukharov.fhelp.controller.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.domain.account.Account;
import ru.bukharov.fhelp.domain.account.AccountState;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.dto.AccountWithStatesDTO;
import ru.bukharov.fhelp.service.account.AccountService;
import ru.bukharov.fhelp.service.account.AccountServiceException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/fhelp/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @LoggableMethod
    @RequestMapping(method = RequestMethod.GET)
    public
    @ResponseBody
    List<AccountDTO> getAccounts() {
        List<AccountDTO> accountDTOList = new ArrayList<>();
        for (Account account : accountService.getAccounts()) {
            AccountDTO accountDTO = createAccountDTO(account);
            accountDTOList.add(accountDTO);
        }
        return accountDTOList;
    }

    @LoggableMethod
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    AccountDTO getAccount(@PathVariable Long id) throws AccountServiceException {
        Account account = accountService.getAccount(id);
        return createAccountDTO(account);
    }

    @LoggableMethod
    @RequestMapping(value = "/accountWithStates/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    AccountWithStatesDTO getAccountWithStates(@PathVariable Long id) throws AccountServiceException {
        Account account = accountService.getAccount(id);
        return createAccountWithStatesDTO(account);
    }

    @LoggableMethod
    @RequestMapping(value = "/stateList/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<AccountStateDTO> getStatesByAccountId(@PathVariable Long id) throws AccountServiceException {
        Account account = accountService.getAccount(id);
        return transformToAccountStateDTO(account.getStates());
    }

    @LoggableMethod
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    AccountDTO createAccount(@RequestBody AccountDTO accountDTO) {
        AccountDTO resultAccountDTO = accountService.saveAccount(accountDTO);
        return resultAccountDTO;
    }

    @LoggableMethod
    @RequestMapping(value = "/state", method = RequestMethod.POST)
    public
    @ResponseBody
    AccountStateDTO addAccountState(@RequestBody AccountStateDTO accountStateDTO) throws AccountServiceException {
        AccountStateDTO resultState = accountService.saveAccountState(accountStateDTO);
        return resultState;
    }


    private AccountWithStatesDTO createAccountWithStatesDTO(Account account) {
        AccountWithStatesDTO accountWithStatesDTO = new AccountWithStatesDTO();
        fillAccountDTO(accountWithStatesDTO, account);
        List<AccountStateDTO> stateDTOList = transformToAccountStateDTO(account.getStates());
        accountWithStatesDTO.getStates().addAll(stateDTOList);
        return accountWithStatesDTO;
    }

    private AccountDTO createAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        fillAccountDTO(accountDTO, account);
        return accountDTO;
    }

    private void fillAccountDTO(AccountDTO accountDTO, Account account) {
        accountDTO.setId(account.getId());
        accountDTO.setName(account.getName());
        accountDTO.setType(account.getType());
        accountDTO.setValuta(account.getValuta());

        List<AccountState> states = account.getStates();
        Double balance = states.isEmpty() ? 0 : states.get(0).getBalance();
        accountDTO.setBalance(balance);
    }

    private List<AccountStateDTO> transformToAccountStateDTO(Collection<AccountState> states) {
        return states.stream()
                .sorted((a, b) -> b.getDate().compareTo(a.getDate()))
                .map(state -> createAccountStateDTO(state))
                .collect(Collectors.toList());
    }


    private AccountStateDTO createAccountStateDTO(AccountState accountState) {
        AccountStateDTO accountStateDTO = new AccountStateDTO();
        accountStateDTO.setId(accountState.getId());
        accountStateDTO.setBalance(accountState.getBalance());
        accountStateDTO.setDate(accountState.getDate());
        accountStateDTO.setAccountId(accountState.getAccount().getId());

        return accountStateDTO;
    }
}
