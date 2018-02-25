package ru.bukharov.fhelp.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.bukharov.fhelp.dao.user.UserDAO;
import ru.bukharov.fhelp.dao.user.UserRoleDAO;
import ru.bukharov.fhelp.domain.user.User;
import ru.bukharov.fhelp.domain.user.UserRole;
import ru.bukharov.fhelp.dto.user.UserDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private UserRoleDAO userRoleDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDAO.findByUsername(username);
        if (null == user) {
            throw new UsernameNotFoundException("No user present with username: " + username);
        } else {
            List<UserRole> userRoles = user.getRoles();
            List<GrantedAuthority> authorities = buildUserAuthority(userRoles);
            return buildUser(user, authorities);
        }
    }

    @Override
    @Transactional
    public UserDTO saveUser(UserDTO userDTO) {
        new UserDTOValidator().validate(userDTO);

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmail(userDTO.getEmail());
        user.setEnabled(true);

        ArrayList<UserRole> roles = new ArrayList<>();
        UserRole role = new UserRole();
        role.setRole("ROLE_USER");
        user.setRoles(roles);

        User savedUser = userDAO.save(user);

        userDTO.setId(savedUser.getId());
        return userDTO;
    }

    @Override
    public String getCurrentLoggedInUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName(); //get logged in username

        return name;
    }

    // Converts our domain object to spring security objects
    private org.springframework.security.core.userdetails.User buildUser(User user,
                                                                         List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                user.isEnabled(),
                true,
                true,
                true,
                authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(List<UserRole> userRoles) {

        List<GrantedAuthority> authorities = userRoles.stream()
                .map(userRole -> new SimpleGrantedAuthority(userRole.getRole()))
                .collect(Collectors.toList());

        return authorities;
    }

}
