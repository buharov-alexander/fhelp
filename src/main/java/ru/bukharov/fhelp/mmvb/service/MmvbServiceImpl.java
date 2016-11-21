package ru.bukharov.fhelp.mmvb.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.json.JsonService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class MmvbServiceImpl implements MmvbService {

    private static final String MMVB_RATES_URL = "http://moex.com/iss/statistics/engines/currency/markets/selt/rates.json";

    private Logger log = LoggerFactory.getLogger(MmvbServiceImpl.class);

    @Autowired
    private JsonService jsonService;

    public Map<String, Double> getCurrentCbrfRates() {
        try {
            JSONObject jsonObject = jsonService.getJsonFromUrl(MMVB_RATES_URL);
            return parseRatesJson(jsonObject);
        } catch (IOException | JSONException e) {
            log.error(e.getMessage(), e);
            return new HashMap<>();
        }
    }

    private Map<String, Double> parseRatesJson(JSONObject jsonObject) {
        Map<String, Double> rates = new HashMap<>();
        JSONObject cbrf = jsonObject.getJSONObject("cbrf");
        JSONArray columns = cbrf.getJSONArray("columns");
        JSONArray data = cbrf.getJSONArray("data").getJSONArray(0);
        for (int i = 0; i < columns.length(); ++i) {
            String col = columns.getString(i);
            switch (col) {
                case "CBRF_USD_LAST":
                    rates.put(ValutaEnum.USD.toString(), data.getDouble(i));
                    break;
                case "CBRF_EUR_LAST":
                    rates.put(ValutaEnum.EUR.toString(), data.getDouble(i));
                    break;
            }
        }

        return rates;
    }
}
