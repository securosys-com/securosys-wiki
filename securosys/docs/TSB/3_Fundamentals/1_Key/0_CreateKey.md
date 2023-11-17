# Create Key

The `REST_API` license is required to create and use keys
 
:::tip Tip

Key's without policy are of different key-type and thus cannot be transformed to SKA-Key later on.

:::

## Endpoint
**POST**: /v1/key

**Description**: Create key request.

## RSA (Rivest-Shamir-Adleman)

```js
{
    "label": "<keyname>",
    "password": [ "R","E","P","L","A","C","E" ],
    "algorithm": "RSA",
    "keySize": 2048,
    "attributes": {
        "sign": true,
        "extractable": false,
        "modifiable": true,
        "destroyable": true,
        "sensitive": true,
        "decrypt": false,
        "unwrap": false
    }
}
```


## EC (Elliptic Curve Cryptography)
```js
    {
        "label": "<keyname>",
        "password": [ "R","E","P","L","A","C","E" ],
        "algorithm": "EC",
        "curveOid": "1.3.132.0.10",
        "attributes": {
            "encrypt": true,
            "decrypt": true,
            "verify": true,
            "sign": true,
            "wrap": true,
            "unwrap": true,
            "derive": false,
            "bip32": false,
            "extractable": false,
            "modifiable": false,
            "destroyable": true,
            "sensitive": true,
            "copyable": false
        }
    }
```
## AES (Advanced Encryption Standard)

```js
{
    "label": "aes",
    "algorithm": "AES",
    "keySize": 256,
    "attributes": {
        "encrypt": true,
        "decrypt": true,
        "verify": true,
        "sign": true,
        "wrap": true,
        "unwrap": true,
        "derive": false,
        "bip32": false,
        "extractable": false,
        "modifiable": false,
        "destroyable": true,
        "sensitive": true,
        "copyable": false
    }
}
```