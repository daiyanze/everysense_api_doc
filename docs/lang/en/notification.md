---
nav: lang/en
search: english
title: Everysense Notification API
---

## Notification API
### Retrieve settings
<label class="label">POST</label>`/get_notification_setting`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "066fc43e-52d5-477f-8cd4-f14a6861a655"
]
```
<label class="label success">success</label>
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
<label class="label danger">failure</label>
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

### Update settings
<label class="label">POST</label>`/upadate_notification_setting`
<p class="warning">
    Spelling mistake
    "up<b><u>a</u></b>date_notification_setting" => "update_notification_setting"
</p>

```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    "066fc43e-52d5-477f-8cd4-f14a6861a655",
    {
        "auto_accept_order": false,
        "end_collect_data": false,
        "fixed_point": false,
        "new_order": true,
        "receive_review_result": true,
        "start_collect_data": true
    }
]
```
<label class="label success">success</label>
```
{
    "code": 0,
    "uuid": "066fc43e-52d5-477f-8cd4-f14a6861a655"
}
```
<label class="label danger">failure</label>
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
