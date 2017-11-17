package ru.bukharov.fhelp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.service.StatisticsService;

import java.util.Date;
import java.util.Map;

@Controller
@RequestMapping("/fhelp/statistics")
public class StatisticsController {

    @Autowired
    StatisticsService statisticsService;

    @LoggableMethod
    @RequestMapping(value = "monthBalance", method = RequestMethod.GET)
    public
    @ResponseBody
    Map<Date, Map<ValutaEnum, Double>> getMonthBalances() {
        Map<Date, Map<ValutaEnum, Double>> balanceMap = statisticsService.getMonthBalances();
        return balanceMap;
    }

}
