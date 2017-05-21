package ru.bukharov.fhelp.rambler.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bukharov.fhelp.domain.ValutaEnum;
import ru.bukharov.fhelp.dto.IndicatorDTO;
import ru.bukharov.fhelp.json.JsonService;
import ru.bukharov.fhelp.mmvb.service.MmvbServiceImpl;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RamblerServiceImpl implements RamblerService {

    private static final String FINANCE_RAMBLER_URL = "https://finance.rambler.ru/currencies/";
    public static final String RATES = "rates";
    public static final String NAME = "name";
    public static final String RATE = "rate";
    public static final String DATE = "date";
    public static final String DIFF = "diff";
    private static Map<ValutaEnum, String> valutaToPathMap;
    static
    {
        valutaToPathMap = new HashMap<>();
        valutaToPathMap.put(ValutaEnum.USD, "archive-bcs-usd000utstom");
        valutaToPathMap.put(ValutaEnum.EUR, "archive-bcs-eur_rub__tom");
    }

    private SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
    private Logger log = LoggerFactory.getLogger(MmvbServiceImpl.class);

    @Autowired
    private JsonService jsonService;

    @Override
    public List<IndicatorDTO> getRates(ValutaEnum valutaEnum, Date fromDate, Date toDate) {
        try {
            String url = String.format(FINANCE_RAMBLER_URL + "%s?begin=%s&end=%s",
                    valutaToPathMap.get(valutaEnum), dateFormat.format(fromDate), dateFormat.format(toDate));
            JSONObject jsonObject = jsonService.getJsonFromUrl(url);
            return parseRatesJson(jsonObject);
        } catch (IOException | JSONException e) {
            log.error(e.getMessage(), e);
            return new ArrayList<>();
        }
    }

    private List<IndicatorDTO> parseRatesJson(JSONObject jsonObject) {
        List<IndicatorDTO> indicators = new ArrayList<>();

        JSONArray rates = jsonObject.getJSONArray(RATES);
        for (int i = 0; i < rates.length(); ++i) {
            JSONObject obj = rates.getJSONObject(i);
            indicators.add(createIndicatorDTO(obj));
        }
        return indicators;
    }

    private IndicatorDTO createIndicatorDTO(JSONObject obj) {
        IndicatorDTO indicatorDTO = new IndicatorDTO();
        indicatorDTO.setName(obj.getString(NAME));
        indicatorDTO.setChange(String.valueOf(obj.getDouble(DIFF)));
        indicatorDTO.setValue(obj.getDouble(RATE));
        indicatorDTO.setDate(obj.getString(DATE));
        return indicatorDTO;
    }
}
