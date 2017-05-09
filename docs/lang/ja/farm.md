---
search: ja
title: Everysense ファームAPI
---

## ファームAPI
### リスト取得
<label class="label">POST</label>`/get_farm_list`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm_list' for #<DataFlowServer:0x00562aa9912f10>\nDid you mean?  get_order_list"
    }
    
</p>

### 内容取得(方法1)
<label class="label">POST</label>`/get_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm' for #<DataFlowServer:0x00562aa973faf8>\nDid you mean?  get_farm_owner"
    }
</p>

### 内容取得(方法2)
<label class="label">POST</label>`/get_farm_list_with_entry`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `get_farm_list_with_entry' for #<DataFlowServer:0x00562aa9cbc2b0>\nDid you mean?  get_order_list_with_entry\n               get_order_list_with_entry2"
    }
</p>

### 新規作成
<label class="label">POST</label>`/create_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `create_farm' for #<DataFlowServer:0x00562aa81d5b40>\nDid you mean?  create_farm_owner"
    }
</p>

### 情報更新
<label class="label">POST</label>`/update_farm`
<p class="danger">
    Error
    {
        "code" : -10,
        "message" : "undefined method `update_farm' for #<DataFlowServer:0x00562aa8506198>\nDid you mean?  update_farm_owner"
    }
</p>
<br>
