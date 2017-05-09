---
nav: lang/en
search: english
title: Everysense Message API
---

## Message API
### Transfer data
<label class="label">POST</label>`/put_message`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    [
        {
            "sensor_uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
            "sensor_name": "Illuminance",
            "data": {
                value: 700,
                timestamp: "2017-01-01 12:00:01 UTC",
                unit: "lx"
            }
        },
        {
            "sensor_uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
            "sensor_name": "GPS",
            "data": {
                values: [36.68, 139.45],
                timestamp: "2017-01-01 12:00:01 UTC",
                unit: "WGS84"
            }
        },
        ...
    ]
]
```

<label class="label success">success</label>
```
{
  "code" : 0
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```
<br>

### Resolve Sensor UUID
<label class="label">POST</label>`/resolv`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "Illuminance"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"sensor not found"
}
```
<br>

### Retrieve transferred data
<label class="label">POST</label>`/get_message`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "count":　0,
  "inputs":[
        [
            {
                "sensor_uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
                "sensor_name": "Illuminance",
                    value: 700,
                    timestamp: "2017-01-01 12:00:01 UTC",
                    unit: "lx"
                }
            },
            {
                "sensor_uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
                "sensor_name": "GPS",
                "data": {
                    values: [36.68, 139.45],
                    timestamp: "2017-01-01 12:00:01 UTC",
                    unit: "WGS84"
                }
            },
            {
                "sensor_uuid": "05c07598-7d72-4454-8c1f-afd09d960665",
                "sensor_name": "Temperature",
                "data": {
                    values: 25,
                    timestamp: "2017-01-01 12:00:01 UTC",
                    unit: "degree Celsius"
                }
            }
        ],
        [
            {
                "sensor_uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
                "sensor_name": "Illuminance",
                    value: 752,
                    timestamp: "2017-01-01 12:05:00 UTC",
                    unit: "lx"
                }
            },
            {
                "sensor_uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
                "sensor_name": "GPS",
                "data": {
                    values: [36.68, 139.44],
                    timestamp: "2017-01-01 12:05:00 UTC",
                    unit: "WGS84"
                }
            },
            {
                "sensor_uuid": "05c07598-7d72-4454-8c1f-afd09d960665",
                "sensor_name": "Temperature",
                "data": {
                    values: 25,
                    timestamp: "2017-01-01 12:05:00 UTC",
                    unit: "degree Celsius"
                }
            }
        ],
        ...     
  ]
}
```
<label class="label danger">failure</label>
The following will be returned even if the device does not exist
```
{
    "code": 0,
    "count": 0,
    "inputs": []
}
```
<br>
