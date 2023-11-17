# Create SKA Key

The `TSB_ENGINE` license is required to create and use SKA-keys

:::tip SKA

Securosys Smart Key Attributes - enabling true multi-authorization, rules and more for private key usage, for more information visit [**Patentet SKA Technology - Smart Key Attributes**!](https://www.securosys.com/securosys-smart-key-attributes-enabling-true-multi-authorization-rules-and-more-for-private-key-usage)

:::

## Endpoint
**POST**: /v1/key

**Description**: Create SKA-key request.

## SKA-Key with Policy
```
{
    "label": "<keyname>",
    "id": null,
    "algorithm": "RSA",
    "algorithmOid": null,
    "curveOid": null,
    "keySize": 2048,
    "addressFormat": null,
    "attributes": {
        "encrypt": null,
        "decrypt": true,
        "verify": null,
        "sign": true,
        "wrap": null,
        "unwrap": true,
        "derive": true,
        "bip32": false,
        "extractable": false,
        "modifiable": true,
        "destroyable": true
    },
    "policy": {
        "ruleUse": {
            "tokens": [
                {
                    "name": "Token1",
                    "timelock": 0,
                    "timeout": 600,
                    "groups": [
                        {
                            "name": "Group1",
                            "quorum": 1,
                            "approvals": [
                                {
                                    "type": "public_key",
                                    "name": "ApproverKey1",
                                    "value": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAExxWX9QGssj9XLfGFWxNbTeM+y0TSgc/9zEnjpBrdUzq8qK3aqjCkmMEndKKVqzkDwimiuT+yNleWqVL/Wn/Iqg=="
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "ruleBlock": {
            "tokens": [
                {
                    "name": "Token1",
                    "timelock": 0,
                    "timeout": 600,
                    "groups": [
                        {
                            "name": "Group1",
                            "quorum": 1,
                            "approvals": [
                                {
                                    "type": "public_key",
                                    "name": "ApproverKey1",
                                    "value": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAExxWX9QGssj9XLfGFWxNbTeM+y0TSgc/9zEnjpBrdUzq8qK3aqjCkmMEndKKVqzkDwimiuT+yNleWqVL/Wn/Iqg=="
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "ruleUnblock": {
            "tokens": [
                {
                    "name": "Token1",
                    "timelock": 0,
                    "timeout": 600,
                    "groups": [
                        {
                            "name": "Group1",
                            "quorum": 1,
                            "approvals": [
                                {
                                    "type": "public_key",
                                    "name": "ApproverKey1",
                                    "value": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAExxWX9QGssj9XLfGFWxNbTeM+y0TSgc/9zEnjpBrdUzq8qK3aqjCkmMEndKKVqzkDwimiuT+yNleWqVL/Wn/Iqg=="
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "ruleModify": {
            "tokens": [
                {
                    "name": "Token1",
                    "timelock": 0,
                    "timeout": 600,
                    "groups": [
                        {
                            "name": "Group1",
                            "quorum": 1,
                            "approvals": [
                                {
                                    "type": "public_key",
                                    "name": "ApproverKey1",
                                    "value": "MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAExxWX9QGssj9XLfGFWxNbTeM+y0TSgc/9zEnjpBrdUzq8qK3aqjCkmMEndKKVqzkDwimiuT+yNleWqVL/Wn/Iqg=="
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "keyStatus": {
            "blocked": false
        }
    }
}
```


## SKA-Key with empty Policy

POST: /v1/key

Description: Create SKA key request with empty policy

:::danger Take care

SKA-Key with empty policy does not enforce true multiauthorization, but enables the key to be used with multiauthorization later.

:::

```
    {
      "label": "<keyname>",
      "algorithm": "EC",
      "curveOid": "1.3.132.0.10",
      "addressFormat": {
        "format": "BTC"
      },
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
      },
      "policy": {
        "ruleUse": null,
        "ruleBlock": null,
        "ruleUnblock": null,
        "ruleModify": null,
        "keyStatus": {
          "blocked": false
        }
      }
    }
```