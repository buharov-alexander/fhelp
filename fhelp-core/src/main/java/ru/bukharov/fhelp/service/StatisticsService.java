package ru.bukharov.fhelp.service;

import ru.bukharov.fhelp.domain.ValutaEnum;

import java.util.Date;
import java.util.Map;

public interface StatisticsService {
    Map<Date, Map<ValutaEnum, Double>> getMonthBalances();
}
