---
search: ja
title: Everysense API ドキュメント
---

# Everysense API ドキュメント
本ドキュメントでは、EverySenseサーバと通信するためのAPI解説を行います

## はじめに

### 概要

デバイスとEverysense Serverとの通信は、デバイスゲートウェイを通じて行われます。

Everysense Serverlがデバイスと正しく通信するためには、デバイスゲートウェイは以下のことが出来る必要があります。
    
1. デバイスより受信したデータをデータサブシステムに送る
2. 受信したセンサーデータの単位系の整合
3. (必要なら)デバイスの認証
4. Everysense Serverの必要に応じて、デバイスへのpush

### Everysense APIの基本
デバイスゲートウェイとEverysense Serverとの間の通信は、全て MessagePack RPC を使います。

[MessagePack](http://msgpack.org) および [MessagePack RPC](https://github.com/msgpack-rpc/msgpack-rpc) についての詳しい説明については、当該ページを御覧下さい。仕様については、[MessagePack specification](https://github.com/msgpack/msgpack/blob/master/spec.md) にあります。

デバイスゲートウェイに提供するAPIのデータの型については、以下のものを使用します。

1. Integer represents an integer
2. Nil represents nil
3. Boolean represents true or false
4. Float represents a floating point number
5. String UTF-8 string
6. Array represents a sequence of objects

<p class="tip">
    Everysenseが提供したRest APIの通信メソッドは<label class="label">POST</label>のみとなります。
</p>

通信プロトコル: `https`

ホスト: `api.every-sense.com`

ポート: `8001`

Url: `https://api.every-sense.com:8001`

### API返り値
Everysense APIの返り値は `code` `data` `reason` `message` `trace` 四つの部分に組み立てられます。
`code`が負数の場合、`data`の代わりに `reason` `message` `trace` が返り値に参入します。

コード(code)
* 0 : 成功
* -1 : リソース不存在
* -2 : 認証失敗
* -10 : パラメーター誤用または漏らし 
* -20 : システムエラー

### Example
自分のアカウントでユーザーUUIDを取得する場合
<label class="label">POST</label>`https://api.every-sense.com:8001/auth_user`

リクエストボディー:
```
[
    "someone",
    "password123"
]
```

返り値:

<label class="label success">成功</label>
`{"code":0, "uuid":"1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"}`

<label class="label danger">失敗</label>
`{"code":-2, "reason":"invalid user or password"}`


## 認証API
#### 新規ユーザー作成
<label class="label">POST</label>`/new_user`


``` 
[
    "someone", // ログインに使うID
    "Jack", // ログイン用のIDとは別に画面上に表示する任意の名前
    "jack@email.com", // 通知を受信するメールアドレス
    "password123" // パスワード
]
```

<label class="label success">成功</label>
```
{
    "code": 0,
    "uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason": "..."
}
```

#### ユーザー認証
<label class="label">POST</label>`/auth_user`


``` 
[
    "someone", // ログインに使うID
    "password123" // パスワード
]
```

<label class="label success">成功</label>
```
{
    "code": 0,
    "uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"
}
```
<label class="label danger">失敗</label>
```
{
    "code": -2,
    "reason": "invalid user or password"
}
```

#### ユーザ情報の取得
<label class="label">POST</label>`/get_user`

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password123" // パスワード
]
```

<label class="label success">成功</label>
```
{
  "code" : 0, 
  "login" : "someone", // ログインに使うID
  "mail" : "jack@email.com", // 通知を受信するメールアドレス
  "name" : "Jack" // ログイン用のIDとは別に画面上に表示する任意の名前
}
```
<label class="label danger">失敗</label>
```
{
    "code": -2,
    "reason": "invalid user or password"
}
```
#### ユーザ情報の変更
<label class="label">POST</label>`/update_user`

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password123", // パスワード
    "other name", // 表示名変更(変更しようとする場合に入力)
    "john@email.com", // メールアドレス変更(変更しようとする場合に入力)
    "pasword1234" // パスワード変更(変更しようとする場合に入力)
]
```

<label class="label success">成功</label>
```
{
  "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason": "..."
}

or

{
    "code": -2,
    "reason": "invalid user or password"
}
```

## セションAPI
#### 認証用のセション作成
<label class="label">POST</label>`/create_session`

``` 
[
    {
        "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
        "password": "password123", // パスワード
        "description": "something" // セッション説明(省略可)
    }
]
```

<label class="label success">成功</label>
```
{
  "code" : 0, 
  "session_key": "20353525-ae81-44d2-aea1-c94019e47366" //　セッションキー
}
```
<label class="label danger">失敗</label>
```
{
    "code": -2,
    "reason": "invalid user or password"
}
```

#### セション有効性検査
<label class="label">POST</label>`/check_session`
``` 
[
    "20353525-ae81-44d2-aea1-c94019e47366" // セッションキー
]
```

<label class="label success">成功</label>
```
{
  "code" : 0, 
  "description": "something" // セッション説明文(省略の場合は`null`)
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"session not found"
}
```

#### セション無効化
<label class="label">POST</label>`/delete_session`
``` 
[
    "20353525-ae81-44d2-aea1-c94019e47366" // セッションキー
]
```

<label class="label success">成功</label>
```
{
  "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"session not found"
}
```

## メッセージルータAPI
#### データ送信
<label class="label">POST</label>`/put_message`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    [
        {
            "sensor_uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd", // センサーUUID
            "sensor_name": "Illuminance", // センサー名
            "data": {
                value: 700, // 値
                timestamp: "2017-01-01 12:00:01 UTC",　// タイムスタンプ
                unit: "lx" // 単位
            }
        },
        {
            "sensor_uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
            "sensor_name": "GPS",
            "data": {
                values: [36.68, 139.45], // 複数の場合はvalues
                timestamp: "2017-01-01 12:00:01 UTC",
                unit: "WGS84"
            }
        },
        ...
    ]
]
```

<label class="label success">成功</label>
```
{
  "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```

#### センサーUUID解析
<label class="label">POST</label>`/resolv`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "Illuminance" // センサー名(英文)
]
```

<label class="label success">成功</label>
```
{
  "code" : 0, 
  "uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd"
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"sensor not found"
}
```

#### 送信したデータ取得
<label class="label">POST</label>`/get_message`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655" // デバイスUUID
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
デバイスが存在しなくても以下の返り値が戻ります。
```
{
    "code": 0,
    "count": 0,
    "inputs": []
}
```

## オーダーAPI
#### リスト取得(方法1)
<label class="label">POST</label>`/get_order_list`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "20170101120001-20170101123000" //　指定範囲に更新されたもの(YYMMDDhhmmss-YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```

#### リスト取得(方法2)
<label class="label">POST</label>`/get_order_list2`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "20170101120000", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170104123000" //　オーダ期間終了日時(YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```

#### リスト取得(方法3)
<label class="label">POST</label>`/get_order_list_with_entry`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "20170101120000", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170101123000" //　オーダ期間終了日時(YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```

#### リスト取得(方法4)
<label class="label">POST</label>`/get_order_list_with_entry_only_header`
``` 
[
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    "20170101120001-20170101123000" //　指定範囲に更新されたもの(YYMMDDhhmmss-YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"device not found"
}
```

#### 内容取得
<label class="label">POST</label>`/get_order`
``` 
[
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a" // オーダーUUID
]
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"order not found"
}
```

#### 状態変更(一個)
<label class="label">POST</label>`/update_order`
<p class="warning">
    Not working
</p>

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "f598717a-833a-49b0-a4a6-f6c7f0dc73bd", //　オーダーUUID
    "deny", // オーダーステータス("none", "allow", "wait_for_active", "active", "done", "deny", "cancel", "suspend")
]
```

<label class="label success">成功</label>
```
{
  "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"order not found"
}
```

#### 状態変更(複数)
<label class="label">POST</label>`/update_orders`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    [
        {
            "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a", //　オーダーUUID  
            "allow" // オーダーステータス("none", "allow", "wait_for_active", "active", "done", "deny", "cancel", "suspend")      
        },
        {
            "f695683f-ec93-4356-b850-beb2d8c2b6f6", //　オーダーUUID  
            "deny"           
        },
        ...
    ]
]
```

<label class="label success">成功</label>
```
{
    "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"order not found"
}
```

#### 削除
<label class="label">POST</label>`/delete_order`
``` 
一個削除
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "f695683f-ec93-4356-b850-beb2d8c2b6f6" //　オーダーUUID
]

複数削除
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    [
        "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a", //　オーダーUUID
        "f695683f-ec93-4356-b850-beb2d8c2b6f6",
        "388acf19-9a0d-427a-89f4-d6c636522517",
        "4f133cfe-05b5-4584-8cff-b1ee7410ace5",
        ...
    ]
]
```

<label class="label success">成功</label>
```
{
    "code" : 0
}
```
<label class="label danger">失敗</label>
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

#### 稼動状態取得
<label class="label">POST</label>`/get_real_requests`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a", //　オーダーUUID
    "20170101120000", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170104123000" //　オーダ期間終了日時(YYMMDDhhmmss)
]
```
<label class="label success">成功</label>
```
{
    "code":　0,
    "results":
    [
        ["2017 01/01", 1134], // [日時, ポスト数]
        ["2017 01/02", 1245],
        ["2017 01/03", 1096],
        ...
    ]
}
```
<label class="label danger">失敗</label>
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
#### シェアードシークレット変更
<label class="label">POST</label>`/update_order_shared_secret`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "6c0f1b6b-acbf-4a1c-97aa-131f8aad7a2a", //　オーダーUUID
    "something for shared secret", // シェアードシークレット
]
```
<label class="label success">成功</label>
```
{
    "code":　0
}
```
<label class="label danger">失敗</label>
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

## デバイスAPI
#### リスト取得(利用可能のみ)
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
#### 新規作成
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

#### 情報取得
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

#### 情報更新
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

#### トークン登録
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

#### デバイスクラス取得
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

## センサーAPI
#### 情報取得
<label class="label">POST</label>`/get_sensor`
``` 
[
    "ac9cf646-9071-410f-b7bb-f2ebb39f87fd" // センサーUUID
]
```
<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"sensor not found"
}
```

#### リスト取得
<label class="label">POST</label>`/get_sensors`
``` 
[
    [
        "ac9cf646-9071-410f-b7bb-f2ebb39f87fd", // センサーUUID
        "05c07598-7d72-4454-8c1f-afd09d960665"
    ]
]
```
<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
```
{
    "code": -1,
    "reason":　"sensor not found"
}
```

#### 情報更新
<label class="label">POST</label>`/update_sensor`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "ac9cf646-9071-410f-b7bb-f2ebb39f87fd", // センサーUUID
    "false", // 有効/無効
    "location_type": "movable", // (undefined 未設定 / fix 固定 / movable 移動)
    "location_point_prefectures": "東京都", // 都道府県
    "location_point_city": "西東京市",
    "location_point_address": "ある場所 1-2-3 11号",
    "location_in_out": null, // (null 未設定 / indoor 屋内 / outdoor 屋外)
    "location_detail": "白いビル",
    "receive_window_close_time": "23:00", // "HH:mm" (UTC)
    "receive_window_open_time": "9:00" // "HH:mm" (UTC)
]
```
<label class="label success">成功</label>
```
{
    "code" : 0
}
```
<label class="label danger">失敗</label>
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

## ファームAPI
#### リスト取得
<label class="label">POST</label>`/get_farm_list`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm_list' for #<DataFlowServer:0x00562aa9912f10>\nDid you mean?  get_order_list"
    }
    
</p>

#### 内容取得(方法1)
<label class="label">POST</label>`/get_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm' for #<DataFlowServer:0x00562aa973faf8>\nDid you mean?  get_farm_owner"
    }
</p>

#### 内容取得(方法2)
<label class="label">POST</label>`/get_farm_list_with_entry`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm_list_with_entry' for #<DataFlowServer:0x00562aa9cbc2b0>\nDid you mean?  get_order_list_with_entry\n               get_order_list_with_entry2"
    }
</p>

#### 新規作成
<label class="label">POST</label>`/create_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `create_farm' for #<DataFlowServer:0x00562aa81d5b40>\nDid you mean?  create_farm_owner"
    }
</p>

#### 情報更新
<label class="label">POST</label>`/update_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `update_farm' for #<DataFlowServer:0x00562aa8506198>\nDid you mean?  update_farm_owner"
    }
</p>

## ファームオーナAPI
#### 情報取得
<label class="label">POST</label>`/get_farm_owner`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234" //　パスワード
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "uuid" : "84b4bd8c-ab9f-49b8-b4bc-e399865638f1", // ファームオーナーUUID
    "owner_fields" : [
        {
            "name" : "キーワード",
            "type" : "STRING",
            "value" : "#everypost #everystamp"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "1-2-3 11号"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "ある場所"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "1234567"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "西東京市"
        },
        {
            "collections" : [
                {
                    "label" : "女性",
                    "value" : 1
                },
                {
                    "label" : "男性",
                    "value" : 2
                },
                {
                    "label" : "トランスジェンダー（女性）",
                    "value" : 3
                },
                {
                    "label" : "トランスジェンダー（男性)",
                    "value" : 4
                },
                {
                    "label" : "該当なし",
                    "value" : 5
                },
                {
                    "label" : "設定しない",
                    "value" : 6
                }
            ],
            "name" : "性別",
            "type" : "RADIO",
            "value" : "2"
        },
        {
            "name" : "生年月日",
            "type" : "DATE",
            "value" : "1980-01-01 00:00:00 UTC"
        },
        {
          "collections" : [
                {
                    "label" : "役員/管理",
                    "value" : 1
                },
                {
                    "label" : "専門職（医師、弁護士等）",
                    "value" : 2
                },
                {
                    "label" : "教員",
                    "value" : 3
                },
                {
                    "label" : "コンピュータ関連技術者",
                    "value" : 4
                },
                {
                    "label" : "その他技術者",
                    "value" : 5
                },
                {
                    "label" : "サービス/カスタマーサポート",
                    "value" : 6
                },
                {
                    "label" : "事務職",
                    "value" : 7
                },
                {
                    "label" : "営業/マーケティング",
                    "value" : 8
                },
                {
                    "label" : "販売員",
                    "value" : 9
                },
                {
                    "label" : "大学生/大学院生",
                    "value" : 10
                },
                {
                    "label" : "小/中/高校生",
                    "value" : 11
                },
                {
                    "label" : "主婦",
                    "value" : 12
                },
                {
                    "label" : "自営業",
                    "value" : 13
                },
                {
                    "label" : "その他",
                    "value" : 14
                }
          ],
          "name" : "職業",
          "type" : "LIST",
          "value" : "1"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "東京都"
        }
    ]
}
```
<label class="label danger">失敗</label>
<p class="warning">
    返り値が
    {
        "code": -2
    }
    "reason"が忘れた？
    {
        "code": -2,
        "reason":　"invalid user or password"
    }
</p>

```
{
    "code": -2
}
```

#### 新規作成
<label class="label">POST</label>`/create_farm_owner`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    [ // 変更しようとするオーナーフィールド
        {
            "name" : "キーワード",
            "type" : "STRING",
            "value" : "#everypost #everystamp"
        },
        {
            "name" : "住所",
            "type" : "LOCATION",
            "value" : "1-2-3 22号"
        },
        ...
    ]   
]
```

#### フィールドリスト取得
<label class="label">POST</label>`/get_farm_owner_fields`
```
null // 引数は不要です
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "fields" : [
        {
            "collections" : [
                {
                    "label" : "女性",
                    "value" : 1
                },
                {
                    "label" : "男性",
                    "value" : 2
                },
                {
                    "label" : "トランスジェンダー（女性）",
                    "value" : 3
                },
                {
                    "label" : "トランスジェンダー（男性)",
                    "value" : 4
                },
                {
                    "label" : "該当なし",
                    "value" : 5
                },
                {
                    "label" : "設定しない",
                    "value" : 6
                }
            ],
            "name" : "性別",
            "type" : "RADIO"
            },
            {
            "name" : "生年月日",
            "type" : "DATE"
        },
        {
            "collections" : [
                {
                    "label" : "役員/管理",
                    "value" : 1
                },
                {
                    "label" : "専門職（医師、弁護士等）",
                    "value" : 2
                },
                {
                    "label" : "教員",
                    "value" : 3
                },
                {
                    "label" : "コンピュータ関連技術者",
                    "value" : 4
                },
                {
                    "label" : "その他技術者",
                    "value" : 5
                },
                {
                    "label" : "サービス/カスタマーサポート",
                    "value" : 6
                },
                {
                    "label" : "事務職",
                    "value" : 7
                },
                {
                    "label" : "営業/マーケティング",
                    "value" : 8
                },
                {
                    "label" : "販売員",
                    "value" : 9
                },
                {
                    "label" : "大学生/大学院生",
                    "value" : 10
                },
                {
                    "label" : "小/中/高校生",
                    "value" : 11
                },
                {
                    "label" : "主婦",
                    "value" : 12
                },
                {
                    "label" : "自営業",
                    "value" : 13
                },
                {
                    "label" : "その他",
                    "value" : 14
                }
            ],
            "name" : "職業",
            "type" : "LIST"
        },
        {
            "name" : "キーワード",
            "type" : "STRING"
        },
        {
            "name" : "住所",
            "type" : "LOCATION"
        }
    ]
}
```

## オーナAPI
#### 情報取得
<label class="label">POST</label>`/get_owner`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234" //　パスワード
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "uuid" : "2ca065a9-aaac-4d06-86cb-5acd43f43699", // オーナーUUID
    "owner_fields" : [
        {
            "name" : "氏名(もしくは法人名)",
            "private" : true,
            "required" : true,
            "type" : "STRING",
            "value" : "jack"
        },
        {
          "collections" : [
            {
                "label" : "農業・林業",
                "value" : 1
            },
            {
                "label" : "漁業",
                "value" : 2
            },
            {
                "label"   : "鉱業、採石業、砂利採取業",
                "value"   : 3
            },
            {
                  "label" : "建設業",
                  "value" : 4
            },
            {
                  "label" : "製造業",
                  "value" : 5
            },
            {
                  "label" : "電気・ガス・熱供給・水道業",
                  "value" : 6
            },
            {
                  "label" : "情報通信業",
                  "value" : 7
            },
            {
                  "label" : "運輸業・郵便業",
                  "value" : 8
            },
            {
                  "label" : "卸売業・小売業",
                  "value" : 9
            },
            {
                  "label" : "金融業・保険業",
                  "value" : 10
            },
            {
                  "label" : "不動産業・物品賃貸業",
                  "value" : 11
            },
            {
                  "label" : "学術研究、専門・技術サービス業",
                  "value" : 12
            },
            {
                  "label" : "宿泊業、飲食サービス業",
                  "value" : 13
            },
            {
                  "label" : "生活関連サービス業、娯楽業",
                  "value" : 14
            },
            {
                  "label" : "教育、学習支援業",
                  "value" : 15
            },
            {
                  "label" : "医療、福祉",
                  "value" : 16
            },
            {
                  "label" : "複合サービス事業",
                  "value" : 17
            },
            {
                  "label" : "サービス業（他に分類されないもの）",
                  "value" : 18
            },
            {
                  "label" : "公務",
                  "value" : 19
            },
            {
                  "label" : "分類不能の産業",
                  "value" : 20
            }
          ],
          "name" : "業種",
          "private" : true,
          "required" : true,
          "type" : "LIST",
          "value" : "7"
        },
    {
      "name" : "電話番号",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "123456789012"
    },
    {
      "name" : "担当者名",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack"
    },
    {
      "name" : "担当者メールアドレス",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack@email.com"
    },
    {
      "name" : "技術担当者名",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack"
    },
    {
      "name" : "技術担当者メールアドレス",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack@email.com"
    },
    {
      "name" : "経理担当者名",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack"
    },
    {
      "name" : "経理担当者メールアドレス",
      "private" : true,
      "required" : true,
      "type" : "STRING",
      "value" : "jack@email.com"
    },
    {
      "name" : "住所",
      "private" : false,
      "required" : true,
      "type" : "LOCATION",
      "value" : "東京都",
      "variable_name" : "prefecture"
    },
    {
      "name" : "住所",
      "private" : false,
      "required" : true,
      "type" : "LOCATION",
      "value" : "1234567",
      "variable_name" : "zipcode"
    },
    {
      "name" : "表示名",
      "private" : false,
      "required" : true,
      "type" : "STRING",
      "value" : "jack"
    },
    {
        "collections" : [
            {
                  "label" : "女性",
                  "value" : 1
            },
            {
                  "label" : "男性",
                  "value" : 2
            },
            {
                  "label" : "トランスジェンダー（女性）",
                  "value" : 3
            },
            {
                  "label" : "トランスジェンダー（男性)",
                  "value" : 4
            },
            {
                  "label" : "該当なし",
                  "value" : 5
            },
            {
                  "label" : "設定しない",
                  "value" : 6
            }
        ],
        "name" : "性別",
        "private" : false,
        "required" : false,
        "type" : "RADIO",
        "value" : "2"
    },
    {
        "name" : "生年月日",
        "private" : false,
        "required" : false,
        "type" : "DATE",
        "value" : "1980-01-01 00:00:00 UTC"
    },
    {
        "collections" : [
            {
                  "label" : "役員/管理",
                  "value" : 1
            },
            {
                  "label" : "専門職（医師、弁護士等）",
                  "value" : 2
            },
            {
                  "label" : "教員",
                  "value" : 3
            },
            {
                  "label" : "コンピュータ関連技術者",
                  "value" : 4
            },
            {
                  "label" : "その他技術者",
                  "value" : 5
            },
            {
                  "label" : "サービス/カスタマーサポート",
                  "value" : 6
            },
            {
                  "label" : "事務職",
                  "value" : 7
            },
            {
                  "label" : "営業/マーケティング",
                  "value" : 8
            },
            {
                  "label" : "販売員",
                  "value" : 9
            },
            {
                  "label" : "大学生/大学院生",
                  "value" : 10
            },
            {
                  "label" : "小/中/高校生",
                  "value" : 11
            },
            {
                  "label" : "主婦",
                  "value" : 12
            },
            {
                  "label" : "自営業",
                  "value" : 13
            },
            {
                  "label" : "その他",
                  "value" : 14
            }
        ],
        "name" : "職業",
        "private" : false,
        "required" : false,
        "type" : "LIST",
        "value" : "1"
    },
    {
        "name" : "住所",
        "private" : false,
        "required" : true,
        "type" : "LOCATION",
        "value" : "ある場所",
        "variable_name" : "address1"
    },
    {
        "name" : "住所",
        "private" : false,
        "required" : true,
        "type" : "LOCATION",
        "value" : "西東京市",
        "variable_name" : "city"
    },
    {
        "name" : "ウェブサイトURL",
        "private" : true,
        "required" : false,
        "type" : "STRING",
        "value" : "http://www.itsjackswebsite.com"
    },
    {
        "name" : "キーワード",
        "private" : true,
        "required" : false,
        "type" : "STRING",
        "value" : "#everypost #everystamp"
    },
    {
        "name" : "住所",
        "private" : false,
        "required" : true,
        "type" : "LOCATION",
        "value" : "1-2-3 22号",
        "variable_name" : "address2"
    }
  ]
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```

#### フィールドリスト取得
<label class="label">POST</label>`/get_owner_fields`
```
null // 引数は不要です
```
<label class="label success">成功</label>
```
{
  "code": 0,
  "fields": [
        {
            "name": "氏名(もしくは法人名)",
            "type": "STRING"
        },
        {
            "name": "住所",
            "type": "LOCATION"
        },
        {
            "collections": [
                    {
                        "label": "女性",
                        "value": 1
                    },
                    {
                        "label": "男性",
                        "value": 2
                    },
                    {
                        "label": "トランスジェンダー（女性）",
                        "value": 3
                    },
                    {
                        "label": "トランスジェンダー（男性)",
                        "value": 4
                    },
                    {
                        "label": "該当なし",
                        "value": 5
                    },
                    {
                        "label": "設定しない",
                        "value": 6
                    }
                ],
                "name": "性別",
                "type": "RADIO"
        },
        {
            "name": "生年月日",
            "type": "DATE"
        },
        {
            "collections": [
                {
                    "label": "役員/管理",
                    "value": 1
                },
                {
                    "label": "専門職（医師、弁護士等）",
                    "value": 2
                },
                {
                    "label": "教員",
                    "value": 3
                },
                {
                    "label": "コンピュータ関連技術者",
                    "value": 4
                },
                {
                    "label": "その他技術者",
                    "value": 5
                },
                {
                    "label": "サービス/カスタマーサポート",
                    "value": 6
                },
                {
                    "label": "事務職",
                    "value": 7
                },
                {
                    "label": "営業/マーケティング",
                    "value": 8
                },
                {
                    "label": "販売員",
                    "value": 9
                },
                {
                    "label": "大学生/大学院生",
                    "value": 10
                },
                {
                    "label": "小/中/高校生",
                    "value": 11
                },
                {
                    "label": "主婦",
                    "value": 12
                },
                {
                    "label": "自営業",
                    "value": 13
                },
                {
                    "label": "その他",
                    "value": 14
                }
            ],
            "name": "職業",
            "type": "LIST"
        },
        {
            "name": "キーワード",
            "type": "STRING"
        },
        {
            "name": "表示名",
            "type": "STRING"
        },
        {
            "collections": [
                {
                    "label": "農業・林業",
                    "value": 1
                },
                {
                    "label": "漁業",
                    "value": 2
                },
                {
                    "label": "鉱業、採石業、砂利採取業",
                    "value": 3
                },
                {
                    "label": "建設業",
                    "value": 4
                },
                {
                    "label": "製造業",
                    "value": 5
                },
                {
                    "label": "電気・ガス・熱供給・水道業",
                    "value": 6
                },
                {
                    "label": "情報通信業",
                    "value": 7
                },
                {
                    "label": "運輸業・郵便業",
                    "value": 8
                },
                {
                    "label": "卸売業・小売業",
                    "value": 9
                },
                {
                    "label": "金融業・保険業",
                    "value": 10
                },
                {
                    "label": "不動産業・物品賃貸業",
                    "value": 11
                },
                {
                    "label": "学術研究、専門・技術サービス業",
                    "value": 12
                },
                {
                    "label": "宿泊業、飲食サービス業",
                    "value": 13
                },
                {
                    "label": "生活関連サービス業、娯楽業",
                    "value": 14
                },
                {
                    "label": "教育、学習支援業",
                    "value": 15
                },
                {
                    "label": "医療、福祉",
                    "value": 16
                },
                {
                    "label": "複合サービス事業",
                    "value": 17
                },
                {
                    "label": "サービス業（他に分類されないもの）",
                    "value": 18
                },
                {
                    "label": "公務",
                    "value": 19
                },
                {
                    "label": "分類不能の産業",
                    "value": 20
                }
            ],
            "name": "業種",
            "type": "LIST"
        },
        {
          "name": "ウェブサイトURL",
          "type": "STRING"
        },
        {
          "name": "電話番号",
          "type": "STRING"
        },
        {
          "name": "担当者名",
          "type": "STRING"
        },
        {
          "name": "担当者メールアドレス",
          "type": "STRING"
        },
        {
          "name": "技術担当者名",
          "type": "STRING"
        },
        {
          "name": "技術担当者メールアドレス",
          "type": "STRING"
        },
        {
          "name": "経理担当者名",
          "type": "STRING"
        },
        {
          "name": "経理担当者メールアドレス",
          "type": "STRING"
        }
    ]
}
```

#### 「都道府県市」リスト取得
<label class="label">POST</label>`/get_prefectures`
```
null // 引数は不要です
```
<label class="label success">成功</label>
```
[
    "code" : 0,
    "cities" : {
        "三重県" : [
            {
                "name" : "津市"
            },
            {
                "name" : "四日市市"
            },
            ...
        ],
        "京都府" : [
            {
                "name" : "京都市"
            },
            {
                "name" : "福知山市"
            },
            ...
        ],
        ...
]
```

#### ID取得
<label class="label">POST</label>`/get_owner_id`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234" // パスワード
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "id" : 126
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```

## 自動承認API
#### 情報取得
<label class="label">POST</label>`/get_auto_accept_order_setting`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234" // パスワード
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "commercial_use" : true, // 商用利用するオーダー
    "non_commercial_use" : true, // 商用利用しないオーダー
    "non_reward_points" : true, // 第三者提供するオーダー
    "non_third_party_use" : true, // 提供者が未定でも承認する
    "reward_points" : true, // 第三者提供しないオーダー
    "third_party_use" : true, // ポイント付与ありのオーダー
    "undefined_third_party" : true // ポイント付与なしのオーダー
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```

#### 情報更新
<label class="label">POST</label>`/update_auto_accept_order_setting`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", // パスワード
    true, // 商用利用するオーダー
    true, // 商用利用しないオーダー
    true, // 第三者提供するオーダー
    true, // 提供者が未定でも承認する
    true, // 第三者提供しないオーダー
    true, // ポイント付与ありのオーダー
    true // ポイント付与なしのオーダー    
]
```
<label class="label success">成功</label>
```
{
    "code" : 0
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -1,
    "reason" : "auto accept order setting is not set"
}

or

{
    "code" : -2,
    "reason" : "authentication error"
}
```

## 通知API
#### 情報取得
<label class="label">POST</label>`/get_notification_setting`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", // パスワード
    "066fc43e-52d5-477f-8cd4-f14a6861a655" // デバイスUUID
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "notifications" : {
        "auto_accept_order" : true,
        "end_collect_data" : true,
        "fixed_point" : true,
        "new_order" : true,
        "receive_review_result" : true,
        "start_collect_data" : true
    }
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -1,
    "reason" : "device not found"
}

or

{
    "code" : -2,
    "reason" : "invalid user or password"
}
```

#### 情報更新
<label class="label">POST</label>`/upadate_notification_setting`
<p class="warning">
    Spelling mistake
    "up<b><u>a</u></b>date_notification_setting" => "update_notification_setting"
</p>

```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", // パスワード
    "066fc43e-52d5-477f-8cd4-f14a6861a655", // デバイスUUID
    {
        "auto_accept_order": false, // 新着のオーダーが来た時
        "end_collect_data": false, // 自動承認が行われた時
        "fixed_point": false, // データ取得の開始時
        "new_order": true, // 審査結果に変更があった時
        "receive_review_result": true, // データ取得の終了時
        "start_collect_data": true // ポイントが確定した時
    }
]
```
<label class="label success">成功</label>
```
{
    "code": 0,
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -1,
    "reason" : "device not found"
}

or

{
    "code" : -2,
    "reason" : "invalid user or password"
}
```

## データ出力API
#### データ取得
<label class="label">POST</label>`/get_output_data`
```
1. ユーザUUIDとパスワードによる方法
{
    "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password": "password1234", // パスワード
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902", // レシピUUID
    "keep": "false", // データを保持するかどうか
    "limit": 500, // 最大取り出し件数 (デフォルト:1000)
    "format": "JSON", // 出力フォーマット(英文大文字 XML/JSON、デフォルト: JSON)
    "from": "2017-01-01 12:00:01 UTC", // 出力開始日時(UTC)
    "to": "2017-01-01 12:10:00 UTC" // 出力終了日時(UTC)
}

2. ログイン名とパスワードによる方法
{
    "login_name": "someone", // ログイン名
    "password": "password1234", // パスワード
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902",
    "keep": "false",
    "limit": 500,
    "format": "JSON",
    "from": "2017-01-01 12:00:01 UTC",
    "to": "2017-01-01 12:10:00 UTC"
}

3. セションキーによる方法
{
    "session_key": "20353525-ae81-44d2-aea1-c94019e47366", // セッションキー
    "recipe_uuid": "be07973c-17f6-47d4-b139-7ddfb98c2902",
    "keep": "false",
    "limit": 500,
    "format": "JSON",
    "from": "2017-01-01 12:00:01 UTC",
    "to": "2017-01-01 12:10:00 UTC"
}
```

<label class="label success">成功</label>
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
<label class="label danger">失敗</label>
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
#### ファーム情報取得
<label class="label">POST</label>`/get_recipe_farms`
```
1. ユーザUUIDとパスワードによる方法
[
    {
        "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
        "password": "password1234", // パスワード
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655", // レシピUUID
        "format": "JSON" // 出力フォーマット(英文大文字 XML/JSON、デフォルト: JSON)
    }
]

2. ログイン名とパスワードによる方法
[
    {
        "login_name": "someone", // ログイン名
        "password": "password1234", // パスワード
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
        "format": "JSON"
    }
]

3. セションキーによる方法
[
    {
        "session_key": "20353525-ae81-44d2-aea1-c94019e47366", // セッションキー
        "recipe_uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655",
        "format": "JSON"
    }
]
```

<label class="label success">成功</label>
"result"の値は文字列(String)
```
{
    "code" : 0,
    "result" : "[
        {\"farm_uuid\":\"a576c00c-54fe-4a9f-85aa-a69d8edb09ea\",\"住所\":\"***\",\"表示名\":\"jack\",\"性別\":\"男性\",\"生年月日\":\"1980-01-01\",\"職業\":\"役員/管理\",\"設置場所種別\":\"移動\",\"設置位置\":null,\"設置場所\":null,\"設置場所詳細\":null,\"shared_secret\":null}
    ]"
}
```
<label class="label danger">失敗</label>
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

#### バッファデータ削除
<label class="label">POST</label>`/clear_output_data`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", // パスワード
    "be07973c-17f6-47d4-b139-7ddfb98c2902", // レシピUUID
    {
        "from": "2017-01-01 12:00:01 UTC", // 出力開始時刻
        "to": "2017-01-01 12:10:00 UTC" // 出力終了時刻
    }
]
```
<label class="label success">成功</label>
```
{
    "code": 0
}
```
<label class="label danger">失敗</label>
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

## レシピAPI
#### 内容取得
<label class="label">POST</label>`/get_recipe`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", // パスワード
    "be07973c-17f6-47d4-b139-7ddfb98c2902" // レシピUUID
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "recipe" : {
        "name" : "a recipe for test",
        "uuid" : "be07973c-17f6-47d4-b139-7ddfb98c2902",
        "application_period_start" : "2017-01-01 11:30:00 UTC",
        "application_period_end" : "2017-01-01 12:00:00 UTC",
        "collection_period_start" : "2017-01-01 12:00:00 UTC",
        "collection_period_end" : "2017-01-04 12:30:00 UTC",
        "collection_sensor_data" : [
            {
                "device_class" : "EveryPost",
                "device_sensor" : "Illuminance",
                "location_in_out" : "undefined",
                "location_point_address" : "",
                "location_point_city" : null,
                "location_point_prefectures" : "",
                "location_type" : "undefined",
                "meta_level" : "none",
                "virtual_sensor_name" : "collection_data_1"
            },
            {
                "device_class" : "EveryPost",
                "device_sensor" : "Temperature",
                "location_in_out" : "undefined",
                "location_point_address" : "",
                "location_point_city" : null,
                "location_point_prefectures" : "",
                "location_type" : "undefined",
                "meta_level" : "none",
                "virtual_sensor_name" : "collection_data_1"
            },
            {
                "device_class" : "EveryPost",
                "device_sensor" : "GPS",
                "location_in_out" : "undefined",
                "location_point_address" : "",
                "location_point_city" : null,
                "location_point_prefectures" : "",
                "location_type" : "undefined",
                "meta_level" : "none",
                "virtual_sensor_name" : "collection_data_1"
            }
        ],
        "commercial_use" : false,
        "deleted_at" : "",
        "bonus_point" : null,
        "description" : "",
        "event_trigger" : "timer",
        "farm_owner_conditions" : [
            {
                "field" : "職業",
                "function_name" : "いずれかを含む",
                "function_type" : "CheckboxIn",
                "value" : {
                    "selected" : [
                        "役員/管理",
                        "専門職（医師、弁護士等）",
                        "教員",
                        "コンピュータ関連技術者",
                        "その他技術者",
                        "サービス/カスタマーサポート",
                        "事務職",
                        "営業/マーケティング",
                        "販売員",
                        "大学生/大学院生",
                        "小/中/高校生",
                        "主婦",
                        "自営業",
                        "その他"
                    ]
                }
            },
            {
                "field" : "性別",
                "function_name" : "いずれかを含む",
                "function_type" : "RadioIn",
                "value" : {
                  "selected" : [
                        "女性",
                        "男性",
                        "トランスジェンダー（女性）",
                        "トランスジェンダー（男性)",
                        "該当なし",
                        "設定しない"
                    ]
                }
            }
        ],
        "judge_type" : "none",
        "maximum_posts" : 10000,
        "maximum_receivable_post" : 10000,
        "maxmum_gain_point" : "0",
        "minimum_post_count_to_complete" : null,
        "minimum_post_count_to_point" : null,
        "order_issue_unit" : "Farm",
        "point_rate" : "",
        "point_supply_enabled" : false,
        "private_recipe" : false,
        "purpose" : "",
        "quota_of_farms" : 1,
        "third_party" : false,
        "third_party_name" : null,
        "time_interval" : 5,
        "time_maximum_latency" : 5,
        "time_maximum_latency_unit" : "minute",
        "time_permissible_range" : 2,
        "time_permissible_range_unit" : "minute",
        "time_unit" : "",
        "updated_at" : "2017-01-02 05:41:14 UTC"
    }
}
```
<label class="label danger">失敗</label>
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

#### リスト取得
<label class="label">POST</label>`/get_recipe_list`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234" // パスワード
]
```
<label class="label success">成功</label>
```
{
    "code" : 0,
    "uuids" : [
        "be07973c-17f6-47d4-b139-7ddfb98c2902",
        "5958a90f-0b66-458d-999f-4ccbd7e01e28",
        ...
    ]
}
```
<label class="label danger">失敗</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```
