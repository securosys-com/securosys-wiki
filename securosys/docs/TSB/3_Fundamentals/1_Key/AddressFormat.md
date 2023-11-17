# Address Format

Contains the crypto currency for which an address should be created. 
An address can only be created for keys with smart key attributes.

- BTC
- ETH
- XLM
- XRP
- IOTA

POST: /v1/key/address

Description: Returns the crypto currency address base (without checksum or network prefix) of a key in base64 format


Request:
```js
    {
        "label": "Bitcoin"
    }
```

Response:
```js
    {
        "address": "O+4DVWuyYakowbj6mvDSqDag3Zo="
    }
```