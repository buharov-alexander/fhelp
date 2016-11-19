package ru.bukharov.fhelp.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer balance;

    @Enumerated(EnumType.STRING)
    private AccountTypeEnum type;
    @Enumerated(EnumType.STRING)
    private ValutaEnum valuta;

    public Account() {
    }

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

    public Integer getBalance() {
        return balance;
    }

    public void setBalance(Integer balance) {
        this.balance = balance;
    }

    public AccountTypeEnum getType() {
        return type;
    }

    public void setType(AccountTypeEnum type) {
        this.type = type;
    }

    public ValutaEnum getValuta() {
        return valuta;
    }

    public void setValuta(ValutaEnum valuta) {
        this.valuta = valuta;
    }
}