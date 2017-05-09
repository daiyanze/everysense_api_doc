---
search: ja
title: Everysense 通知API
---

## 通知API
### 情報取得
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
<br>

### 情報更新
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
<br>
