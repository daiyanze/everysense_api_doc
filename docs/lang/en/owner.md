---
nav: lang/en
search: english
title: Everysense Owner API
---

## Owner API
### Retrieve owner
<label class="label">POST</label>`/get_owner`
``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234"
]
```
<label class="label success">success</label>
```
{
    "code" : 0,
    "uuid" : "2ca065a9-aaac-4d06-86cb-5acd43f43699",
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
<label class="label danger">failure</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```
<br>

### Retrieve field list
<label class="label">POST</label>`/get_owner_fields`
```
null
```
<label class="label success">success</label>
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
<br>

### Retrieve prefectures & cities
<label class="label">POST</label>`/get_prefectures`
```
null
```
<label class="label success">success</label>
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
<br>

### Retrieve owner id
<label class="label">POST</label>`/get_owner_id`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234"
]
```
<label class="label success">success</label>
```
{
    "code" : 0,
    "id" : 126
}
```
<label class="label danger">failure</label>
```
{
    "code" : -2,
    "reason" : "authentication error"
}
```
<br>
