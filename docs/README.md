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
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password123", // パスワード
    "something" // セッション説明(省略可)
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
<p class="danger">
    エラー
</p>
`ERROR
{"code":-10,"message":"PG::UndefinedTable: ERROR:  missing FROM-clause entry for table \"session_key\"\nLINE 1: ...ELECT  \"api_sessions\".* FROM \"api_sessions\" WHERE \"session_k...\n                                                             ^\n: SELECT  \"api_sessions\".* FROM \"api_sessions\" WHERE \"session_key\".\"user_uuid\" = '36c034a9-32ea-4840-b5d0-9cf90a1f77a3' AND \"session_key\".\"password\" = 'daiyanze8964' AND \"session_key\".\"session_key\" = 'e6d670db-54b0-4eb4-b009-884bfdb65d89'  ORDER BY \"api_sessions\".\"id\" ASC LIMIT 1"}
`

## メッセージルータAPI
#### データ送信
<label class="label">POST</label>`/put_message`
``` 
[
    "e6d670db-54b0-4eb4-b009-884bfdb65d89", // デバイスUUID
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
                timestamp: "2017-01-01 12:00:01 UTC"
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
    "e6d670db-54b0-4eb4-b009-884bfdb65d89" // デバイスUUID
    "Illuminance" // センサー英文名
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
    "e6d670db-54b0-4eb4-b009-884bfdb65d89" // デバイスUUID
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
                    timestamp: "2017-01-01 12:00:01 UTC"
                }
            }
        ],
        [
            {
                "sensor_uuid": "ac9cf646-9071-410f-b7bb-f2ebb39f87fd",
                "sensor_name": "Illuminance",
                    value: 752,
                    timestamp: "2017-01-01 12:00:02 UTC",
                    unit: "lx"
                }
            },
            {
                "sensor_uuid": "45d1c880-c5c7-4848-8dda-2dddaf24c259",
                "sensor_name": "GPS",
                "data": {
                    values: [36.68, 139.44],
                    timestamp: "2017-01-01 12:00:02 UTC"
                }
            }
        ],
        ...     
  ]
}
```
<label class="label danger">失敗</label>
<p class="warning">
    デバイスが存在しなくても以下の返り値が戻ります。
</p>
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
    "e6d670db-54b0-4eb4-b009-884bfdb65d89", // デバイスUUID
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
      "4f133cfe-05b5-4584-8cff-b1ee7410ace5"
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
    "e6d670db-54b0-4eb4-b009-884bfdb65d89", // デバイスUUID
    "20170101120001", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170101123000" //　オーダ期間終了日時(YYMMDDhhmmss)
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
      "4f133cfe-05b5-4584-8cff-b1ee7410ace5"
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
    "e6d670db-54b0-4eb4-b009-884bfdb65d89", // デバイスUUID
    "20170101120001", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170101123000" //　オーダ期間終了日時(YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
```
{
  "code" : 0, 
  "orders": [
        {
            "uuid": "11408932-34ca-4296-943d-c727a0e22c16",
            "organization": "",
            "restaurant_owner_rank": 3,
            "restaurant_owner_web_url": "",
            "restaurant_owner_type_of_business": "...",
            "recipe": "a recipe for test",
            "description": "...",
            "purpose": "...",
            "farm_uuid": "a576c00c-54fe-4a9f-85aa-a69d8edb09ea",
            "sensor_uuids": [
              {
            "uuid": "caa98303-9082-4f86-8799-f05760518e69",
            "output_level": "%RH"
            },
              {
            "uuid": "c224bb4b-96cf-4368-9a1b-3f611d768a11",
            "output_level": "WGS84"
            },
              {
            "uuid": "05c07598-7d72-4454-8c1f-afd09d960665",
            "output_level": "degree Celsius"
            },
              {
            "uuid": "f3333305-ecfd-442d-acfa-4023ed99bbeb",
            "output_level": "hPa"
            },
              {
            "uuid": "44fe4550-6379-43ad-b361-f137ab3f0da8",
            "output_level": "lx"
            },
              {
            "uuid": "a2781cd2-d71b-40c1-a781-e245e55cdc72",
            "output_level": "UV"
            }
            ],
            "collection_period_start": "2017-01-01 12:00:00 UTC",
            "collection_period_end": "2017-01-01 12:30:00 UTC",
            "application_period_start": "2017-01-01 12:30:00 UTC",
            "application_period_end": "2017-01-01 12:00:00 UTC",
            "event_trigger": "timer",
            "maximum_receivable_post": 0,
            "time_interval": 5,
            "time_unit": "minute",
            "time_maximum_latency": 5,
            "time_maximum_latency_unit": "minute",
            "time_permissible_range": 2,
            "time_permissible_range_unit": "minute",
            "farm_status": "executable",
            "updated_at": "2016-06-22 05:41:14 UTC",
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
            "now_post_count": 460254,
            "maxmum_gain_point": "0",
            "order_score_post_rate": 84,
            "maximum_posts": 630720
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

#### 内容取得
<label class="label">POST</label>`/get_order`
``` 
[
    "e6d670db-54b0-4eb4-b009-884bfdb65d89", // オーダーUUID
    "20170101120001", //　オーダ期間開始日時(YYMMDDhhmmss)
    "20170101123000" //　オーダ期間終了日時(YYMMDDhhmmss)
]
```

<label class="label success">成功</label>
```
{
    "code": 0,
    "uuid":"f598717a-833a-49b0-a4a6-f6c7f0dc73bd",
    "organization":"EverySense",
    "restaurant_owner_rank":3,
    "restaurant_owner_web_url":"http://wwe.every-sense.com",
    "restaurant_owner_type_of_business":"IT",
    "recipe":"a recipe for gethering data",
    "description":"something",
    "purpose":"something else",
    "farm_uuid":"0e8dcd3a-d005-4707-b129-be12967756d9",
    "sensor_uuids":[
            {"uuid":"67c5a7a9-fb3e-4432-bc58-685c5b65b964","output_level":"Step"},
            {"uuid":"be07973c-17f6-47d4-b139-7ddfb98c2902","output_level":"WGS84"}
        ],
    "collection_period_start":"2017-01-01 12:00:00 UTC",
    "collection_period_end":"2017-01-01 12:30:00 UTC",
    "application_period_start":"2017-01-01 11:30:00 UTC",
    "application_period_end":"2017-01-01 12:00:00 UTC",
    "event_trigger":"timer","maximum_receivable_post":0,
    "time_interval":60,
    "time_unit":"minute",
    "time_maximum_latency":1,
    "time_maximum_latency_unit":"hour",
    "time_permissible_range":30,
    "time_permissible_range_unit":"minute",
    "farm_status":"executable",
    "updated_at":"2017-03-23 09:58:05 UTC",
    "deleted_at":"",
    "recipe_status":"done",
    "third_party":false,
    "third_party_name":null,
    "commercial_use":false,
    "mismatched":false,
    "order_disabled":false,
    "shared_secret":null,
    "judge_type":"judge",
    "judge_status":"use",
    "point_supply_enabled":true,
    "point_rate":"2.0",
    "minimum_post_count_to_point":20,
    "bonus_point":100,
    "minimum_post_count_to_complete":100,
    "now_post_count":0,
    "maxmum_gain_point":"3076.0",
    "order_score_post_rate":0,
    "maximum_posts":1488
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
    "allow", // オーダーステータス("none", "allow", "wait_for_active", "active", "done", "deny", "cancel", "suspend")
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
            "f598717a-833a-49b0-a4a6-f6c7f0dc73bd", //　オーダーUUID  
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
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    "f598717a-833a-49b0-a4a6-f6c7f0dc73bd" //　オーダーUUID
]

or

[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    [
        "f598717a-833a-49b0-a4a6-f6c7f0dc73bd", //　オーダーUUID
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
    "f598717a-833a-49b0-a4a6-f6c7f0dc73bd", //　オーダーUUID
    "20170101120001", //　オーダ期間開始日時(YYMMDDhhmmss)
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
    "f598717a-833a-49b0-a4a6-f6c7f0dc73bd", //　オーダーUUID
    "something for shared secret", // シェアードシークレット
]
```
<label class="label success">成功</label>
```
{
    "code":　0,
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
            "uuid":"2eef003f-1188-4f8a-9b4f-93ac1092146c", // デバイスUUID
            "name":"EveryPost_1" // デバイス名
        },
        {
            "uuid":"faf83afe-f53f-4a03-a6ce-01fbe0d6a621",
            "name":"EveryPost_2"
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
    "reason":　"device not found"
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
    "device_name": "eNENPI_1_test_5", // デバイス名
    "device_enabled": true, // 有効/無効
    "device_class_name": "eNENPI_1", // デバイスクラス名
    "driver_class_name": "eNENPI_1", // ドライバー名
    "version": "4", // デバイスバージョン
    "sensor_list": [ // デバイスにあるセンサーのリスト
        {   
            "uuid": "d1e43e92-46ac-40f6-bf78-63b723acd866",
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
    "066fc43e-52d5-477f-8cd4-f14a6861a655" // デバイスUUID
    "Everypost_new_changed", // デバイス名
    "false", // 有効/無効
    [ // 変更しようとするセンサーリスト
        {   
            "uuid": "d1e43e92-46ac-40f6-bf78-63b723acd866",
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
#### デバイスクラス取得
<label class="label">POST</label>`/get_device_class`

## センサーAPI
#### 情報取得
<label class="label">POST</label>`/get_sensor`
#### リスト取得
<label class="label">POST</label>`/get_sensors`
#### 情報更新
<label class="label">POST</label>`/update_sensor`

## ファームAPI
#### リスト取得
<label class="label">POST</label>`/get_farm_list`
#### 内容取得(方法1)
<label class="label">POST</label>`/get_farm`
#### 内容取得(方法2)
<label class="label">POST</label>`/get_farm_list_with_entry`
#### 新規作成
<label class="label">POST</label>`/create_farm`
#### 情報更新
<label class="label">POST</label>`/update_farm`

## ファームオーナAPI
#### 情報取得
<label class="label">POST</label>`/get_farm_owner`
#### フィールドリスト取得
<label class="label">POST</label>`/get_farm_owner_fields`

## オーナAPI
#### 情報取得
<label class="label">POST</label>`/get_owner`
#### フィールドリスト取得
<label class="label">POST</label>`/get_owner_fields`
#### 「都道府県市」リスト取得
<label class="label">POST</label>`/get_prefectures`
#### ID取得
<label class="label">POST</label>`/get_owner_id`

## 自動承認API
#### 情報取得
<label class="label">POST</label>`/get_auto_accept_order_setting`
#### 情報更新
<label class="label">POST</label>`/update_auto_accept_order_setting`

## 通知API
#### 情報取得
<label class="label">POST</label>`/get_notification_setting`
#### 情報更新
<label class="label">POST</label>`/upadate_notification_setting`

## データ出力API
#### データ取得
<label class="label">POST</label>`/get_output_data`
#### ファーム情報取得
<label class="label">POST</label>`/get_recipe_farms`
#### バッファデータ削除
<label class="label">POST</label>`/clear_output_data`

## レシピAPI
#### 情報取得
<label class="label">POST</label>`/get_recipe`
#### リスト取得
<label class="label">POST</label>`/get_recipe_list`
