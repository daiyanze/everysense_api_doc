---
nav: lang/en
search: english
title: Everysense Data Output API
---

## Data Output API
### Retrive data
<label class="label">POST</label>`/get_output_data`
```
1. user uuid & password
{
    "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password": "password1234",
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902",
    "keep": "false",
    "limit": 500,
    "format": "JSON",
    "from": "2017-01-01 12:00:01 UTC",
    "to": "2017-01-01 12:10:00 UTC"
}

2. login id & password
{
    "login_name": "someone",
    "password": "password1234",
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902",
    "keep": "false",
    "limit": 500,
    "format": "JSON",
    "from": "2017-01-01 12:00:01 UTC",
    "to": "2017-01-01 12:10:00 UTC"
}

3. session key
{
    "session_key": "20353525-ae81-44d2-aea1-c94019e47366",
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902",
    "keep": "false",
    "limit": 500,
    "format": "JSON",
    "from": "2017-01-01 12:00:01 UTC",
    "to": "2017-01-01 12:10:00 UTC"
}
```

<label class="label success">success</label>
```
[
    [
        {
            "data" : {
                "at": "2017-01-01 12:01:00 UTC",
                "memo": "",
                "value": "698"
                "unit": "lx"
            },
            "data_class_name" : "Illuminance",
            "farm_uuid" : "a576c00c-54fe-4a9f-85aa-a69d8edb09ea",
            "sensor_name" : "collection_data_1"
        }
    ],
    [
        {
            "data" : {
                "at" : "2017-01-01 12:01:00 UTC",
                "memo": "",
                "unit" : "degree Celsius",
                "value" : "25"
            },
            "data_class_name" : "Temperature",
            "farm_uuid" : "a576c00c-54fe-4a9f-85aa-a69d8edb09ea",
            "sensor_name" : "collection_data_1"
        }
    ],
    ...
]
```
<label class="label danger">failure</label>
```
{
    "code" : -1,
    "reason" : "recipe not found"
}

or

{
    "code" : -2,
    "reason" : "authentication error"
}
```
<br>

### Retrieve farm owner of recipe
<label class="label">POST</label>`/get_recipe_farms`
```
1. ユーザUUIDとパスワードによる方法
[
    {
        "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
        "password": "password1234",
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
        "format": "JSON"
    }
]

2. ログイン名とパスワードによる方法
[
    {
        "login_name": "someone",
        "password": "password1234",
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
        "format": "JSON"
    }
]

3. セションキーによる方法
[
    {
        "session_key": "20353525-ae81-44d2-aea1-c94019e47366",
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
        "format": "JSON"
    }
]
```

<label class="label success">success</label>
"result"の値は文字列(String)
```
{
    "code" : 0,
    "result" : "[
        {\"farm_uuid\":\"a576c00c-54fe-4a9f-85aa-a69d8edb09ea\",\"住所\":\"***\",\"表示名\":\"jack\",\"性別\":\"男性\",\"生年月日\":\"1980-01-01\",\"職業\":\"役員/管理\",\"設置場所種別\":\"移動\",\"設置位置\":null,\"設置場所\":null,\"設置場所詳細\":null,\"shared_secret\":null}
    ]"
}
```
<label class="label danger">failure</label>
```
{
    "code" : -1,
    "reason" : "recipe not found"
}

or

{
    "code" : -2,
    "reason" : "authentication error"
}
```
<br>

### Delete buffer data
<label class="label">POST</label>`/clear_output_data`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "be07973c-17f6-47d4-b139-7ddfb98c2902",
    {
        "from": "2017-01-01 12:00:01 UTC",
        "to": "2017-01-01 12:10:00 UTC"
    }
]
```
<label class="label success">success</label>
```
{
    "code": 0
}
```
<label class="label danger">failure</label>
```
{
    "code" : -1,
    "reason" : "recipe not found"
}

or

{
    "code" : -2,
    "reason" : "authentication error"
}
```
<br>
