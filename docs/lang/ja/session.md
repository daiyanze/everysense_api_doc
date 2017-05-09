---
search: ja
title: Everysense セッションAPI
---

## セッションAPI
### 認証用のセッション作成
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
<br>

### セッション有効性検査
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
<br>

### セッション無効化
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
<br>
