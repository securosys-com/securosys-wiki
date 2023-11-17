# Create a CSR

:::tip Tip

In the European Union such as eIDAS, it is often the case that the issuance of qualified digital certificates  (QTSP) comply with specific legal and regulatory requirements. 
The ability to generate CSRs through a REST API helps streamline the certificate issuance process and ensures compliance with relevant standards and regulations.

:::

## Key Attestation procedure 

Using the TSB / REST API the following sequence must be followed in order the create a CSR.

- Create Key Attestation key --> This is inherently done, if working with TransactionSecurityBroker / Rest-API
- Create Signing key
- Generate CSR
- Export Key Attestation
- Submit CSR and Key Attestation File to the QTSP


## 2. Create Signing key

:::danger Take care

IMPORTANT: A sample request to create a RSA-Key is shown here if you are generating keys for qualified Signature / Document signing / sealing) the following key flags are important and must be set: sign=true, extractable=false, sensitive=true)

:::


POST: /v1/key

**Description**: Create key request.

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.

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

## Generate CSR

POST: /v1/certificate/synchronous/request/download

**Description**: Create a certificate request.

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.
```js
{
    "signKeyName": "<keyname>",
    "keyPassword": [ "R","E","P","L","A","C","E" ],
    "signatureAlgorithm": "SHA256_WITH_RSA",
    "validity": 365,
    "standardCertificateAttributes": {
      "commonName": "securosys",
      "country": "CH",
      "stateOrProvinceName": "Zurich",
      "locality": "ZH",
      "organizationName": "Securosys SA",
      "organizationUnitName": "Clouds Operations",
      "email": "office@securosys.com",
      "title": "Office",
      "surname": "Office",
      "givenName": "Securosys"
    },
    "keyUsage": [
      "DIGITAL_SIGNATURE"
    ],
    "extendedKeyUsage": [
      "ANY_EXTENDED_KEY_USAGE"
    ]
  }
```

**Response**

:::tip Tip

If you want the CSR in JSON format instead of file-download use the endpoint: POST `/v1/certificate/synchronous/request`

:::

Click the "Download file" link and verify the CSR file was downloaded.


