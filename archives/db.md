# Tables

### user : user accounts table
- !id: uuid (generated)
- !email: text
- !password: text (hash with 10 salt rounds/accesstoken from oauth) 
- !first_name: text
- ?last_name: text
- !ts: timestampz (auto generated)
- !ts_mod: timestampz (auto generated)

### devices : devices that were listed for recycling
- !id: uuid (generated)
- !user_id: uuid (fkey - user(id))
- !cost: text
- !type: text (default: UNKNOWN)
- ?data_retrieval_link: text
- ?postage_submitted_ts: timestampz
- ?postage_recived_ts: timestampz
- !ts: timestampz (auto generated)
- !ts_mod: timestampz (auto generated)

### payments : payments completed using stripe, paypal
- !id: uuid (generated)
- !invoice_id: text
- !amount: text
- !user_id: uuid (fkey - user(id))
- !device_id: uuid (fkey - devices(id))
- !ts: timestampz (auto generated)
- !ts_mod: timestampz (auto generated)

### datasources
- !id: uuid (generated)
- !device_name: text
- !vendor: text
- !metadata: json/text (if text, best to split each key into a column; ie, os, storages, colors, etc)
- !ts: timestampz (auto generated)
- !ts_mod: timestampz (auto generated)


```sh
Legend: 
- !: NOT NULL
- ?: NULL
```