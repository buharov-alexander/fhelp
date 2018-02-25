package ru.bukharov.fhelp.service.account;

import ru.bukharov.fhelp.dto.AccountStateDTO;
import ru.bukharov.fhelp.util.IValidator;

import javax.validation.ValidationException;
import java.util.Date;

public class AccountStateDTOValidator implements IValidator<AccountStateDTO> {

    @Override
    public void validate(AccountStateDTO accountStateDTO) {
        if (accountStateDTO == null) {
            throw new ValidationException("AccountStateDTO is null");
        }
        Double balance = accountStateDTO.getBalance();
        if (balance == null) {
            throw new ValidationException("Balance of state is not specifyed");
        }
        Date date = accountStateDTO.getDate();
        if (date == null) {
            throw new ValidationException("Date of state is not specifyed");
        } else if (date.after(new Date())) {
            throw new ValidationException("Date of state can not be in the future");
        }
        Long accountId = accountStateDTO.getAccountId();
        if (accountId == null) {
            throw new ValidationException("State account ID is not specifyed");
        }
    }
}
