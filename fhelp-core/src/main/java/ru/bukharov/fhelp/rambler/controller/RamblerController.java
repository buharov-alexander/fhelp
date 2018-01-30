package ru.bukharov.fhelp.rambler.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.dto.IndicatorDTO;
import ru.bukharov.fhelp.rambler.service.RamblerService;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/fhelp/rambler")
public class RamblerController {

    @Autowired
    RamblerService ramblerService;

    @LoggableMethod
    @RequestMapping(value = "/rates",method = RequestMethod.GET)
    public
    @ResponseBody
    List<IndicatorDTO> getRates(@RequestParam("valuta") ValutaEnum valutaEnum,
                                @DateTimeFormat(pattern = "dd-MM-yyyy") @RequestParam("fromDate") Date fromDate,
                                @DateTimeFormat(pattern = "dd-MM-yyyy") @RequestParam("toDate") Date toDate) {
        List<IndicatorDTO> rates = ramblerService.getRates(valutaEnum, fromDate, toDate);
        return rates;
    }

}
