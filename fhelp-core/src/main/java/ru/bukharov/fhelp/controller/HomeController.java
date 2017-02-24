package ru.bukharov.fhelp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/fhelp")
public class HomeController {

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String getHomePage() {
        return "homepage";
    }
}
