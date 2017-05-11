package ru.bukharov.fhelp.dto;

import ru.bukharov.fhelp.domain.AccountTypeEnum;
import ru.bukharov.fhelp.domain.ValutaEnum;

public class AccountDTO {
    private Long id;
    private String name;
    private AccountTypeEnum type;
    private ValutaEnum valuta;
    private Double balance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AccountTypeEnum getType() {
        return type;
    }

    public void setType(AccountTypeEnum type) {
        this.type = type;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public ValutaEnum getValuta() {
        return valuta;
    }

    public void setValuta(ValutaEnum valuta) {
        this.valuta = valuta;
    }
}
