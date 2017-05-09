---
nav: lang/en
search: english
title: Everysense Auto-Accept API
---

## Auto-Accept API
### Retrieve auto-accept settings
<label class="label">POST</label>`/get_auto_accept_order_setting`
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
    "commercial_use" : true,
    "non_commercial_use" : true,
    "non_reward_points" : true,
    "non_third_party_use" : true,
    "reward_points" : true,
    "third_party_use" : true,
    "undefined_third_party" : true
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

### Update settings
<label class="label">POST</label>`/update_auto_accept_order_setting`
```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password1234",
    true,
    true,
    true,
    true,
    true,
    true,
    true
]
```
<label class="label success">success</label>
```
{
    "code" : 0
}
```
<label class="label danger">failure</label>
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
<br>
