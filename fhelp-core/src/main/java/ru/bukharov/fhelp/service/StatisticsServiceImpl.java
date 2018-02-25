package ru.bukharov.fhelp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bukharov.fhelp.dao.account.AccountDAO;
import ru.bukharov.fhelp.domain.account.Account;
import ru.bukharov.fhelp.domain.account.AccountState;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.service.account.AccountService;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    public static final int NUMBER_OF_MONTHS = 12;

    @Autowired
    private AccountService accountService;

    @Override
    public Map<Date, Map<ValutaEnum, Double>> getMonthBalances() {
        Map<Date, Map<ValutaEnum, Double>> res = new HashMap<>();
        Iterable<Account> accounts = accountService.getAccounts();

        for (int i = 0; i < NUMBER_OF_MONTHS; i++) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.MONTH, -i);
            Date date = cal.getTime();
            res.put(date, new TreeMap<>());
        }

        for (Account account : accounts) {
            List<AccountState> states = account.getStates();
            for (Date date : res.keySet()) {
                Map<ValutaEnum, Double> map = res.get(date);
                Optional<AccountState> accountState = states.stream()
                        .sorted((a, b) -> b.getDate().compareTo(a.getDate()))
                        .filter(a ->  !a.getDate().after(date))
                        .findFirst();
                if (accountState.isPresent()) {
                    Double balance = map.get(account.getValuta());
                    balance = balance == null ? 0D : balance;
                    map.put(account.getValuta(), balance + accountState.get().getBalance());
                }
            }
        }
        return res;
    }
}
