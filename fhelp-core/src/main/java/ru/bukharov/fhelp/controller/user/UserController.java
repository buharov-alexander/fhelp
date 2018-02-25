package ru.bukharov.fhelp.controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.bukharov.fhelp.aspect.log.LoggableMethod;
import ru.bukharov.fhelp.dto.user.UserDTO;
import ru.bukharov.fhelp.service.user.UserService;

@Controller
@RequestMapping("/fhelp/user")
public class UserController {

    @Autowired
    private UserService userService;

    @LoggableMethod
    @RequestMapping(value = "/currentUsername", method = RequestMethod.GET)
    public
    @ResponseBody
    String getCurrentLoggedInUsername() {
        return userService.getCurrentLoggedInUsername();
    }

    @LoggableMethod
    @RequestMapping(method = RequestMethod.POST)
    public
    @ResponseBody
    UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.saveUser(userDTO);
    }


}
