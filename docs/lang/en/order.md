---
nav: lang/en
search: english
title: Everysense Order API
---

## Order API
### Retrieve list (method 1)
<label class="label">POST</label>`/get_order_list`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "20170101120001-20170101123000"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "uuids": [
      "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
      "f695683f-ec93-4356-b850-beb2d8c2b6f6",
      "388acf19-9a0d-427a-89f4-d6c636522517",
      "4f133cfe-05b5-4584-8cff-b1ee7410ace5",
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
```
<br>

### Retrieve list (method 2)
<label class="label">POST</label>`/get_order_list2`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "20170101120000",
    "20170104123000"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "uuids": [
      "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
      "f695683f-ec93-4356-b850-beb2d8c2b6f6",
      "388acf19-9a0d-427a-89f4-d6c636522517",
      "4f133cfe-05b5-4584-8cff-b1ee7410ace5",
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
```
<br>

### Retrieve list (method 3)
<label class="label">POST</label>`/get_order_list_with_entry`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "20170101120000",
    "20170101123000"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "orders": [
        {
            "uuid": "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
            "organization": "",
            "restaurant_owner_rank": 3,
            "restaurant_owner_web_url": "",
            "restaurant_owner_type_of_business": "",
            "recipe": "a recipe for test",
            "description": "",
            "purpose": "",
            "farm_uuid": "a576c00c-54fe-4a9f-85aa-a69d8edb09ea",
            "sensor_uuids": [
                {
                    "uuid": "05c07598-7d72-4454-8c1f-afd09d960665",
                    "output_level": "degree Celsius"
                },
                {
                    "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
                    "output_level": "lx"
                },
                {
                    "uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
                    "output_level": "WGS84"
                }
            ],
            "application_period_start": "2017-01-01 11:30:00 UTC",
            "application_period_end": "2017-01-01 12:00:00 UTC",
            "collection_period_start": "2017-01-01 12:00:00 UTC",
            "collection_period_end": "2017-01-04 12:30:00 UTC",
            "event_trigger": "timer",
            "maximum_receivable_post": 0,
            "time_interval": 5,
            "time_unit": "minute",
            "time_maximum_latency": 5,
            "time_maximum_latency_unit": "minute",
            "time_permissible_range": 2,
            "time_permissible_range_unit": "minute",
            "farm_status": "executable",
            "updated_at": "2017-01-02 05:41:14 UTC",
            "deleted_at": "",
            "recipe_status": "order",
            "third_party": false,
            "third_party_name": null,
            "commercial_use": false,
            "mismatched": false,
            "order_disabled": false,
            "shared_secret": null,
            "judge_type": "none",
            "judge_status": "unuse",
            "point_supply_enabled": false,
            "point_rate": "",
            "minimum_post_count_to_point": null,
            "bonus_point": null,
            "minimum_post_count_to_complete": null,
            "now_post_count": 100,
            "maxmum_gain_point": "0",
            "order_score_post_rate": 80,
            "maximum_posts": 10000
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
```
<br>

### Retrieve list (method 4)
<label class="label">POST</label>`/get_order_list_with_entry_only_header`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    "20170101120001-20170101123000"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "orders": [
        {
            "uuid": "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
            "recipe": "a recipe for test",
            "sensor_uuids": [
                {
                    "uuid": "05c07598-7d72-4454-8c1f-afd09d960665",
                    "output_level": "degree Celsius"
                },
                {
                    "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd ",
                    "output_level": "lx"
                },
                {
                    "uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
                    "output_level": "WGS84"
                }
            ],
            "application_period_start": "2017-01-01 11:30:00 UTC",
            "application_period_end": "2017-01-01 12:00:00 UTC",
            "collection_period_start": "2017-01-01 12:00:00 UTC",
            "collection_period_end": "2017-01-04 12:30:00 UTC",
            "time_interval": 5,
            "time_unit": "minute",
            "farm_status": "executable",
            "updated_at": "2017-01-02 05:41:14 UTC",
            "deleted_at": "",
            "mismatched": false,
            "order_disabled": false,
            "recipe_status": "order",
            "point_supply_enabled": false,
            "maxmum_gain_point": "0"
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
```
<br>

### Retrieve content
<label class="label">POST</label>`/get_order`
``` 
[
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a"
]
```

<label class="label success">success</label>
```
{
    "code": 0,
    "uuid":"6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
    "organization":"EverySense",
    "restaurant_owner_rank": 3,
    "restaurant_owner_web_url": "",
    "restaurant_owner_type_of_business": "",
    "recipe": "a recipe for test",
    "description": "",
    "purpose": "",
    "farm_uuid": "a576c00c-54fe-4a9f-85aa-a69d8edb09ea",
    "sensor_uuids":[
            {"uuid":"05c07598-7d72-4454-8c1f-afd09d960665","output_level":"degree Celsius"},
            {"uuid":"45d1c880-c5c7-4848-8dda-2dddaf24c259","output_level":"WGS84"},
            {"uuid":"ac9cf646-9071-410f-b7bb-f2ebb39f87fd","output_level":"lx"}
    ],
    "application_period_start": "2017-01-01 11:30:00 UTC",
    "application_period_end": "2017-01-01 12:00:00 UTC",
    "collection_period_start": "2017-01-01 12:00:00 UTC",
    "collection_period_end": "2017-01-04 12:30:00 UTC",
    "event_trigger": "timer",
    "maximum_receivable_post":0,
    "time_interval": 5,
    "time_unit": "minute",
    "time_maximum_latency": 5,
    "time_maximum_latency_unit": "minute",
    "time_permissible_range": 2,
    "time_permissible_range_unit": "minute",
    "farm_status": "executable",
    "updated_at": "2017-01-02 05:41:14 UTC",
    "deleted_at": "",
    "recipe_status": "order",
    "third_party": false,
    "third_party_name":null,
    "commercial_use": false,
    "mismatched": false,
    "order_disabled": false,
    "shared_secret": null,
    "judge_type": "none",
    "judge_status": "none",
    "point_supply_enabled": false,
    "point_rate": "",
    "minimum_post_count_to_point": null,
    "bonus_point": null,
    "minimum_post_count_to_complete": null,
    "now_post_count": 100,
    "maxmum_gain_point": "0",
    "order_score_post_rate": 80,
    "maximum_posts": 10000
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"order not found"
}
```
<br>

### Update content(Singular)
<label class="label">POST</label>`/update_order`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "f598717a-833a-49b0-a4a6-f6c7f0dc73bd",
    "deny",
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
    "reason":　"order not found"
}
```
<br>

### Update content (plural)
<label class="label">POST</label>`/update_orders`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    [
        {
            "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
            "allow"
        },
        {
            "f695683f-ec93-4356-b850-beb2d8c2b6f6",
            "deny"           
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
    "reason":　"order not found"
}
```
<br>

### Delete
<label class="label">POST</label>`/delete_order`
``` 
一個削除
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "f695683f-ec93-4356-b850-beb2d8c2b6f6"
]

複数削除
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    [
        "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
        "f695683f-ec93-4356-b850-beb2d8c2b6f6",
        "388acf19-9a0d-427a-89f4-d6c636522517",
        "4f133cfe-05b5-4584-8cff-b1ee7410ace5",
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
    "reason":　"order not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Retrieve functional status
<label class="label">POST</label>`/get_real_requests`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
    "20170101120000",
    "20170104123000"
]
```
<label class="label success">success</label>
```
{
    "code":　0,
    "results":
    [
        ["2017 01/01", 1134],
        ["2017 01/02", 1245],
        ["2017 01/03", 1096],
        ...
    ]
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"order not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>

### Update shared-secret
<label class="label">POST</label>`/update_order_shared_secret`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a",
    "something for shared secret",
]
```
<label class="label success">success</label>
```
{
    "code":　0
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"order not found"
}

or

{
    "code": -2,
    "reason":　"invalid user or password"
}
```
<br>
