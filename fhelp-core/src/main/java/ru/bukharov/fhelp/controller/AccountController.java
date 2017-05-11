package ru.bukharov.fhelp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.dto.AccountWithStatesDTO;
import ru.bukharov.fhelp.service.AccountService;

import java.util.List;

@Controller
@RequestMapping("/fhelp/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @RequestMapping(method = RequestMethod.GET)
    public
    @ResponseBody
    List<AccountDTO> getAccounts() {
        List<AccountDTO> accountDTOList = accountService.getAccounts();
        return accountDTOList;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    AccountDTO getAccount(@PathVariable Long id) {
        AccountDTO accountDTO = accountService.getAccount(id);
        return accountDTO;
    }

    @RequestMapping(value = "/accountWithStates/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    AccountWithStatesDTO getAccountWithStates(@PathVariable Long id) {
        AccountWithStatesDTO accountWithStatesDTO = accountService.getAccountWithStates(id);
        return accountWithStatesDTO;
    }

    @RequestMapping(value = "/stateList/{id}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<AccountStateDTO> getStatesByAccountId(@PathVariable Long id) {
        List<AccountStateDTO> list = accountService.getStatesByAccountId(id);
        return list;
    }

    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    AccountDTO createAccount(@RequestBody AccountDTO accountDTO) {
        AccountDTO resultAccountDTO = accountService.saveAccount(accountDTO);
        return resultAccountDTO;
    }

    @RequestMapping(value = "/state", method = RequestMethod.POST)
    public
    @ResponseBody
    AccountStateDTO addAccountState(@RequestBody AccountStateDTO accountStateDTO) {
        AccountStateDTO resultState = accountService.saveAccountState(accountStateDTO);
        return resultState;
    }
}
