package ru.bukharov.fhelp.rbc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.dto.IndicatorDTO;
import ru.bukharov.fhelp.rbc.service.RbcService;

import java.util.List;

@Controller
@RequestMapping("/fhelp/rbc")
public class RbcController {

    @Autowired
    RbcService rbcService;

    @LoggableMethod
    @RequestMapping(value = "/indicators", method = RequestMethod.GET)
    public
    @ResponseBody
    List<IndicatorDTO> getIndicators() {
        return rbcService.getIndicators();
    }
}
