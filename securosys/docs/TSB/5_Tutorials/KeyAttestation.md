# Key Attestation

## 1. Generate Key Attestation


POST: /v1/key/keyAttestation

**Description**: Generate key attestation files by key label

Replace `<keyname>` and `password`. The password is optional and can be deleted completely.

```js
{
  "label": "<keyname>",
  "password": [ "R","E","P","L","A","C","E" ]
}
```

## 2. Verify Key Attestation (Optional)

:::tip Tip

The the previosly downloaded attestation zip-file and the CSR are sent to the QTSP. Before issuance of the certificate the QTSP follows the validation steps indicated in the README_PrimusHSM_AuditAndAttestation_AN-E01.md contained in the zip-file.
Note: Before sending the request to the QTSP we recommend that the certificate requester is performing the validation checks himself to assure the correctness.

:::

For highest assurance and to guarantee that all these checks can be conducted independently from any Securosys software or tools, we’ll use the OpenSSL software library to perform the verifications.

The Primus Root certificate `hsm_rsa_root.crt` can be downloaded under: [PrimusHSM Root Certificate for Key-Attestation](https://support.securosys.com/external/knowledge-base/article/147)

```
openssl verify -CAfile hsm_rsa_root.crt -untrusted PrimusHSM_Attestation.crt PrimusHSM_Attestation.crt
```
**Response:**

PrimusHSM_Attestation.crt: OK

```
openssl dgst -verify PrimusHSM_Attestation_PublicKey.pem -sha256 -signature CsrRSAKey.sig CsrRSAKey.xml
```
**Response:** 

Verified OK

```
openssl req -in CsrRSAKey.csr -noout -pubkey -out SigningKeyCsrPubKey.pem
```

```
openssl asn1parse -noout -in SigningKeyCsrPubKey.pem -out SigningKeyCsrPubKey.der
```

```
grep public_key CsrRSAKey.xml | sed -e 's,[^>]*>,,' -e's,<.*,,' | base64 -d > SigningKeyAttestationFilePubKey.der
```

```
cmp SigningKeyCsrPubKey.der SigningKeyAttestationFilePubKey.der && echo Verified OK
```
**Response**
Verified OK


## What's next?

- For a full comprehensive guide on Audit and Attestation with QTSP please read: [Qualified Signature - Audit and Attestation](../4_Use-Cases/QualifiedSignature.md)
- For more information watch [HSM Feature Supporting Audit Remotely](https://www.youtube.com/watch?v=wmTZirCKlA0)
