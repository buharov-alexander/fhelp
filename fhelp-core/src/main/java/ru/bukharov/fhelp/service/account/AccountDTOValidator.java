package ru.bukharov.fhelp.service.account;

import ru.bukharov.fhelp.domain.AccountTypeEnum;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.dto.AccountDTO;
import ru.bukharov.fhelp.util.IValidator;

import javax.validation.ValidationException;

public class AccountDTOValidator implements IValidator<AccountDTO> {

    @Override
    public void validate(AccountDTO accountDTO) {
        if (accountDTO == null) {
            throw new ValidationException("AccountDTO is null");
        }
        String name = accountDTO.getName();
        if (name == null && name.isEmpty()) {
            throw new ValidationException("Name of account cannot be empty");
        }
        ValutaEnum valuta = accountDTO.getValuta();
        if (valuta == null) {
            throw new ValidationException("Valuta of account is not specifyed");
        }
        AccountTypeEnum type = accountDTO.getType();
        if (type == null) {
            throw new ValidationException("Type of account is not specifyed");
        }

    }
}
