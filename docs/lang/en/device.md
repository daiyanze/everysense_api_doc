---
nav: lang/en
search: english
title: Everysense Device API
---

## Device API
### Retrieve list(available only)
<label class="label">POST</label>`/get_device`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "Everypost",
]
```

<label class="label success">success</label>
```
{
    "code" : 0, 
    "devices": [
        {
            "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
            "name":"EveryPost_new"
        },
        {
            "uuid": "faf83afe-f53f-4a03-a6ce-01fbe0d6a621",
            "name": "EveryPost_old"
        },
        ...
    ]
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Create new deivce
<label class="label">POST</label>`/create_device`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "Everypost",
    "Everypost_new",
    true,
]
```

<label class="label success">success</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device class not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Retrieve device
<label class="label">POST</label>`/get_device_info`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "066fc43e-52d5-477f-8cd4-f14a6861a655"
]
```

<label class="label success">success</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "device_name": "EveryPost_new",
    "device_enabled": true,
    "device_class_name": "EveryPost",
    "driver_class_name": "EveryPost",
    "version": "4",
    "sensor_list": [
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
        ...
    ]
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### update device
<label class="label">POST</label>`/update_device_info`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "Everypost_new_changed",
    "false",
    [
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
        ...
    ]
]
```
<label class="label success">success</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Register token
<label class="label">POST</label>`/add_device_token`
<p class="warning">
    What's this for ???
</p>

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "a new token"
]
```
<label class="label success">success</label>
```
{
  "code" : 0, 
  "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"device not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Retrieve device class
<label class="label">POST</label>`/get_device_class`
``` 
[
    "EveryPost",
    "4",
]
```
<label class="label success">success</label>
```
{
    "code" : 0,
    "description" : "EveryPost Data",
    "name" : "EveryPost",
    "version" : "4"
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
