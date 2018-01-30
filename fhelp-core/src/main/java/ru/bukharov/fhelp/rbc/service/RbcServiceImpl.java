package ru.bukharov.fhelp.rbc.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bukharov.fhelp.json.JsonService;
import ru.bukharov.fhelp.dto.IndicatorDTO;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RbcServiceImpl implements RbcService {

    private static final String RBC_INDICATOR_URL = "https://quote.rbc.ru/ajax/indicators";
    private static final String CURRENCY = "currency";
    private static final String INDICES = "indices";
    private static final String NAME = "name";
    private static final String SUBNAME = "subname";
    private static final String CB = "ЦБ.";
    private static final String USD = "USD";
    private static final String EUR = "EUR";
    private static final String MMVB = "ММВБ";
    private static final String RTS = "РТС";
    private static final String BRENT = "Brent";
    private static final String DATE = "date";
    private static final String VALUE_1 = "value1";
    private static final String VALUE_2 = "value2";

    @Autowired
    private JsonService jsonService;

    private Logger log = LoggerFactory.getLogger(RbcServiceImpl.class);

    @Override
    public List<IndicatorDTO> getIndicators() {
        try {
            JSONObject jsonObject = jsonService.getJsonFromUrl(RBC_INDICATOR_URL);
            return parseIndicatorsJson(jsonObject);
        } catch (IOException | JSONException e) {
            log.error(e.getMessage(), e);
            return new ArrayList<>();
        }

    }

    private List<IndicatorDTO> parseIndicatorsJson(JSONObject jsonObject) {
        List<IndicatorDTO> indicators = new ArrayList<>();

        JSONArray currency = jsonObject.getJSONArray(CURRENCY);
        for (int i = 0; i < currency.length(); ++i) {
            JSONObject obj = currency.getJSONObject(i);
            String name = obj.getString(NAME);
            String subname = obj.isNull(SUBNAME) ? null : obj.getString(SUBNAME);
            if (CB.equals(subname) && (USD.equals(name) || EUR.equals(name))) {
                indicators.add(createIndicator(obj));
            }
        }
        JSONArray indices = jsonObject.getJSONArray(INDICES);
        for (int i = 0; i < indices.length(); ++i) {
            JSONObject obj = indices.getJSONObject(i);
            String name = obj.getString(NAME);
            if (MMVB.equals(name) || BRENT.equals(name) || RTS.equals(name)) {
                indicators.add(createIndicator(obj));
            }
        }

        return indicators;
    }

    private IndicatorDTO createIndicator(JSONObject obj) {
        IndicatorDTO indicator = new IndicatorDTO();
        indicator.setName(obj.getString(NAME));
        if (!obj.isNull(SUBNAME)) {
            indicator.setSubname(obj.getString(SUBNAME));
        }
        indicator.setDate(obj.getString(DATE));
        indicator.setValue(obj.getDouble(VALUE_1));
        indicator.setChange(obj.getString(VALUE_2));
        return indicator;
    }
}
