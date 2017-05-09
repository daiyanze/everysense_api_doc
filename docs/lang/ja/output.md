---
search: ja
title: Everysense データ出力API
---

## データ出力API
### データ取得
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
<br>

### ファーム情報取得
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
<br>

### バッファデータ削除
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
<br>
