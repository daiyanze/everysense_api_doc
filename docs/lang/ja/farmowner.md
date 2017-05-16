---
search: ja
title: Everysense ファームオーナーAPI
---

## ファームオーナAPI
### 情報取得
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
<br>

### 新規作成
<label class="label">POST</label>`/create_farm_owner`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password1234", //　パスワード
    [ // 必要なオーナーフィールド
        {
            "name" : "キーワード",
            "value" : "#everypost #everystamp"
        },
        {
            "name" : "住所",
            "value" : "1-2-3 22号"
        },
        ...
    ]   
]
```
<br>

### フィールドリスト取得
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
<br>
