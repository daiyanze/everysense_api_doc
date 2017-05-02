---
search: ja
title: Everysense API ドキュメント
---

# Everysense API ドキュメント
本ドキュメントでは、EverySenseサーバと通信するためのAPI解説を行います

## はじめに

### 概要

デバイスとEverysense Serverとの通信は、デバイスゲートウェイを通じて行われます。

Everysense Serverlがデバイスと正しく通信するためには、デバイスゲートウェイは以下のことが出来る必要があります。
    
1. デバイスより受信したデータをデータサブシステムに送る
2. 受信したセンサーデータの単位系の整合
3. (必要なら)デバイスの認証
4. Everysense Serverの必要に応じて、デバイスへのpush

### Everysense APIの基本
デバイスゲートウェイとEverysense Serverとの間の通信は、全て MessagePack RPC を使います。

[MessagePack](http://msgpack.org) および [MessagePack RPC](https://github.com/msgpack-rpc/msgpack-rpc) についての詳しい説明については、当該ページを御覧下さい。仕様については、[MessagePack specification](https://github.com/msgpack/msgpack/blob/master/spec.md) にあります。

デバイスゲートウェイに提供するAPIのデータの型については、以下のものを使用します。

1. Integer represents an integer
2. Nil represents nil
3. Boolean represents true or false
4. Float represents a floating point number
5. String UTF-8 string
6. Array represents a sequence of objects

<p class="tip">
    Everysenseが提供したRest APIの通信メソッドは<label class="label">POST</label>のみとなります。
</p>

通信プロトコル: `https`

ホスト: `api.every-sense.com`

ポート: `8001`

Url: `https://api.every-sense.com:8001`

### Example
自分のアカウントでユーザーUUIDを取得する場合
<label class="label">POST</label>`https://api.every-sense.com:8001/auth_user`

リクエストボディー:
```
[
    "someone",
    "password123"
]
```

返り値:

<label class="label success">成功</label>
`{"code":0, "uuid":"1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"}`

<label class="label danger">失敗</label>
`{"code":-2, "reason":"invalid user or password"}`


## 認証API
#### 新規ユーザー作成
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

#### ユーザー認証
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

#### ユーザ情報の取得
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
#### ユーザ情報の変更
<label class="label">POST</label>`/update_user`

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e", // ユーザーUUID
    "password123", // パスワード
    "other name", // 表示名変更(変更しようとする場合に入力)
    "john@email.com", // メールアドレス変更(変更しようとする場合に入力)
    "pasword1234" // パスワード変更(変更しようとする場合に入力)
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

## セションAPI
#### 認証用のセション作成
create_session
#### セション有効性検査
check_session
#### セション無効化
delete_session

## メッセージルータAPI
#### データ送信
put_message
#### センサーUUID解析
resolv
#### 送信したデータ取得
get_message

## オーダーAPI
#### リスト取得(方法1)
get_order_list
#### リスト取得(方法2)
get_order_list2
#### 内容取得(方法1)
get_order
#### 内容取得(方法2)
get_order_list_with_entry
#### 内容取得(方法3)
get_order_list_with_entry_only_header
#### 状態変更(一個)
update_order
#### 状態変更(複数)
update_orders
#### 削除
delete_order
#### 稼動状態取得
get_real_requests
#### シェアードシークレット変更
update_order_shared_secret

## デバイスAPI
#### リスト取得(利用可能のみ)
get_device
#### 新規作成
create_device
#### 情報取得
get_device_info
#### 情報更新
update_device_info
#### トークン登録
add_device_token
#### デバイスクラス取得
get_device_class

## センサーAPI
#### 情報取得
get_sensor
#### リスト取得
get_sensors
#### 情報更新
update_sensor

## ファームAPI
#### リスト取得
get_farm_list
#### 内容取得(方法1)
get_farm
#### 内容取得(方法2)
get_farm_list_with_entry
#### 新規作成
create_farm
#### 情報更新
update_farm

## ファームオーナAPI
#### 情報取得
get_farm_owner
#### フィールドリスト取得
get_farm_owner_fields

## オーナAPI
#### 情報取得
get_owner
#### フィールドリスト取得
get_owner_fields
#### 「都道府県市」リスト取得
get_prefectures
#### ID取得
get_owner_id

## 自動承認API
#### 情報取得
get_auto_accept_order_setting
#### 情報更新
update_auto_accept_order_setting

## 通知API
#### 情報取得
get_notification_setting
#### 情報更新
upadate_notification_setting

## データ出力API
#### データ取得
get_output_data
#### ファーム情報取得
get_recipe_farms
#### バッファデータ削除
clear_output_data

## レシピAPI
#### 情報取得
get_recipe
#### リスト取得
get_recipe_list
