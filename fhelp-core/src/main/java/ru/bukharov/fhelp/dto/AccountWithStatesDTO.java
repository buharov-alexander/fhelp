package ru.bukharov.fhelp.dto;

import java.util.ArrayList;
import java.util.List;

public class AccountWithStatesDTO extends AccountDTO {

    private List<AccountStateDTO> states = new ArrayList();

    public List<AccountStateDTO> getStates() {
        return states;
    }

    public void setStates(List<AccountStateDTO> states) {
        this.states = states;
    }
}
