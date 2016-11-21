package ru.bukharov.fhelp.mmvb.service;

import org.json.JSONObject;
import org.mockito.InjectMocks;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.json.JsonService;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;

import static org.mockito.Matchers.anyString;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.when;

public class MmvbServiceTest {

    private static final double DELTA = 1e-4;
    private static String MMVB_RATES_EXAMPlE;

    @InjectMocks
    private MmvbServiceImpl mmvbService;

    private JsonService jsonService;

    @BeforeClass
    private void testInit() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("mmvbRates.json").getFile());

        MMVB_RATES_EXAMPlE = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
    }

    @BeforeMethod
    private void setUp() {
        jsonService = mock(JsonService.class);

        initMocks(this);
    }

    @Test
    public void testCurrentCbrfRates() throws IOException {
        JSONObject jsonObject = new JSONObject(MMVB_RATES_EXAMPlE);
        when(jsonService.getJsonFromUrl(anyString())).thenReturn(jsonObject);

        Map<String, Double> res = mmvbService.getCurrentCbrfRates();

        Assert.assertEquals(res.get(ValutaEnum.EUR.toString()), 68.6783, DELTA);
        Assert.assertEquals(res.get(ValutaEnum.USD.toString()), 62.9037, DELTA);
    }

}
