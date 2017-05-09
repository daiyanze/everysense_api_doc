---
search: ja
title: Everysense レシピAPI
---

## レシピAPI
### 内容取得
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
<br>

### リスト取得
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
<br>
