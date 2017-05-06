package ru.bukharov.fhelp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.domain.Account;
import ru.bukharov.fhelp.domain.AccountState;
import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.service.AccountService;

@Controller
@RequestMapping("/fhelp/account")
public class AccountController {

    @Autowired
    AccountService accountService;

    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Account createAccount(@RequestBody Account account) {
        Account resultAccount = accountService.createAccount(account);
        return resultAccount;
    }

    @RequestMapping(value = "/state", method = RequestMethod.POST)
    public @ResponseBody AccountState addAccountState(@RequestBody AccountStateDTO accountStateDTO) {
        AccountState resultState = accountService.addAccountState(accountStateDTO);
        return resultState;
    }
}
