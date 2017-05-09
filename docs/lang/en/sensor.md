---
nav: lang/en
search: english
title: Everysense Sensor API
---

## Sensor API
### Retrieve sensor
<label class="label">POST</label>`/get_sensor`
``` 
[
    "ac9cf646-9071-410f-b7bb-f2ebb39f87fd"
]
```
<label class="label success">success</label>
```
{
    "code" : 0,
    "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
    "name": "Illuminance",
    "class_name": "Illuminance",
    "display_name": "照度",
    "description": "照度",
    "enabled": true,
    "location_type": "movable",
    "location_point_zipcode": null,
    "location_point_prefectures": null,
    "location_point_city": null,
    "location_point_address": null,
    "location_in_out": null,
    "location_detail": null,
    "accuracy": 
    {
        "type": 0,
        "value": null
    },
    "minimum_scale": "1.0",
    "range": 
    {
        "min": "1.0",
        "max": "999999.0"
    },
    "recieve_window_time": 
    {
        "close_time": null,
        "open_time": null
    },
    "default_unit": "lx"
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

### Retrieve list
<label class="label">POST</label>`/get_sensors`
``` 
[
    [
        "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
        "05c07598-7d72-4454-8c1f-afd09d960665"
    ]
]
```
<label class="label success">success</label>
```
{
  "code" : 0,
  "count" : 2,
  "sensors" : [
        {
            "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
            "name": "Illuminance",
            "class_name": "Illuminance",
            "display_name": "照度",
            "description": "照度",
            "enabled": true,
            "location_type": "movable",
            "location_point_zipcode": null,
            "location_point_prefectures": null,
            "location_point_city": null,
            "location_point_address": null,
            "location_in_out": null,
            "location_detail": null,
            "accuracy": 
            {
                "type": 0,
                "value": null
            },
            "minimum_scale": "1.0",
            "range": 
            {
                "min": "1.0",
                "max": "999999.0"
            },
            "recieve_window_time": 
            {
                "close_time": null,
                "open_time": null
            },
            "default_unit": "lx"
        },
        {
            "uuid" : "05c07598-7d72-4454-8c1f-afd09d960665",
            "class_name" : "Temperature",
            "name" : "Temperature",
            "description" : "温度",
            "display_name" : "温度",
            "enabled" : true,
            "location_detail" : null,
            "location_in_out" : null,
            "location_point_address" : null,
            "location_point_city" : null,
            "location_point_prefectures" : null,
            "location_point_zipcode" : null,
            "location_type" : "movable",
            "accuracy" : {
                "type" : 0,
                "value" : null
            },
            "minimum_scale" : null,
            "range" : {
                "max" : null,
                "min" : null
            },
            "recieve_window_time" : {
                "close_time" : null,
                "open_time" : null
            },
            "default_unit" : "degree Celsius"
        }
    ]
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

### Update sensor
<label class="label">POST</label>`/update_sensor`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
    "false",
    "location_type": "movable",
    "location_point_prefectures": "東京都",
    "location_point_city": "西東京市",
    "location_point_address": "ある場所 1-2-3 11号",
    "location_in_out": null,
    "location_detail": "白いビル",
    "receive_window_close_time": "23:00",
    "receive_window_open_time": "9:00"
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
    "reason":　"sensor not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>
