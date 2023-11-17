# Release Notes

## Securosys TSB 1.17.0
Issued: November, 6, 2023

### API Changes
- New endpoints support to create Self Signed Certificates, CSR & Attestation:
  - `POST /v1/certificate/synchronous/create/selfSigned` Endpoint to create a self-signed certificate
  - `POST /v1/certificate/synchronous/request/download` Endpoint to provide CSR-Filedownload with RSA Keys
  - `POST /v1/certificate/request` Endpoint to support CSR with SKA-Keys
  - `POST /v1/key/keyAttestation` Endpoint to generate key attestation files as filedownload, to support the qualified Signature Workflow.
    - Namely:
      - `<keyname>.sig` --> The binary encoded signature
      - `<keyname>.xml` --> The xml format of the key's properties and capabilities
      - `<keyname>.pem` --> The Public Key of the Partition dependend Attestation-Key (Attestation-Key signs the key's xml)
      - `PrimusHSM_Attestation.crt` --> The certificate chain of the HSM.
      - `README_PrimusHSM_AuditAndAttestation_AN-E01.md` --> Guide on how to proof the authenticity and origin of the key.

---

## Securosys TSB 1.16.1
Issued: October, 10, 2023

:::danger Take care

The MariaDB connector is now used instead of the MySQL connector. Follow the steps in the chapter [Migration Steps](http://localhost:3000/docs/TSB/Releases/v.1.16.1#migration-steps)

:::

### Application Changes
- performance improvement on /v1/synchronousSign by 50%, This optimization ensures faster response times for cryptographic signing operations
- performance improvement on /v1/synchronousDecrypt by 50%
- Support for additional named EccCurves:   "secp224k1: 1.3.132.0.32, secp224r1: 1.3.132.0.33, x962p239v1: 1.2.840.10045.3.1.1, x962p239v2: 1.2.840.10045.3.1.2,
  x962p239v3: 1.2.840.10045.3.1.3, brainpool224r1: 1.3.36.3.3.2.8.1.1.1, brainpool256r1: 1.3.36.3.3.2.8.1.1.7, brainpool320r1: 1.3.36.3.3.2.8.1.1.9, brainpool384r1: 1.3.36.3.3.2.8.1.1.11,
  brainpool512r1: 1.3.36.3.3.2.8.1.1.13, frp256v1: 1.2.250.1.223.101.256.1, Ed25519: 1.3.101.112
- Support for Certificate Signing request with non-ska keys
- Support for non-PKCS##8 DER encoded RSA-private keys import
- Changed mysql-connector
- Key-Usage Properties on CSR-generation are now marked as `critical`
- The MariaDB connector is now used instead of the MySQL connector. MariaDB also supports the MySQL connector.

### Migration Steps
- If the config value `spring.datasource.url` starts with 'jdbc:mysql:' change it to 'jdbc:mariadb:'.

### API Changes
- POST /v1/key/attributes & /v1/derivedKey now returns derivation values ("derivationType": "BIP32",  "derivationValue": "273C08290FA1734D77C5C1D9BDA9B123F5DA38C060AE5D64D5BE987377E71E63")
- Support for ED-Derivation on all endpoints, bringing significant advancements in key management and performance for ED-keys.
- Support for Unwarp EC-Keys with BIP32, enabling secure key management and derivation.
  The feature specifically caters to wrapped keys originating from a PrimusHSM, enhancing security and interoperability.
- New endpoints supporting Certificate Signing Requests:
  - `POST /v1/certificate/synchronous/request` Create a certificate request. After request the key contains a self-signed certificate, this certificate can be obtained by the endpoint `GET /v1/certificate/{keyName}`
  - `POST /v1/certificate/import/plain` Certificate import request, the key must exist, if a certificate already exists (e.g. self-signed), it will be overridden
  - `GET /v1/certificate/{keyName}` Returns the certificate of a key
  - `DELETE /v1/certificate/{keyName}` Deletes the certificate identified by the keyName from the HSM

### Configuration Changes
- New property added (optional): `general.futureTimestampDiffApprovalClient` in seconds, allows the timestamp to be chosen in the future. Default 0 seconds.

### Bugfix
- Persisted (cached) derived keys were always rederived upon signing requests if specified with dervation path (/1'/2'/3), this is now fixed to use the derived key directly
- Pending Tasks for session keys (cached-keys) are not deleted upon base_key deletion, this is now fixed
- Approval on existing approver is rejected when adding new approver to the policy, this is now fixed
- Multiple tokens with special configured timelock are never sent to HSM if signed from token2, this is fixed now and requests are sent to the HSM correctly

---

## Securosys TSB 1.16.0
Issued: July, 28, 2023

### Application Changes
- performance improvement on `/v1/synchronousSign` by 50%, This optimization ensures faster response times for cryptographic signing operations

### API Changes
- POST `/v1/key/attributes` & `/v1/derivedKey` now returns derivation values ("derivationType": "BIP32",  "derivationValue": "273C08290FA1734D77C5C1D9BDA9B123F5DA38C060AE5D64D5BE987377E71E63")
- Support for ED-Derivation on all endpoints, bringing significant advancements in key management and performance for ED-keys.
- Support for Unwarp EC-Keys with BIP32, enabling secure key management and derivation.
  The feature specifically caters to wrapped keys originating from a PrimusHSM, enhancing security and interoperability.

### Bugfix
- Persisted (cached) derived keys were always rederived upon signing requests if specified with dervation path (/1'/2'/3), this is now fixed to use the derived key directly

---

## Securosys TSB 1.15.2
Issued: July, 19, 2023

### API Changes
- External KeyStore
  - Support for Modify, Block & Unblock
  - Support for Wrap & Unwrap
  - Support for delete key with password
  - External Keystore can now be used in multi-tenant mode
- Added additional response field to encrypt request 'encryptedPayloadWithouthMAC' to support python users

### Bugfix
- Fixed, multiple request executions in multi-tenant mode using `GET /v1/request/{id}` (a problem if block or modify requests are executed twice)

### Config Changes
- new optional application-property using built-in key replication service `hsm.useKeyReplicationService: true` for external KeyStore, rather than SQL clustering logic, slaveDatasource must be configured

### Documentation Change
- Documentation improvements on various places
- Added template.yml to delivery files to show all configuration possibilities

### Security
- Bump to spring 3.0 and JDK 17

---

## Securosys TSB 1.15.1.1
Issued: June, 12, 2023

### Improvements
- In rare cases a PrimusLogin.logout() can throw SleepInterrupedException which terminates/cancels/interrupts the worker thread on JCE. The InterruptException is now handled. This does not hav impact on API-calls, since the call is already completely executed on the HSM upon throwing thread-local execption.

---

## Securosys TSB 1.15.1
Issued: April, 11, 2023

### API Changes
- Allowed public key flags (encrypt, wrap, verify) on asymmetric keys upon key creation, endpoint: POST /v1/key
- Support for tag_length for AES_GCM_NOPADDING ciphers on POST `/v1/encrypt` endpoint
- Added Message Authentication Code is now returned as optional field in encrypt response `POST /v1/encrypt` (The MAC is part of the encrypted payload, now MAC is copy-split based on tag_length and returned in its own field)
- Added optional field signKeyObject on endpoints `/v1/synchronousSign` & `/v1/verify` to support operation with External Objects
- Support for destroyable flag for External Storage
- Support Bip32 Seed import for External Keystore

### Documentation Change
- Improve logging behaviour, for cleaner logging on level INFO

---

## Securosys TSB 1.15.0
Issued: January, 06, 2023

### API Changes
- The new (optional) attribute `copyable` is added and can be sent alongside the following request. If set to `true` key's existing on the HSM can be externalized:
  - `POST /v1/key`
  - `POST /v1/importedKey`
  - `POST /v1/key/import/plain`
  - `POST /v1/derivedKey`
- Fetching approval tasks is now possible by providing the approval requestID (optional). This is enabled on all Endpoints filtered*ApprovalTask.
- New optional attribute `UUID` returned in key generation response.
- Self crafted AuthorizationToken's working with external storage must contain the UUID not the key-label. (e.g. POST /v1/synchronousSign `{ "signRequest": { ... "signedApprovals": [ "AuthorizationTokenWithUUID" ], ... }`)

### Config Changes
- Support for Database master-slave replication. It is usually used to spread read access on multiple servers for scalability, although it can also be used for other purposes such as for failover, or active backup.
  - As the master-slave replication is a one-way replication (from master to slave), only the master database is used for the write operations, while read operations may be spread on multiple slave databases.
    - Replication needs to be configured on the Database level using the DB-Clustering Feature (supported for MySQL and MariaDB)
    - At least one datasource needs to be configured: `spring.datasource`. `spring.slaveDatasource` is optional.
    - Dockerized sample for database replication can be found in the config-files.
- The (optional) property in application.yaml `hsm.useExternalKeyStore: true` can be used for key externalization. A license update is required.

### Documentation Change
- Added note to Swagger: SKA Key's with policy applied cannot be exported.

### Security
- Bump versions to latest.

---

## Securosys TSB 1.14.2
Issued: April, 11, 2023

### Improvements
- Enhancement for temporarily derived EC-Keys (secp256k1) on retrieving key attributes, affects the following endpoints:
  - `POST /v1/key/attributes`
  - `GET /v1/key/{keyName}/attributes`
- In special cases there was a sleep interrupt when closing the open HSM sessions. This is fixed now.

### Config Changes
- all application properties combined in one file`application-local.yml`, take care to run the application with profile: `spring.profiles.active=local` this parameter searches for application-local.yml file

##### Changes in application-local.yml
- swagger can be disabled: swaggerUI.enabled: false (recommended for productive usage)
- mutual TLS configuration clientAuthentication: `need` [Client authentication is needed and mandatory], `none` [Client authentication is not wanted], `want` [Client authentication is wanted but not mandatory])
- it is now possible to configure a slaveDatasource for db-replication (contact support for mysql db-replication setup)
- template.yml added to show all configuration possibilities.

### Documentation Change
- Remark added on Endpoint PATCH /task, approval is still possible if quorum is not reached
- Remark added on PolicyDTO, key with SKA policy cannot be exported
- Remark added on ApprovalToBeSigned, Base64 encoded
- Forward requests (/v1/sign, /v1/verify, ...) if key has policy and where only the rest_api was licensed to synchronous* endpoints

### Security
- CVE-2021-46877 jackson-databind vulnerability fix
  before 2.13.1 allows attackers to cause a denial of service (2 GB transient heap usage per read) in uncommon situations involving JsonNode JDK serialization.
- Bump versions to latest.

---

## Securosys TSB 1.14.1
Issued: December, 07, 2022

### Bugfix
- Fix on Signing Payload with temporarily derived key after Key modification

---

## Securosys TSB 1.14.0
Issued: October, 31, 2022

### API Changes
- Two new endpoints for ECIES file encryption were added POST /v1/fileEncrypt and /v1/synchronousFileDecrypt
- Three new endpoints added for Key Requests with KeyPassword: /v1/key/attributes, /v1/key/address, /v1/key/export/plain
- New Endpoint to change key password /v1/key/changePassword
- Deprecated endpoint on swagger: GET /v1/key/attributes, GET /v1/key/address, GET /v1/key/export/plain
- Endpoint POST v1/derivedKey and v1/verify supports now key with keyPassword set on the MasterKey.
- /v1/filtered*approvalTask now returns MetaData and MetaDataSignature at DetailLevel 2, which increases performance of fetching tasks with metadata

### Bugfix
- Fix Signature Request on derived key with an empty policy defined
- Fix issue on get attributes on temporarily derived key

### Config Changes
- Specify the rate limits of Fileupload
  - spring.servlet.multipart.enabled ## enable ECIES fileupload
  - spring.servlet.multipart.max-file-size: 200MB ## specifies the maximum size permitted for uploaded files. The default is 1Mb.
  - spring.servlet.multipart.max-request-size: 210MB ## specifies the maximum size allowed for multipart/form-data requests. The default is 10Mb

### Documentation Change
- Swagger-UI now accessible under root path "/" and "/swagger-ui"
- Sample to create a Bitcoin Key with more compley policy has been added to the 2.6.2 Samples section

---

## Securosys TSB 1.13.0
Issued: May, 30, 2022

### API Changes
- JWTs are now ignored on the endpoints POST /v1/filtered*ApprovalTask as currently no approval JWT is necessary. The unclear error message 'Can not log in with user secret as the partition name is not set.' will therefore no longer appear.

### Application Changes
- The scheduled job ApprovalTaskCleanup can now be executed in multi-tenant mode when the partition is onboarded.
- The scheduled job HsmRequestsTimerService can now be executed in multi-tenant mode when the partition is onboarded.

### Config Changes
- The config value general.hsmRequestsTimerServiceInterval which previously only worked in single-tenant mode can now be set in multi-tenant mode. Optionally the two config values general.hsmRequestsTimerServiceMinLock and general.hsmRequestsTimerServiceMaxLock can also be set.
- The config value general.approvalTaskCleanupInterval which previously only worked in single-tenant mode can now be set in multi-tenant mode. Optionally the two config values general.approvalTaskCleanupMinLock and general.approvalTaskCleanupMaxLock can also be set.

---

## Securosys TSB 1.12.0
Issued: May, 04, 2022

### API changes
- A request can now be cancelled which sets it to the new status CANCELLED and deletes the corresponding tasks (`DELETE /v1/request/{id}`)
- When a key is deleted the associated requests are set to the new status CANCELLED and the corresponding tasks are deleted (`DELETE /v1/key/{keyName}`)
- Improve description of a signedApproval (POST /v1/synchronousUnwrap, POST /v1/synchronousUnblock, POST /v1/synchronousSign, POST /v1/synchronousModify, POST /v1/synchronousDecrypt, POST /v1/synchronousBlock)
- Importing a certificate to a private key is now possible. (POST /v1/key/import/plain) The following rules apply here:
  - A single private key, public key or certificate can now be imported
  - Key attributes are no longer required as importing a single public key or certificate does not require attributes to be set
  - An imported public key or certificate can be used for signature verification even if no private key is assigned to it (/v1/verify)
  - A private key can either be imported with a public key or a certificate
  - Importing a single public key or certificate with an existing key name overwrites the existing public key/certificate but not the potentially assigned private key
  - Importing a private key with an existing key name is blocked
  - OpenSSL headers and footers are ignored

### Bugfixes
- Fix creating EC key with curve secp256r1 (POST /v1/key)

---

## Securosys TSB 1.11.0
Issued: April, 21, 2022

### API Changes
- A key password can now be set when creating a key (/v1/key)
- A key password can be defined for executing a request on the HSM (/v1/unwrap, /v1/unblock, /v1/sign, /v1/modify, /v1/decrypt, /v1/block, /v1/wrap, /v1/encrypt, /v1/synchronousUnwrap, /v1/synchronousUnblock, /v1/synchronousSign, /v1/synchronousModify, /v1/synchronousDecrypt, /v1/synchronousBlock)
- A RFC timestamp can no longer be created if the RFC timestamp key is not defined in the config (/v1/createRfcTimestamp)

### Config Changes
- Specifying the RFC timestamp key is now optional (hsm.rfcTimestampKeyName)

---

## Securosys TSB 1.10.0.1
Issued: April, 07, 2022

### Security
In response to CVE-2022-22965 and CVE-2022-22950 the Spring Boot version was updated to 2.6.6.

---

## Securosys TSB 1.5.1.2
Issued: April, 07, 2022
### Security
In response to CVE-2022-22965 and CVE-2022-22950 the Spring Boot version was updated to 2.6.6.

---

## Securosys TSB 1.10.0
Issued: March, 16, 2022

### API Changes
- Importing an ED key is now supported (/v1/key/import/plain)
- ED keys can now be wrapped and unwrapped using wrap method AES_WRAP_ED or AES_WRAP_PAD_ED (/v1/wrap, /v1/synchronousUnwrap, /v1/unwrap)
- A policy can now be specified when synchronously unwrapping a key (/v1/synchronousUnwrap)
- Improved error message in various places
- Improved and corrected API description in various places

---

## Securosys TSB 1.9.0
Issued: February, 11, 2022

### API Changes
- A new section 'Synchronous Key Operations' is added to the API documentation which contains all synchronous endpoints that can be accessed with the RestAPI licence.
- A timestamp signer can now fetch all tasks of every approver instead of needing to specify a specific approver. In multi-tenant mode the access is still restricted by the partitions that are available to a timestamp signer. (/v1/filtered*KeyApprovalTask)
- The key store statistics can now be fetched (/v1//keystore/statistics)
- When deriving a key the key attributes can now be specified. If no key attributes are specified the key attributes for the base key are fetched and applied. (/v1/derivedKey)

### Bugfix
- Fix licence that was shown as unknown when retrieving the client flags (GET /v1/licenseInfo)
- Attribute 'format' is removed from response when receiving address from a key as it always contained the value 'null' (`/v1/key/{keyName}/address`)
- Various API documentation fixes and additions

---

## Securosys TSB 1.8.0
Issued: February, 01, 2022

## Application Changes
- A connection to the HSM is now disconnected if no requests for a partition happens in a specific amount of time.

## Config Template Changes
- The config files are rearranged and restructured for docker-compose:
  - Removed .template file ending
  - Adapted comments and default values in application-local.yml
  - Moved logback.xml to /log
  - Added docker-compose.yml
- hsm.timeout is added that specifies the amount of time until a disconnect for an HSM connection happens.

---

## Securosys TSB 1.7.0.1
Issued: January, 13, 2022
### Security
In response to CVE-2021-42550 the logback version was updated to 1.2.9.

---

## Securosys TSB 1.7.0
Issued: November, 11th, 2021
### API Changes
- A specific approval task can now be fetched using its id (POST /v1/filtered*ApprovalTask)
- The new attribute onboardPartition is added to the access token to control partition onboarding in multi-tenant mode
- The new optional attribute signedApprovals is added to the synchronous sign, decrypt and unwrap endpoints where SignedApprovals can be sent alongside the request. This enables to execute these operations with SKA keys. (POST /v1/synchronousSign, POST /v1/synchronousDecrypt, POST /v1/synchronousUnwrap)
- Endpoints for synchronous block, unblock and modify were added which enables to use these operations with SKA keys (POST /v1/synchronousBlock, POST /v1/synchronousUnblock, POST /v1/synchronousModify)

### Bugfixes
- An unwanted exception was thrown when the scheduled process approvalTaskCleanup was executed in multi-tenant mode. This is fixed and instead a warning is logged that recommends to remove the corresponding config values to disable the scheduled service.

---

## Securosys TSB 1.6.0
Issued: October, 4th, 2021
### API Changes
- An endpoint is added to create a RFC3161 timestamp. (POST /v1/createRfcTimestamp)
- An EC Key with a custom curve can now be created. The custom curve must be in the regex-format 'p[0-9]+.a[0-9]+.b[0-9]+.x[0-9]+.y[0-9]+.g[0-9]+.h[0-9]+'. (POST /v1/key)

### Bugfixes
- The warning 'Found explicit default persistence unit with name 'SECUROSYS-UNIT' in persistence.xml - overriding local default persistence unit settings ('packagesToScan'/'mappingResources')' is now fixed.
- The warning 'spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning' is now fixed.

### Config Template Changes
- A value is added to define the name of a rfc timestamp key. (hsm.rfcTimestampKeyName)

### Application Changes
- The MySQL connector is now used instead of the MariaDB connector to better support MySQL databases. MariaDB also supports the MySQL connector.

### Migration Steps
- If the config value spring.datasource.url starts with 'jdbc:mariadb:' change it to 'jdbc:mysql:'.
- The config value spring.datasource.driverClassName must be removed.
- The new config value hsm.rfcTimestampKeyName must be set.

### Dockerfile Changes for Mainframe Release
- Replaced 'ENV spring.config.location "/etc/app/config/"' with 'ENV spring.config.additional-location "/etc/app/config/"'.

---

## Securosys TSB 1.5.1
Issued: September, 10th, 2021
### Config Template Changes
- Default interval config values for scheduled services were adapted in the template to more sensible values.
- Description for interval config values for scheduled services were improved in the template.

### Bugfixes
- When a partition was onboarding then using a token containing an encrypted partition access token for future api calls would result in an error (LazyInitializationException). This is now fixed.
- Removing interval config values for scheduled services is now possible again.
- Default values for minLock and maxLock for scheduled services are now correctly set.

### Migration Steps
- There are no mandatory migration steps but it is recommended to check the config template changes and copy the desired changes into the config

---

## Securosys TSB 1.5.0
Issued: August, 20th, 2021
### API Changes
- The flags modifiable, destroyable and private can now be optionally set for a data object (POST /v1/dataObject) and are now returned when fetching a data object `GET /v1/dataObject/{dataObjectName}`
- An endpoint is added to fetch random bytes with a specific length from the HSM (GET /v1/generateRandom/{length})
- Support for wrapping and unwrapping a BLS key is added (POST /v1/wrap and POST /v1/unwrap)
- An endpoint for a synchronous unwrap is added (POST /v1/synchronousUnwrap)
- The new optional attribute allowedTimestampSigningCertificateFingerprints is added to partition access tokens. Configured certificates are allowed to fetch and delete all tasks for an approver on the onboarded partition.

### Configuration Changes
- A value is added to define a certificate that is allowed to fetch and delete all tasks for an approver (general.allowedTimestampSigningCertificates)
- A value is added to set the maximum allowed time difference between the system and the HSM. If this value is exceeded a warning is logged. (hsm.maxTimeDifferenceToHsm)

### Bugfixes
- The attestation and integration keys were previously not automatically set up if the TSB runs in JWT mode. Now the keys are automatically initialized on the first request.
- When the proxy password was not set in the partition access token the partition could not be onboarded. This is now fixed.
- Deleting a task in multi-tenant mode resulted in a res.error.insufficient.login.information error. This is now fixed.
- The task that sends approved requests to the HSM in a later time window is now again properly scheduled
