package ru.bukharov.fhelp.dao;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import ru.bukharov.fhelp.domain.account.Account;
import ru.bukharov.fhelp.domain.account.AccountState;

@Configuration
public class RepositoryConfig extends RepositoryRestConfigurerAdapter {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Account.class, AccountState.class);
    }
}