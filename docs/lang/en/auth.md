---
nav: lang/en
search: english
title: Everysense Authentication API
---

## Authentication API
### Create new user
<label class="label">POST</label>`/new_user`


``` 
[
    "someone",
    "Jack",
    "jack@email.com",
    "password123"
]
```

<label class="label success">success</label>
```
{
    "code": 0,
    "uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason": "..."
}
```
<br>

### User authentication
<label class="label">POST</label>`/auth_user`


``` 
[
    "someone",
    "password123"
]
```

<label class="label success">success</label>
```
{
    "code": 0,
    "uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e"
}
```
<label class="label danger">failure</label>
```
{
    "code": -2,
    "reason": "invalid user or password"
}
```
<br>

### Retrieve user
<label class="label">POST</label>`/get_user`

``` 
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password123"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "login" : "someone",
  "mail" : "jack@email.com",
  "name" : "Jack"
}
```
<label class="label danger">failure</label>
```
{
    "code": -2,
    "reason": "invalid user or password"
}
```
<br>

### Update user
<label class="label">POST</label>`/update_user`

```
[
    "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
    "password123",
    [
        {
            name: "other name",
        },
        {
            password: "pasword1234"
        },
        {
            mail: "john@email.com",
        }
    ]
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

