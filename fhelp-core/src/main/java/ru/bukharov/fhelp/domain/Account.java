package ru.bukharov.fhelp.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double balance;

    @Enumerated(EnumType.STRING)
    private AccountTypeEnum type;

    @Enumerated(EnumType.STRING)
    private ValutaEnum valuta;

    @OneToMany(mappedBy = "accountId", fetch = FetchType.LAZY)
    private Set<AccountState> states;

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

    public AccountTypeEnum getType() {
        return type;
    }

    public void setType(AccountTypeEnum type) {
        this.type = type;
    }

    public Set<AccountState> getStates() {
        return states;
    }

    public void setStates(Set<AccountState> states) {
        this.states = states;
    }

    public ValutaEnum getValuta() {
        return valuta;
    }

    public void setValuta(ValutaEnum valuta) {
        this.valuta = valuta;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }
}
