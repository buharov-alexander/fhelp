package ru.bukharov.fhelp.aspect.log;

import java.lang.annotation.ElementType;
import java.lang.annotation.Target;

@Target({ ElementType.METHOD })
public @interface LoggableMethod {
}
