# Sign & Verify

The `REST_API` license is required to create and use keys without policy

:::tip Tip

Key's without policy are of different key-type and thus cannot be transformed to SKA-Key later on.

:::

## Create EC Key (Elliptic Curve)
POST: /v1/key

**Description**: Create key request.

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.

:::tip Tip

For more information about supported EC-Curves check: [Supported Curve-Oid's](../3_Fundamentals/1_Key/Curve-Oid.md)

:::

```js
{
    "label": "<keyname>",
    "password": [ "R","E","P","L","A","C","E" ],
    "algorithm": "EC",
    "curveOid": "1.3.132.0.10",
    "attributes": {
        "encrypt": false,
        "decrypt": false,
        "verify": true,
        "sign": true,
        "wrap": false,
        "unwrap": false,
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

## Sign a Payload
POST: /v1/synchronousSign

**Description**: Contains an sign request without metadata.

Replace `<keyname>` and `password`.
```js
{
  "signRequest": {
    "payload": "U2lnblBheWxvYWREZW1v",
    "payloadType": "UNSPECIFIED",
    "signKeyName": "<keyname>",
    "keyPassword": [ "R","E","P","L","A","C","E" ],
    "signatureAlgorithm": "SHA256_WITH_ECDSA"
  }
}
```

**Response**
```js
{
  "signature": "MEUCIQD6085OQP6nrwvDWDDyYFtjIOIXJ1OpY5CIeiAiXU6tCwIgZNNM7KEtpk5vy+GupNhNdyLa4M+humtlLsgZQdJ9fcc="
}
```

## Verify
POST: /v1/verify

**Description** Verify signature of a payload


Replace `signature` from the previous response and set the initial `payload`
```js
{
  "verifySignatureRequest": {
    "signKeyName": "<keyname>",
    "masterKeyPassword": [ "R","E","P","L","A","C","E" ],
    "signatureAlgorithm": "SHA256_WITH_ECDSA",
    "payload": "U2lnblBheWxvYWREZW1v",
    "signature": "MEUCIQD6085OQP6nrwvDWDDyYFtjIOIXJ1OpY5CIeiAiXU6tCwIgZNNM7KEtpk5vy+GupNhNdyLa4M+humtlLsgZQdJ9fcc="
  }
}
```

**Response**
```js
{
  "signatureValid": true
}
```