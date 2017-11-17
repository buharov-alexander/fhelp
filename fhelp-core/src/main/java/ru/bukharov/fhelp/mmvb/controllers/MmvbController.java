package ru.bukharov.fhelp.mmvb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.mmvb.service.MmvbService;

import java.util.Map;

@Controller
@RequestMapping("/fhelp/mmvb")
public class MmvbController {

    @Autowired
    private MmvbService mmvbService;

    @LoggableMethod
    @RequestMapping(value = "/rates", method = RequestMethod.GET)
    public
    @ResponseBody
    Map<String, Double> getCurrentCbrfRates(ModelMap model) {
        return mmvbService.getCurrentCbrfRates();
    }
}
