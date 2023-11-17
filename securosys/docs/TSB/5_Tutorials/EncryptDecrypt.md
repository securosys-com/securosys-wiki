# Encrypt & Decrypt

The `REST_API` license is required to create and use keys without policy

:::tip Tip

Key's without policy are of different key-type and thus cannot be transformed to SKA-Key later on.

:::


## Create AES Key
POST: /v1/key

**Description**: Create key request.

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.

```js
{
    "label": "<keyname>",
    "password": [ "R","E","P","L","A","C","E" ],
    "algorithm": "AES",
    "keySize": 256,
    "attributes": {
        "sign": false,
        "extractable": false,
        "modifiable": true,
        "destroyable": true,
        "sensitive": true,
        "decrypt": true,
        "unwrap": false
    }
}
```

## Encrypt a payload
POST: /v1/encrypt

**Description**: Contains an encrypt request.

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.
```js
{
  "encryptRequest": {
    "payload": "RW5jcnlwdERlY3J5cHREZW1v",
    "encryptKeyName": "<keyname>",
    "keyPassword": [ "R","E","P","L","A","C","E" ],
    "cipherAlgorithm": "AES_GCM",
    "tagLength": 128
  }
}
```


**Response**

```js
{
  "encryptedPayload": "ZK/UOxbOPW9rYWe8vZqCmDzfP5r6kv2zpdsE8hnbqg2MCA==",
  "encryptedPayloadWithoutMessageAuthenticationCode": "ZK/UOxbOPW9rYWe8vZqCmDzf",
  "initializationVector": "C73HyZuY5nnKyChF",
  "messageAuthenticationCode": "P5r6kv2zpdsE8hnbqg2MCA=="
}
```

## Decrypt the `encryptedPayload`

POST: /v1/synchronousDecrypt

**Description**: Contains an decrpyt request and initializationVector.

Replace `<keyname>`, `password`, `encryptedPayload` and `initializationVector` from the previous encrpyt response.

```js
{
  "decryptRequest": {
    "encryptedPayload": "ZK/UOxbOPW9rYWe8vZqCmDzfP5r6kv2zpdsE8hnbqg2MCA==",
    "decryptKeyName": "<keyname>",
    "keyPassword": [ "R","E","P","L","A","C","E" ],
    "cipherAlgorithm": "AES_GCM",
    "initializationVector": "C73HyZuY5nnKyChF",
    "tagLength": 128
  }
}
```

**Response**

```js
{
  "payload": "RW5jcnlwdERlY3J5cHREZW1v"
}
```