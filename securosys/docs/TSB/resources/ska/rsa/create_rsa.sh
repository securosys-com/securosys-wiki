# usage: ./create_ec <role>
#   where <role> is an alphanumerical string with no spaces
# result: creates ec-private-key-<role>.pem and ec-public-key-<role>.pem files with private and public keys resp.

FORMAT=PEM
rm -f rsa-private-key-$1.$SUFFIX
rm -f rsa-cert-$1.$SUFFIX

openssl req -newkey rsa:2048 -nodes -keyout rsa-private-key-$1.pem -x509 -days 365 -subj "/C=CH/O=Test/CN=SKA Test 2023 RSA" -out rsa-cert-$1.pem

echo
echo Certificate:
cat rsa-cert-$1.pem
echo
echo "Formatted (Certificate):"
APPROVER_PUBLIC_BASE64=$(sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' rsa-cert-$1.pem | sed '/-----BEGIN CERTIFICATE-----/d; /-----END CERTIFICATE-----/d' | tr -d '[:space:]')
echo $APPROVER_PUBLIC_BASE64
echo
echo Simple sample request to create RSA-Key
echo
echo '{
  "label": "Approval_Key'$(date -u "+%Y-%m-%dT%H:%M:%S+00:00")'",
  "algorithm": "RSA",
  "keySize": 2048,  
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
    "copyable": true
  },
  "policy": {
    "ruleUse": {
      "tokens": [
        {
          "name": "string",
          "timelock": 0,
          "timeout": 600,
          "groups": [
            {
              "name": "string",
              "quorum": 1,
              "approvals": [
                {
                  "type": "certificate",
                  "value": "'$APPROVER_PUBLIC_BASE64'"
                }
              ]
            }
          ]
        }
      ]
    },
    "ruleBlock": null,
    "ruleUnblock": null,
    "ruleModify": null,
    "keyStatus": {
      "blocked": false
    }
  }
}'
echo
echo
echo "Success, now send the output above to: POST /v1/key to create an SKA-RSA-Key"
echo

