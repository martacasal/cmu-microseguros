# Open-Meteo · weather · for Micro Seguros

Free weather forecasts, hour by hour. No account, no key.

**Try it:** this link asks for wind and chance of rain at Carcavelos beach, hour by hour, today. Ask the AI agent to open it and tell you what's inside.

```
https://api.open-meteo.com/v1/forecast?latitude=38.68&longitude=-9.33&hourly=wind_speed_10m,precipitation_probability&forecast_days=1&timezone=Europe%2FLisbon
```

## What you get, and why a customer might care

| Data | Example | For Micro Seguros |
|---|---|---|
| Time of each hour | 09:00, 10:00, … | Match the hours being covered |
| Wind speed (km/h) | 18 | A surf session gets riskier in strong wind |
| Chance of rain (%) | 40 | A heads-up for a bike parked outside |

Also available: temperature, UV index, the next few days, and wave height for surfers.

**Good to know:** fine for class and prototypes, not for a commercial product without a plan.
