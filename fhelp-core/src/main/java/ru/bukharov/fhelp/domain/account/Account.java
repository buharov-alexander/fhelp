package ru.bukharov.fhelp.domain.account;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ru.bukharov.fhelp.domain.AccountTypeEnum;
import ru.bukharov.fhelp.domain.ValutaEnum;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private AccountTypeEnum type;

    @Enumerated(EnumType.STRING)
    private ValutaEnum valuta;

    private Long userId;

    @JsonIgnore
    @OrderBy("date DESC")
    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AccountState> states;

    public Account() {
        this.states = new ArrayList<>();
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

    public List<AccountState> getStates() {
        return states;
    }

    public void setStates(List<AccountState> states) {
        this.states = states;
    }

    public ValutaEnum getValuta() {
        return valuta;
    }

    public void setValuta(ValutaEnum valuta) {
        this.valuta = valuta;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
