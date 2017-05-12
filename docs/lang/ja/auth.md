---
search: ja
title: Everysense 認証API
---

## 認証API
### 新規ユーザー作成
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
<br>

### ユーザー認証
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
<br>

### ユーザ情報の取得
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
<br>

### ユーザ情報の変更
<label class="label">POST</label>`/update_user`

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password123", // パスワード
    [
        {
            name: "other name", // 表示名変更(変更しようとする場合に入力)
        },
        {
            password: "pasword1234" // パスワード変更(変更しようとする場合に入力)
        },
        {
            mail: "john@email.com", // メールアドレス変更(変更しようとする場合に入力)
        }
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
    "reason": "..."
}

or

{
    "code": -2,
    "reason": "invalid user or password"
}
```
<br>

