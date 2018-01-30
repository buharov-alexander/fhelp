package ru.bukharov.fhelp.aspect.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MethodLogger {

    private org.slf4j.Logger log = LoggerFactory.getLogger(MethodLogger.class);

    @Pointcut("@annotation(LoggableMethod)")
    private void controllerMethod() {
    }

    @Around("controllerMethod()")
    public Object logAround(ProceedingJoinPoint joinPoint) {
        Signature signature = joinPoint.getSignature();
        log.info(String.format("Start method %s", signature.toShortString()));
        Object output = null;
        long start = System.currentTimeMillis();
        try {
            output = joinPoint.proceed();
        } catch (Throwable t) {
            log.info(String.format("Method %s throws exception: %s", signature.toShortString(), t.getMessage()));
        }
        long time = System.currentTimeMillis() - start;
        log.info(String.format("End method %s, time %s ms", signature.toShortString(), time));
        return output;
    }
}
