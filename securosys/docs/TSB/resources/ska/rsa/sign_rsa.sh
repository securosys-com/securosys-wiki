# usage: ./sign_ec.sh <role> <taskId> <approvalToBeSigned>
# note: ec-private-key-<role>.pem must exist. If it doesn't, use "./create_ec.sh <role>" first
# note: <taskId> copy the task ID from the POST response: /v1/filteredSignApprovalTask
# note: <approvalToBeSigned> copy the approvalToBeSigned value from the POST response: /v1/filteredSignApprovalTask

echo
echo "signing challenge with payload <approvalTobeSigned>"
ROLE=$1
TASKID=$2
APPROVAL_TO_BE_SIGNED=$3
SIGNATURE=$(echo -n $APPROVAL_TO_BE_SIGNED | openssl enc -base64 -d -A | openssl dgst -sha256 -sign rsa-private-key-$ROLE.pem | openssl enc -base64 | tr -d '\n')
APPROVER_PUBLIC_BASE64=$(sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' rsa-cert-$ROLE.pem | sed '/-----BEGIN CERTIFICATE-----/d; /-----END CERTIFICATE-----/d' | tr -d '[:space:]')
echo
echo '{
  "id": "'$2'",
  "approvalToBeSigned": "'$APPROVAL_TO_BE_SIGNED'",
  "signature": "'$SIGNATURE'",
  "approvalDigestAlgorithm": "SHA-256",
  "approverCertificate": "'$APPROVER_PUBLIC_BASE64'"
}'
echo
echo "Success, now send the output above to: POST /v1/approval"
echo
