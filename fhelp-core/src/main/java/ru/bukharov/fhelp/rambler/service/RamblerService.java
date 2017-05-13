package ru.bukharov.fhelp.rambler.service;

import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.dto.IndicatorDTO;

import java.util.Date;
import java.util.List;

public interface RamblerService {
    List<IndicatorDTO> getRates(ValutaEnum valutaEnum, Date fromDate, Date toDate);
}
