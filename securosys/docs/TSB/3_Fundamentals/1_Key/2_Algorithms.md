# Algorithm

Supported Algorithms:
- EC
- ED
- RSA
- DSA
- ISS
- BLS
- AES
- ChaCha20
- Camellia
- TDEA


## EC (Elliptic Curve Cryptography)
**Type**: Asymmetric

**Required fields**: Label, Attributes, curveOid

**Optional**: id, Password, SKA-Policy, addressFormat, algorithmOid

**Key Usage**: EC is used for secure key exchange, digital signatures, and encryption. It provides strong security with shorter key lengths, making it efficient for resource-constrained environments like mobile devices and IoT devices.

## ED (Edwards-curve Digital Signature Algorithm)
**Type**: Asymmetric

**Required fields**: Label, Attributes, curveOid

**Optional**: id, Password, SKA-Policy, addressFormat, algorithmOid

**Key Usage**: ED is a digital signature algorithm based on twisted Edwards curves. It is used for secure and efficient digital signatures, providing strong security and high performance.

## RSA (Rivest-Shamir-Adleman)
**Type**: Asymmetric

**Required fields**: Label, Attributes, Key-Size: 2048, 4096 or 8192 bits

**Optional**: id, Password, SKA-Policy, algorithmOid

**Key Usage**: RSA is a widely used asymmetric encryption algorithm. It is used for secure data transmission, digital signatures, and key exchange. RSA is particularly known for its security in encrypting and decrypting messages.

## DSA (Digital Signature Algorithm)
**Type**: Asymmetric

**Required fields**: Label, Attributes, Key-Size: 2048, 4096 or 8192 bits

**Key Usage**: DSA is a widely used digital signature algorithm. It is used for ensuring the authenticity, integrity, and non-repudiation of digital messages. DSA is commonly employed in digital certificates and authentication protocols.

## ISS (Identity-based Signature Scheme)
**Type**: Asymmetric

**Required fields**: Label, Attributes, Key-Size: 2048, 4096 or 8192 bits

**Optional**: id, Password, SKA-Policy

:::tip Security level

For ISS this attribute sets the security level (1, 2 or 3).

:::

**Key Usage**: ISS is an identity-based cryptography scheme used for digital signatures. It enables signing messages based on identities (such as email addresses or usernames) without the need for public keys.

## BLS (Boneh-Lynn-Shacham)
**Type**: Asymmetric

**Required fields**: Label, Attributes

**Optional**: id, Password, SKA-Policy

:::tip Tip

The algorithm-oid is set by default to: `1.3.6.1.4.1.44668.5.3.1.1`

:::


**Key Usage**: BLS is a digital signature scheme that allows efficient aggregation of signatures. It is used in applications where multiple signatures need to be aggregated and verified as a single signature, such as in blockchain technology.

## AES (Advanced Encryption Standard)
**Type**: Symmetric

**Required fields**: Label, Attributes, Key-Size: 128, 192, or 256 bits

**Optional**: id, Password

**Key Usage**: AES is a symmetric encryption algorithm used for secure data encryption and decryption. It is widely employed in various applications, including securing sensitive data in transit and at rest, such as in VPNs, Wi-Fi networks, and encrypted storage devices.

## ChaCha20
**Type**: Symmetric

**Required fields**: Label, Attributes, Key-Size: 256 bits long (32 bytes)

**Optional**: id, Password

**Key Usage**: ChaCha20 is a symmetric encryption algorithm and a stream cipher. It is used for secure data transmission and encryption, especially in environments where hardware support for AES might be limited. ChaCha20 is known for its speed and security.

## Camellia
**Type**: Symmetric

**Required fields**: Label, Attributes, Key-Size: 128, 192 and 256 bits

**Optional**: id, Password

:::tip Tip

block size of 128 bits

:::


**Key Usage**: Camellia is a symmetric encryption algorithm designed to provide strong security and high performance. In cryptography, Camellia is a symmetric key block cipher with a block size of 128 bits and key sizes of 128, 192 and 256 bits. It is used for secure data encryption and decryption in various applications, including VPNs, TLS/SSL protocols, and secure communications systems.

## TDEA (Triple Data Encryption Algorithm)
**Type**: Symmetric

**Required fields**: Label, Attributes

**Optional**: id, Password

**Key Usage**: TDEA, also known as Triple DES, is a symmetric encryption algorithm that applies the DES encryption algorithm three times to each data block. It is used in legacy systems and applications where backward compatibility with older DES-based systems is required while providing stronger security than standard DES.