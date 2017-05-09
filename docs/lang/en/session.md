---
nav: lang/en
search: english
title: Everysense Session API
---

## Session API
### Create session for authentication
<label class="label">POST</label>`/create_session`

``` 
[
    {
        "user_uuid": "1ec1075c-c7d1-47ee-a601-6cd5e6170d5e",
        "password": "password123",
        "description": "something"
    }
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "session_key": "20353525-ae81-44d2-aea1-c94019e47366"
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

### Check session
<label class="label">POST</label>`/check_session`
``` 
[
    "20353525-ae81-44d2-aea1-c94019e47366"
]
```

<label class="label success">success</label>
```
{
  "code" : 0, 
  "description": "something"
}
```
<label class="label danger">failure</label>
```
{
    "code": -1,
    "reason":　"session not found"
}
```
<br>

### Delete session
<label class="label">POST</label>`/delete_session`
``` 
[
    "20353525-ae81-44d2-aea1-c94019e47366"
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
    "reason":　"session not found"
}
```
<br>
