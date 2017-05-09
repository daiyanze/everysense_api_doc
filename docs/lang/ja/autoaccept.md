---
search: ja
title: Everysense 自動承認API
---

## 自動承認API
### 情報取得
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
<br>

### 情報更新
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
<br>
