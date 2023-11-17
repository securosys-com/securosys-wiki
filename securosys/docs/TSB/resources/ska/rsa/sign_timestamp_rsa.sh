# usage: ./sign_timestamp_ec.sh <role>
TIMESTAMP=$(date -u "+%Y-%m-%dT%H:%M:%S+00:00")
echo Fetching timestamp
echo Creating signed timestamp
PRIVATE_KEY_NAME=rsa-private-key-$1.pem
PUBLIC_KEY_NAME=rsa-cert-$1.pem
SIGNATURE=$(echo -n $TIMESTAMP | openssl dgst -sha256 -sign $PRIVATE_KEY_NAME | openssl enc -base64 | tr -d '\n')
APPROVER_PUBLIC_BASE64=$(sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' $PUBLIC_KEY_NAME | sed '/-----BEGIN CERTIFICATE-----/d; /-----END CERTIFICATE-----/d' | tr -d '[:space:]')
echo Creating TSB request payload
echo
echo '{
  "timestamp": "'$TIMESTAMP'",
  "timestampSignature": "'$SIGNATURE'",
  "approverCertificate": "'$APPROVER_PUBLIC_BASE64'",
  "timestampDigestAlgorithm": "SHA-256",
  "detailLevel": "level1",
  "paging": {
    "pageNumber": 0,
    "pageSize": 1,
    "sortOrder": "CREATION_DATE_ASC"
  }
}'
echo
echo
echo "Success, now send the output above to: POST /v1/filteredSignApprovalTask"
echo
