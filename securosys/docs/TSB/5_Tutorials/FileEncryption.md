# File Encryption

## Create EC Key

POST: /v1/key

Description: Create a Ec Key request

Replace `<keyname>`.

```js
{
  "label": "<keyname>",  
  "algorithm": "EC",
  "curveOid": "1.3.132.0.34",
  "attributes": {
    "decrypt": true,
    "verify": false,
    "sign": false,
    "wrap": false,
    "unwrap": false,
    "derive": true,
    "bip32": false,
    "extractable": false,
    "modifiable": true,
    "destroyable": true,
    "sensitive": true
  },
  "policy": null
};
```

## Encrypt a file

Replace `<bearer_token>` and `<keyname>`.

```js
{
  "fileEncryptRequest": {
    "encryptKeyName": "<keyName>"
  }
}
```

### Using CURL

:::tip Pipeline Integration

If you want to use the HSM inside your CI/CD pipeline for encrypting sentitive content you can do with CURL

:::

Replace `<bearer_token>`, `<keyname>` and `<filename.txt>` for the file to be encrypted.

```js
curl --request POST \
    --url "https://primusdev.cloudshsm.com/v1/fileEncrypt" \
    --header 'accept: application/octet-stream' \
    --header "Authorization: Bearer <bearer_token>" \
    --header 'Content-Type: multipart/form-data' \
    --form 'SignedFileEncryptRequestDto={
            "fileEncryptRequest": {
                "encryptKeyName": "<keyname>"
            }
        }' \
    --form 'file=@<filename.txt>' --output test-2022-09-08_17-59-14.primus.encrypted
```


## Decrypt a file

Replace `<bearer_token>` and `<keyname>`.

```js
{
  "fileDecryptRequest": {
    "decryptKeyName": "<keyname>"
  }
}
```

### Using CURL

Replace `<bearer_token>`, `<keyname>` and `<encrypted_filename.txt>` for the file to be encrypted.

```js
curl --request POST \
    --url "https://primusdev.cloudshsm.com/v1/synchronousFileDecrypt" \
    --header 'accept: application/octet-stream' \
    --header "Authorization: Bearer <bearer_token>" \
    --header 'Content-Type: multipart/form-data' \
    --form 'SignedFileDecryptRequestDto={ 
            "fileDecryptRequest": { 
                "decryptKeyName": "<keyname>" 
            } 
        }' \
    --form 'file=@<encrypted_filename.txt>;type=text/json' --output test.txt
```
