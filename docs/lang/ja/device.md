---
search: ja
title: Everysense デバイスAPI
---

## デバイスAPI
### リスト取得(利用可能のみ)
<label class="label">POST</label>`/get_device`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "Everypost", // デバイスクラス名
]
```

<label class="label success">成功</label>
```
{
    "code" : 0, 
    "devices": [
        {
            "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
            "name":"EveryPost_new" // デバイス名
        },
        {
            "uuid": "faf83afe-f53f-4a03-a6ce-01fbe0d6a621",
            "name": "EveryPost_old"
        },
        ...
    ]
}
```
<label class="label danger">失敗</label>
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

### 新規作成
<label class="label">POST</label>`/create_device`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "Everypost", // ドライバー名
    "Everypost_new", // デバイス名
    true, // 有効(true)/無効(false)
]
```

<label class="label success">成功</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">失敗</label>
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

### 情報取得
<label class="label">POST</label>`/get_device_info`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "066fc43e-52d5-477f-8cd4-f14a6861a655" // デバイスUUID
]
```

<label class="label success">成功</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "device_name": "EveryPost_new", // デバイス名
    "device_enabled": true, // 有効/無効
    "device_class_name": "EveryPost", // デバイスクラス名
    "driver_class_name": "EveryPost", // ドライバー名
    "version": "4", // デバイスバージョン
    "sensor_list": [ // デバイスにあるセンサーのリスト
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
<label class="label danger">失敗</label>
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

### 情報更新
<label class="label">POST</label>`/update_device_info`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "Everypost_new_changed", // デバイス名
    "false", // 有効/無効
    [ // 変更しようとするセンサーリスト
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
<label class="label success">成功</label>
```
{
    "code" : 0, 
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">失敗</label>
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

### トークン登録
<label class="label">POST</label>`/add_device_token`
<p class="warning">
    What's this for ???
</p>

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "a new token" // デバイストークン
]
```
<label class="label success">成功</label>
```
{
  "code" : 0, 
  "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"　// デバイスUUID
}
```
<label class="label danger">失敗</label>
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

### デバイスクラス取得
<label class="label">POST</label>`/get_device_class`
``` 
[
    "EveryPost", // ドライバー名
    "4", //　バージョン
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "description" : "EveryPost Data",
    "name" : "EveryPost",
    "version" : "4"
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```
<br>
