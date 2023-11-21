# Installation Guide (On-Prem)

**Document Information and Revision Control**

| **Version** | **Date** | **Author** | **Description, Changes** |
| --- | --- | --- | --- |
| V1.0 | 19.11.2020 | PM | Initial document |
| V2.0 | 26.01.2022 | PM | Docker-Compose support added |
| V3.0 | 21.04.2022 | PM | Version upgrade |
| V4.0 | 05.07.2023 | PM | Added more detailed HSM setup, Added troubleshooting chapter, updated application-configuration files to latest version 1.15.1.1, added connection parameter endpoints, added sample application startup |
| V5.0 | 01.09.2023 | PM | Add Infinite keystore configuration setup |

## 1.1 Notification and Symbols

:::tip SKA

This symbol contains helpful or important information for setting up TSB onPremise

:::

:::danger Take care

This symbol means to be careful and obey all instructions. You might do something that could result in data loss

:::

Feature or action requires role activation using

- Genesis Card ![](../img/TSB/genesis_card.png)
- Security Officer (SO) Cards 2 of n ![](../img/TSB/so_card.png)

The following symbols are used for HSM configuration setup:

- HSM Graphical User Interface, Menu Navigation, e.g.
    `Setup → Configuration → Network → Services → JCE → TCP Port :2300`

- and HSM console commands, e.g.
 `hsm_net_list_config serv=2 serv_port`
<br />

# 2. Introduction

This document provides instructions for installing the Securosys REST API, a standalone software that facilitates language-independent integration with Securosys Primus HSM. It also includes the installation steps for the Transaction Security Broker (TSB) license, which incorporates an approval workflow engine for Securosys Smart Key Attributes. The instructions cover both Linux and Windows platforms.

This guide has been tested on RHEL 7 and CentOS 8, Docker 19.03, and MariaDB 10.4

The Transaction Security Broker Software is designed to be deployable on Kubernetes as well as standalone Docker containers. This flexibility allows for easy integration into containerized environments, providing scalability and resource efficiency for managing the software's JVM-based framework and connecting to databases for state management, HSM cluster for key operations and policy enforcement, and various logging mechanisms.

:::tip SKA

TSB software supports three security architecture types (_Type1, Type2, Type3_), and the document provides detailed instructions or references for their setup.

:::

![](../img/TSB_Architecture.png)
_Figure 1:REST API Various deployment Architectures_

## 2.1 Security Architecture

### 2.1.1 TSB with OnPremise Primus HSM (_Type1_)

This architecture provides the flexibility to separate from Securosys's "as a Service" solutions, enabling self-management of the Transaction Security Broker Software and required HSM operations. By keeping everything in your own datacenter, you gain complete control over your architecture, eliminate the need to cross network boundaries, and establish seamless operational inheritance.

### 2.1.2 TSB Software with HSMaaS in a Shared Environment (_Type2_)

In this architecture type, a secure environment is established by providing dedicated access to a single partition, even though the HSM is shared among multiple Securosys customers. The advantage of this approach is the reliability, scalability, high availability failover, and load balancing provided by Securosys "as a Service" Solution in managing the HSMs and TSB.

### 2.1.3 TSB Software with HSMaaS in a dedicated Environment (_Type3_)

In this architecture, a dedicated HSM per customer (PLATINUM) is operated by Securosys in a Datacenter of the CloudsHSM service, offering flexibility in choice. The locally managed REST-API / TSB Software supports end-to-end encryption using mTLS. The CloudsHSMaaS solution provides High Availability, cloning mechanisms, and high-quality backups of the key material, ensuring the protection of valuable data. To pursue this architecture, please reach out to our Sales Team to begin the project.

## 2.2 Support Contacts

If you encounter a problem while installing, registering, or operating this product, please make sure that you have read the documentation. If you cannot resolve the issue, contact your supplier or Securosys Customer Support. The support portal is reachable under: [https://support.securosys.com/](https://support.securosys.com/) Your level of access to this service is governed by the support plan agreement made between Securosys and your organization. Please consult your support plan for further information about your entitlements, service level agreements and contact details.

## 2.3 Abbreviations

| **Acronym** | **Definition** |
| --- | --- |
| **TSB** | Transaction Security Broker |
| **TEE** | Trusted Execution Environment |
| **SKA** | Smart Key Attributes |
| **HSMaaS** | Hardware Security Module as a Service |
| **mTLS** | Mutual Authentication or client-authentication |
| **REST** | Representational State Transfer |
<br />

# 3. HSM - Device setup and configuration

:::tip SKA

This chapter gives an overview of the main HSM setup and settings. Note that information in this chapter may not be complete nor up-to-date, depending on the HSM firmware in use. This chapter is written exclusively for complete onPremise architecture ( **Type 1** ). HSMaaS products are not affected. If the architecture types Type2, Type3 have been selected, you can skip to chapter [3. Transaction Security Broker Service Installation](#_Transaction_Security_Broker)

:::

:::danger Take care

The initial setup of the Primus HSM is not covered in this guide, please refer to the [QuickStart Guide](https://support.securosys.com/external/knowledge-base/article/67) **and** the [Primus HSM User Guide](https://support.securosys.com/external/knowledge-base/article/63) (specifically chapters 3 and 4). If you haven't already done so, follow the initial wizard for device setup.

:::

After completing the initial setup (running the initial wizard), ensure that the HSM has a correct network configuration and can be accessed from the server where TSB will be installed. The HSM can be reached through the default port (port: 2300) unless it has been configured differently. Keep in mind that the service may be assigned to one of the four network interfaces available.

Use one of the following commands to ensure a valid network configuration:

```js
:~# telnet 10.10.10.10 2300
:~# ping 10.10.10.10
```

## 3.1 Device configuration and partition setup

The subsequent chapters address global device security settings, if you have specific user or partition settings, apply them accordingly using analogous configurations per partition (e.g., hsm\_sec\_enter\_user\_config, hsm\_user\_...).

The console commands should be adapted as follows:

- To list parameters: use: `hsm_sec_list_config → hsm_user_list_config`
- To change parameters: use: `hsm_sec_set_config → hsm_user_set_config`

| **Step** | **![](../img/TSB/hsm_user_interface_icon.png) **HSM User Interface (LC Display)** Primus X/S-Series**| ![](../img/TSB/hsm_console_icon.png)**HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **1)** | | For Primus E-Series (and X-Series) you can setup the device via the console input ( ![](../img/TSB/hsm_console_icon.png) ).<br />Connect a PC (with terminal program) over the serial port with the following settings:<br /> 115200 8N1 (speed of 115200bps, 8 data bits, no parity bit, 1 stop bit). |

Power-up the device and wait for completion of the boot procedure, the blue moving blue LEDs to settle into 4 steady LEDs. This indicates completion of the power-up sequence and self-tests. <br />
 **Verify the firmware** version of the device (example):

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **2)** | ![](../img/TSB/hsm_user_interface_icon.png) <br /> The LC Display shows the version on the lower line right side of the screen: <br /> SECUROSYS Primus-HSM-X **V2.8.52** | ![](../img/TSB/hsm_console_icon.png) <br /> `Press "ENTER", enter the default login password "ABCD", followed by "ENTER".`<br /><br /> ![](../img/TSB/hsm_console_icon.png) <br /> `hsm_diagnostics fw (or "hsm_diagnostics frw" on v2.7.x firmware) Device firmware diagnostics: Operation mode: Normal Firmware version: **RX-2.8.52**` |
| **3)** | **Activation of SO role** | ![](../img/TSB/so_card.png) |
| |![](../img/TSB/hsm_user_interface_icon.png) <br /> SETUP → Role Activation | ![](../img/TSB/hsm_console_icon.png) hsm_so_activation |

**Install and setup Root Key Store** Please ensure that you have copied the obtained license file to a USB stick. Insert the USB stick into the device before proceeding with the following step. ![](../img/TSB/genesis_card.png) <br />

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **4)** |  ![](../img/TSB/hsm_user_interface_icon.png) <br /> SYSTEM -> ROOT KEY ELEMENT -> INSTALL ROOT KEY STORE <br /> SYSTEM -> ROOT KEY ELEMENT -> INSTALL ROOT KEY STORE | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_install_rke` <br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_setup_rks` |


**Configure REST-API Access on device level**
To utilize the basic TSB functionality, ensure that the REST-API is enabled. Enabling this feature grants access to execute the following endpoint.<br /><br />
•	Service Information (Information about the service) <br />
•	Synchronous Key Operations (Synchronous operations that are directly forwarded to the HSM. <br />
•	Keys (Access to the HSM KeyStore) <br />

:::danger Take care

These settings are NOT optional and must be set in order to use TSB

:::
| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **5)** | **Configure REST-API Access on device level**<br /> ![](../img/TSB/hsm_user_interface_icon.png) <br /> SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → Client API Access<br />  SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → KEY AUTH<br />  SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → JCE<br />  SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → USER security → rest aPI ACCESS<br /> | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config crypto_access=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config jce=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config key_auth=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config rest_api=true` |

Enable TSB Workflow Engine
To utilize the enhanced multiauthorization signature workflow in TSB, ensure that the TSB Workflow engine is enabled, provided that the module is properly licensed. Enabling this feature grants access to execute the following endpoints: <br /> <br />
•	[POST] /v1/sign, [POST] /v1/decrypt<br />
•	[POST] /v1/unwrap, [POST] /v1/modify, [POST] /v1/block<br />
•	[GET, DELETE] /v1/request/**<br />

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **6)** | **Enable TSB Workflow Engine** <br />![](../img/TSB/hsm_user_interface_icon.png)<br /> SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → Tsb Workflow engine | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config tsb_engine=true` |

**Configure additional device security settings** Please note that for a comprehensive understanding of the following settings being configured, it is advised to consult the Primus HSM User Guide.

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **7)** | ![](../img/TSB/hsm_user_interface_icon.png)<br /> •	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → SESSION OBJECTS <br /> •	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → Key Import<br /> •	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → Key Export<br /> •	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → Key Extract<br /> | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config session_objects=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config key_import=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config key_export=true`<br /> ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config key_extract=true` |

**Configure Key Invalidation (optional)**
Activated Key Invalidation creates a **shadow copy** of the key when it is **deleted**. This may prevent creation of a new key with the same key name and key id.

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **8)** |![](../img/TSB/hsm_user_interface_icon.png)<br /> •	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → Key Invalidation | ![](../img/TSB/hsm_console_icon.png)  hsm_sec_set_config inval_keys=true |

**Configure Object destruction**
If set to false, key cannot be deleted (delete will always fail) 

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **9)** |![](../img/TSB/hsm_user_interface_icon.png)<br />•	SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → Object destruction | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_set_config destroy_objects=true`|

**Create new User / Generate new setup password** of existing user (the setup password has limited lifetime, default 3 days) _Note down the user's_ _setup password_. _It_ _is required to setup the TSB connection to the HSM._ 

| **Step** | **HSM User Interface (LC Display)** Primus X/S-Series** | **HSM Console Primus HSM, all Series** |
| --- | --- | --- |
| **10.1)** |![](../img/TSB/hsm_user_interface_icon.png)<br /> Roles → User → CREATE NEW USER | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_create_user `<br />`SO >>> Enter new username:` <br /> ![](../img/TSB/hsm_console_icon.png)` TEST_USERGUIDE `<br />`SO >>> Temporary setup password is: _B7GSW-2WjB3-eZZjN-zHnGx-2Sdoc` <br />`SO >>> User created.` |
| **10.2)** |![](../img/TSB/hsm_user_interface_icon.png)<br /> Roles → User → New Setup Password | ![](../img/TSB/hsm_console_icon.png) `hsm_sec_new_setup_pass` <br /> `SO >>> Enter username:` ![](../img/TSB/hsm_console_icon.png) `TEST_USERGUIDE` <br /> `SO>>> Temporary setup password is: _ze2kJ-5aGJG-wwh54-c4pkf-273aw` <br />`SO>>> Successfully finished.` |
<br />

# 4 Transaction Security Broker Service Requirements

:::tip SKA

Running a Transaction Security Broker Service requires that you are already familiar with using [Docker Engine](https://docs.docker.com/config/daemon/) and [Docker Compose](https://docs.docker.com/compose/) .

:::

## 4.1 Supported Platforms
  - Linux
  - Ubuntu 22, 20, 18, 16 x64
  - Microsoft Windows 10 or newer
  - IOS available upon request

## 4.2 Linux - Docker installation
Requirements: Linux: _sudo_ permissions and internet connection

Before proceeding, ensure that Docker is installed and running on your system. If you prefer not to follow the [official guide for Docker](https://docs.docker.com/engine/install/ubuntu/) and Docker Compose installation, you can refer to the specific chapter in the documentation that provides instructions for [Docker installation - Linux](#_Docker_installation_-)

## 4.3 Windows – Docker installation
Requirements: Windows: WSL2 installed, Windows Subsystem for Linux & Virtual Machine Platform enabled in Windows Features

On windows the setup is different by using the WSL2 Technology (Windows subsystem for Linux)
Please follow the official installation guide: [Install Docker Desktop on Windows](https://docs.docker.com/desktop/install/windows-install/)
<br />

# 5 Transaction Security Broker Configuration

During the installation of the Transaction Security Broker, you will need to apply the following application configuration:

- Download the necessary configuration files.
- Set up docker-compose (optional, depending on your setup).
- Configure the HSM-Connection properties in the application-local.yml file.
- Adjust the logging behaviour according to your requirements.

These steps ensure the proper setup and configuration of the Transaction Security Broker application.

## 5.1 Download Configuration Files

    curl -L -XGET https://robot.reader.tsb:q19T2onJ4fHNUcz7CDTvwUhSK\*8r@securosys.jfrog.io/artifactory/external-tsb/securosys-tsb-config-files/Securosys_TSB_1.15.1.1.zip -o Securosys_TSB_1.15.1.1.zip

:: TODO ::
Additional Software releases are listed under the following link: [Transaction Security Broker: Software - Download](https://support.securosys.com/external/knowledge-base/article/114)

The previously downloaded zip file contains th following files:

| **Installation Directory** | **Files** |
| --- | --- |
| :~/ **docker-compose.yml** (required) | A Docker Compose file (docker-compose.yml) is a configuration file that describes the various services, networks, and volumes required to run a multi-container Docker application. |
| :~/config-files/ **application-local.yml** (required) | The application-local.yml file is a configuration file specific to the application, containing HSM connection settings and properties that can be customized to tailor the behavior and functionality of TSB. |
| :~/config-files/ **application-local-access-token.yml** | The application-local-access-token.yml file is utilized to configure JWT authentication access and necessitates the creation of JWT tokens for secure system access. Notably, this configuration supports a one-to-many deployment model, allowing a single TSB instance to connect with multiple HSM partitions. |
| :~/config-files/ **application-tee.yml** | The application-tee.yml file is used for setting up the Trusted Execution Environment (TEE) configuration in the TSB, providing a secure and isolated environment for executing sensitive operations or computations. |
| :~/config-files/ **template.yml** | The template.yml file contains a comprehensive list of all available configuration properties for easy reference and customization within the application. |
| :~/config-files/log/ **logback.xml** | The logback.xml file is used to configure the logging behavior of the application, defining settings such as log levels, output formats, and log file destinations. |
| :~/ **docker-compose-external-keystore.yml** | A Docker Compose file (docker-compose-external-keystore.yml) for storing and managing large volumes of cryptographic keys. |
| :~/config-files/ **application-external-keystore.yml** | The application-external-keystore.yml file is a configuration file specific to the application for external keystore usage, (e.g. using the database for external storage option). |

### 5.1.1 Linux – docker-compose.yml

Docker Compose simplifies the configuration and deployment of multi-container Docker applications. By defining services in the docker-compose.yml file and customizing the parameters to suit your needs, you can easily create and start all the specified services with a single command.

:::danger Take care

- Ensure the hierarchical structure of the configuration remains intact by using spaces instead of tabs
- To maintain proper **volumes** mapping in Docker Compose, refrain from altering the mapping after the colon (:) symbol and only modify the bold-marked (host-mapped) directory.

:::


:::tip Tip

For first startup of Transaction Security Broker (with default configuration) you do not need to touch the `docker-compose.yml` file.

:::


```yaml
version: "3.3"
services:    
    securosys_sql:
        image: docker.io/mariadb:10.4
        container_name: securosys_sql
        ports:
        - 3306:3306
        volumes:
        - ./securosys_sql/mysql-lib:/var/lib/mysql
        environment:
        - MYSQL_USER=replace-me_db-username
        - MYSQL_PASSWORD=replace-me_db-password
        - MYSQL_DATABASE=securosys
        - MYSQL_PORT=3306
        - MYSQL_ROOT_PASSWORD=replace-me_db-root-password
        - MYSQL_LOWER_CASE_TABLE_NAMES=0
    securosys_tsb:
        image: securosys.jfrog.io/external-tsb/securosys-tsb:1.15.1.1.20230612T100713Z
        container_name: securosys_tsb
        restart: always
        depends_on:
        - securosys_sql
        ports:
        - 8080:8080
        volumes:
        - ./config-files:/etc/app/config
        - ./output:/etc/app/output
        environment:
        - spring.profiles.active=local  # by specifying profile=local, tsb takes the application-local.yml config file
        - logging.config=/etc/app/config/log/logback.xml
```

The first service **securosys_sql** block contains the fields:

| **Attributes** | **Content description** |
| --- | --- |
| services | Root tier describes the underlying services |
| securosys_sql | The name of the maria database service. This is also the name if the service is to be resolved using the internal docker network |
| image | The Docker image of Maria Database which is automatically pulled from DockerHub |
| container_name | The name of the docker container |
| ports | 3307 the port that is mapped to the host network, 3306 the port that is used in the docker internal default network |
| volumes | ./mysql-lib is the host mounted directory and stores my mysql schema data. This directory is created automatically at first startup. /var/lib/mysql is the internal docker directory which is used by the mysql database |
| environment | Application specific environment variables that are injected during startup |

The second service **securosys_tsb** block contains the fields:

| **Attributes** | **Content description** |
| --- | --- |
| securosys-ska | The name of the Securosys-TSB service. |
| image | The Docker image of Securosys-TSB available at the Securosys Jfrog-Artifactory |
| container_name | The name of the docker container |
| restart | The command that enables auto restart if the application fail |
| depends_on | Expresses the dependency between services. Starts service in dependency order. In this example mariadb_securosys starts before securosys-ska (with this command services do not wait until the startup is completed!) |
| ports | The port mapping for internal (Docker) and external (Host) network binding |
| volumes | **./config**, the directory in which securosys-ska configuration files are stored (e.g. application config, TLS config, TEE config, Logging Config, …) <br />**./output**, the directory where the log output is written to (if logging is configured to file) |
| environment | Environment variables that are injected during startup spring.profile.active=local e.g. tells the springboot application to map another application configuration file (profiles are used for this). <br /> In this example application-local.yml is used as additional application configuration file. <br /><br /> Note: Change 'spring.profiles.active' to application-external-keystore.yml to switch to external key usage. |

### 5.1.2 Linux – config-files/application-local.yml

The application-local.yml is used for `securosys-ska` container. Configure your specific HSM connection details within the configuration file: `config-files/application-local.yml`.

Adapt the **`replace-me_*`** parameters according to your HSM setup (cluster configuration). 

:::tip Tip

Default HSM connection details (hostname, ports) are shown in chapter [Default Connection Parameters of the REST-API / TSB](#64-default-connection-parameters-of-the-rest-api--tsb-type1-type2-type3)

:::

:::tip Tip

Chapter [Example of Setting up Proxy Service for HSMaaS](#_Example_of_Setting) gives an example how to configure CloudsHSM access using a Proxy (Security Architecture: Type2, Type3).

:::

```yaml
spring:
## DATABASE CONFIG
  datasource:
    url: jdbc:mysql://securosys_sql:3306/securosys
    username: replace-me_db-username
    password: replace-me_db-password
    swaggerUI.enabled: true
##HSM CONFIG
  hsm:
    host: 'nufenen.securosys.ch,grimsel.securosys.ch'
    port: '2300'
    user: replace-me_hsm-username
    setupPassword: replace-me_hsm-setupPassword
    encryptionPassword: replace-me_db-encryptionPassword
    #proxyUser: replace-me_proxy-username # used for CloudsHSM access
    #proxyPassword: replace-me_proxy-password # used for CloudsHSM access
    timeout: 1800
    maxTimeDifferenceToHsm: 100
    attestationKeyName: 'attestation-key'
    timestampKeyName: 'test-time-key'

## HTTPS CONFIG
  tls:
    enabled: false
    keyStore: 'file:/etc/app/config/tls/securosys-ska-server.p12'
    keyStorePassword: secret
    trustStore: 'file:/etc/app/config/tls/securosys-ska-truststore-server.jks'
    trustStorePassword: secret
    clientAuthentication: none
```
The first block `spring.datasource` contains the fields

| **Parameter** | **Content description** |
| --- | --- |
| url | Connection string to the database. The domain points to the service name, Docker-compose in the above example is configured to use the service name. |
| username | The username for the sql database, which is defined in docker-compose.yml file at line number 13 |
| password | The password for the sql database, which is defined in docker-compose.yml file at line number 14 |

The second block `hsm` contains the fields

:::tip Load-Balancing: `hsm.host`

  - Specify multiple hosts separated by commas, and TSB will randomly select one host, falling back to the others if the first one fails (e.g., hsm.host: _'grimsel.securosys.ch, nufenen.securosys.ch'_).
  - Provide multiple hosts separated by semicolons, and TSB will always choose the first record, falling back to the others if the first one fails (e.g., hsm.host: _'grimsel.securosys.ch**;** nufenen.securosys.ch'_).

:::

| **Attributes** | **Content description** |
| --- | --- |
| host | The hostname or IP address of the HSM |
| port | The port of the JCE API on the HSM, default JCE-Port: 2300 |
| user | The name (case sensitive) of the HSM user (partition) |
| setupPassword | The setup password is a 29-alphanumeric dash separated string in form of `FXAJX-XWVQ3-DC0O5-3SLQF-LJ9L3` with **limited time validity**. <br /><br /> •	HSM-OnPremise (default): 3 days;<br /> •	CloudsHSM default: 1 week;<br /> •	Developer account: 1 year<br /><br /> The initial partition setup password, provided by Securosys, is used to obtain or update a permanent secret. |
| encryptionPassword | This password is used to encrypt the user secret retrieved from the HSM. This password can be freely chosen (should possess high entropy) |
| proxyUser | HSMaaS (_Type 2, Type3_) only: the name of the service user (proxy), as provided by Securosys |
| proxyPassword | HSMaaS (_Type 2, Type3_) only: the password of the service user (proxy), as provided by Securosys |
| attestationKeyName | The attestation key, which is generated upon startup, that asserts the origin of keys and the HSM environment |
| timestampKeyName | Timestamp key, which is generated upon startup, that asserts the origin of the keys |
| rfcTimestampKeyName | rfc3161 timestamp key, which is generated upon startup, that asserts the validity of signatures and certificates |
| maxTimeDifferenceToHsm | The unit is seconds, log appears on CLI: **WARN** if the difference between the system time and the hsm time is greater than the specified value |
| useExternalKeyStore | Storing encrypted keys in database, default: false (additional license required) |
| useKeyReplicationService | Using built—in key replication service, rather than SQL clustering logic, slave datasource must be configured, default: false (additional license required, only in combination with externalKeystore) |

The third and **optional** for **development** environments `tls` contains the fields.
:::tip SKA

Further information on setting up TLS and mTLS files can be found at the end of this document.

:::

| **Attributes** | **Content description** |
| --- | --- |
| tls.enabled | true | false, controls https support and is set by default to false |
| tls.keyStore | The keystore which holds the server key and server certificate |
| tls.keyStorePassword | The password that was set when the key-store was created |
| tls.trustStore | The Truststore which holds the CA certificate |
| tls.trustStorePassword | The password that was set when the trust-store was created |
| clientAuthentication | mutualTLS configuration, an enum consists of: <br />•	`need`: Client Authentication is needed and mandatory<br /> •	`want`: Client authentication is wanted but not mandatory <br />•	`none`: Client authentication is not wanted e.g. none|

### 5.1.3 Linux – config-files/application-local-access-token.yml

The application-local-access-token.yml file is utilized to configure JWT authentication access and necessitates the creation of JWT tokens for secure system access. Notably, this configuration supports a one-to-many deployment model, allowing a single TSB instance to connect with multiple HSM partitions. Please contact your sales representative or open a ticket at the Securosys support portal to setup TSB as multi-auth service.

### 5.1.4 Linux – config-files/application-external-keystore.yml

Different use cases in blockchain, IoT or signing (TSP) industries require very big numers of keys to be protected by HSM. The Infinite Key Store (IKS) offers a scalable and efficient solution for securely storing and managing large volumes of cryptographic keys for **on-premises** and **CloudsHSM** environments when integrated using Transaction Security Broker (TSB).

With IKS, keys are stored as external key objects in the TSB inherent database, encrypted by the Partition Key stored inside the HSM. Thus, the storage size can theoretically grow limitless and provide storage for an infinite number of keys. Please contact your sales representative or open a ticket at the Securosys support portal.
<br />

# 6 Starting Transaction Security Broker

In this chapter, you will initiate the Transaction Security Broker to verify its setup correctness by following these steps:
- Start the multi-container application.
- Validate the state of the containers and software.
- Perform testing using Swagger-UI and CURL.

These steps ensure that the Transaction Security Broker application is properly set up and configured.

## 6.1 Starting multi-container application

To launch the multi-container application, execute the following command in the directory where the docker-compose.yml file is located. This command initiates the startup process for the two containers: `securosys_sql` and `securosys_tsb`

:::tip TSB - Dispatched

  - **docker-compose up -d** starts the contianers in dispatched mode<br />
  - Password for jfrog user:  `robot.reader.tsb` here: [_PASSWORD_AVAILABLE_HERE_](https://dlarea.securosys.com/software/tsb/DownloadLink-v.1.15.1.1.txt)
:::

```
    :~/securosys_tsb$ docker login securosys.jfrog.io -u robot.reader.tsb
    Password:    
    Login Succeeded
    :~/securosys_tsb$ docker-compose up
```

## 6.2 Testing

- Browser testing: http://**`<your_machine_ip>`**:8080/swagger-ui/index.html
- CURL test: `curl -X 'GET' 'https://<your_machine_ip>:8080/v1/licenseInfo' -H 'accept: application/json'`
- CURL with mTLS test: `curl -v --cert-type P12 –cert client-cert.p12:<password> https://<your_machine_ip>:8080/v1/licenseInfo`

Replace **`<your_machine_ip>`**with either localhost, 127.0.0.1, or DNS-Name if configured.

## 6.3 Sample Application startup
```java
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.0.6)

2023.07.0515:04:55.660INFO  [kground-preinit] [alidator.internal.util.Version] HV000001: Hibernate Validator 8.0.0.Final
2023.07.0515:04:55.744INFO  [ restartedMain] [com.securosys.ska.SKA_EXTERNAL] The following 1 profile is active: "local"
2023.07.0515:04:55.836INFO  [ restartedMain] [sPropertyDefaultsPostProcessor] For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2023.07.0515:04:57.853INFO  [ restartedMain] [epositoryConfigurationDelegate] Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2023.07.0515:04:57.956INFO  [ restartedMain] [epositoryConfigurationDelegate] Finished Spring Data repository scanning in 88 ms. Found 9 JPA repository interfaces.
2023.07.0515:04:59.850INFO  [ restartedMain] [mbedded.tomcat.TomcatWebServer] Tomcat initialized with port(s): 8080 (http)
2023.07.0515:04:59.864INFO  [ restartedMain] [oyote.http11.Http11NioProtocol] Initializing ProtocolHandler ["http-nio-8080"]
2023.07.0515:04:59.865INFO  [ restartedMain] [.catalina.core.StandardService] Starting service [Tomcat]
2023.07.0515:04:59.866INFO  [ restartedMain] [e.catalina.core.StandardEngine] Starting Servlet engine: [Apache Tomcat/10.1.8]
2023.07.0515:05:00.072INFO  [ restartedMain] [rBase.[Tomcat].[localhost].[/]] Initializing Spring embedded WebApplicationContext
2023.07.0515:05:00.074INFO  [ restartedMain] [letWebServerApplicationContext] Root WebApplicationContext: initialization completed in 4237 ms
2023.07.0515:05:00.470INFO  [ restartedMain] [nternal.license.VersionPrinter] Flyway Community Edition 9.17.0 by Redgate
2023.07.0515:05:00.470INFO  [ restartedMain] [nternal.license.VersionPrinter] See release notes here: https://rd.gt/416ObMi
2023.07.0515:05:00.471INFO  [ restartedMain] [nternal.license.VersionPrinter]
2023.07.0515:09:41.576INFO  [ restartedMain] [database.base.BaseDatabaseType] Database: jdbc:mysql://localhost:4405/securosys (MySQL 8.0)
2023.07.0515:09:41.753INFO  [ restartedMain] [re.internal.command.DbValidate] Successfully validated 19 migrations (execution time 00:00.093s)
2023.07.0515:09:41.803INFO  [ restartedMain] [ore.internal.command.DbMigrate] Current version of schema 'securosys': 1.15.2.100
2023.07.0515:09:41.805INFO  [ restartedMain] [ore.internal.command.DbMigrate] Schema 'securosys' is up to date. No migration necessary.
2023.07.0515:05:04.609INFO  [ restartedMain] [te.jpa.internal.util.LogHelper] HHH000204: Processing PersistenceUnitInfo [name: SECUROSYS-UNIT]
2023.07.0515:05:04.725INFO  [ restartedMain] [        org.hibernate.Version] HHH000412: Hibernate ORM core version 6.1.7.Final
2023.07.0515:05:05.438INFO  [ restartedMain] [                  SQL dialect] HHH000400: Using dialect: org.hibernate.dialect.MySQL8Dialect
2023.07.0515:05:07.294INFO  [ restartedMain] [.internal.JtaPlatformInitiator] HHH000490: Using JtaPlatform implementation: [org.hibernate.engine.transaction.jta.platform.internal.NoJtaPlatform]
2023.07.0515:05:07.312INFO  [ restartedMain] [tainerEntityManagerFactoryBean] Initialized JPA EntityManagerFactory for persistence unit 'SECUROSYS-UNIT'
2023.07.0515:05:11.258INFO  [ restartedMain] [igure.OptionalLiveReloadServer] LiveReload server is running on port 35729
2023.07.0515:05:11.284INFO  [ restartedMain] [oyote.http11.Http11NioProtocol] Starting ProtocolHandler ["http-nio-8080"]
2023.07.0515:05:11.320INFO  [ restartedMain] [mbedded.tomcat.TomcatWebServer] Tomcat started on port(s): 8080 (http) with context path ''
2023.07.0515:05:11.340INFO  [ restartedMain] [com.securosys.ska.SKA_EXTERNAL] Started SKA_EXTERNAL in 16.413 seconds (process running for 17.706)
2023.07.0515:05:11.343INFO  [ restartedMain] [.business.BootstrappingProcess] Executing application bootstrapping
2023.07.0515:05:11.536INFO  [ restartedMain] [ka.service.business.HsmService] First time login. Logging in using the provided secret to fetch user secret.
2023.07.0515:05:13.678INFO  [ restartedMain] [ka.service.business.HsmService] grimsel.securosys.ch:2300:TSBDEV connected
2023.07.0515:05:14.163INFO  [ restartedMain] [ka.service.business.HsmService] Logged out from HSM.
2023.07.0515:05:15.193INFO  [ restartedMain] [ka.service.business.HsmService] grimsel.securosys.ch:2300:TSBDEV connected
```

## 6.4 Default Connection Parameters of the REST-API / TSB _(Type1, Type2, Type3)_

The table below shows the default configuration values done in **application-local.yml** the parameter `hsm.host`, `hsm.port`, if not specified differently by your Security Officer (SO)

| Type | Hostname or IP Address | JCE Port Number | Using Proxy |
| --- | --- | --- | --- |
| **Network HSM (onPremise)** | as setup by your SO | 2300 (default) | no |
| **Developer program** | grimsel.securosys.ch, nufenen.securosys.ch | 2400, 2401 | no |
| **Clouds HSM CH (Switzerland)** | a-api.cloudshsm.com, b-api.cloudshsm.com | 2300 | yes |
| **Clouds HSM DE (Germany)** | de01-api.cloudshsm.com, ch02-api.cloudshsm.com | 2300 | yes |
| **Clouds HSM US (United States, East-West)** | us01-api.cloudshsm.com, us02-api.cloudshsm.com | 2300 | yes |
| **Clouds HSM SG (Singapore)** | sg01-api.cloudshsm.com | 2300 | yes |
| **Clouds HSM WR (World Cluster)** | de01-api.cloudshsm.com, us01-api.cloudshsm.com, sg01-api.cloudshsm.com | 2300 | yes | 
  
## 6.5 Default Connection Parameters TSBaaS operated by Securosys

| **TSB Service** | **Description** | **Documentation** | **API-BaseURL** |
| --- | --- | --- | --- |
| **Demo** | Sales demo | [Swagger-UI](https://tsb-demo.cloudshsm.com/swagger-ui/index.html) | [https://tsb-demo.cloudshsm.com/v1/](https://tsb-demo.cloudshsm.com/) |
| **Developer Program (DEV)** | TSB bound to Developer Program HSM partition, JWT auth | [Swagger-UI](https://primusdev.cloudshsm.com/swagger-ui/index.html) | [https://primusdev.cloudshsm.com/v1/](https://primusdev.cloudshsm.com/) |
| **Pre-Prod/Test & Integration (SBX)** | TSB bound to CloudsHSM SBX partition, stable system, non-production, JWT auth | [Swagger-UI](https://sbx-rest-api.cloudshsm.com/swagger-ui/index.html) | [https://sbx-rest-api.cloudshsm.com/v1/](https://sbx-rest-api.cloudshsm.com/v1/) |
| **Production (ECO)** | TSB bound to CloudsHSM ECO partition, production, JWT auth | [Swagger-UI](https://rest-api.cloudshsm.com/swagger-ui/index.html) | [https://rest-api.cloudshsm.com/v1/](https://rest-api.cloudshsm.com/) |

<br />

# 7 Example of Setting up Proxy Service for HSMaaS

:::tip Tip

For Security Architecture Type 2 and Type 3 proxy service configuration must be held.
This is done in the `application-local.yml` under hsm block

:::

```yaml
hsm:
  host: 'grimsel.securosys.ch'
  port: '2300'
  user: PRIMUSDEVXXX # replace with your credentials
  setupPassword: eoVyt-a7gGg-gjXSw-ESx2t-jv5GF# replace with your credentials
  encryptionPassword: MqV1c3-a7v1g-C9Kaw-fqwe2t-jv55GF # this password is used to encrypt the user secret retrieved from the HSM, is choosen randomly
  proxyUser: replace-me_proxy-username # used for CloudsHSM access (proxy)
  proxyPassword: replace-me_proxy-password # used for CloudsHSM access (proxy)
  attestationKeyName: 'attestation-key'
  timestampKeyName: 'timestamp-key'
  rfcTimestampKeyName: 'rfcTimestampKeyName'
  maxTimeDifferenceToHsm: 100
```

| **Attributes** | **Content description** |
| --- | --- |
| proxyUser | HSMaaS (Type 2, Type3) only: the name of the service user (proxy), as provided by Securosys |
| proxyPassword | HSMaaS (Type 2, Type3) only: the password of the service user (proxy), as provided by Securosys |
<br />

# 8 Linux - config-files/log/logback.xml

:::tip Tip

This current log configuration shows how to write logging information to the console and a file on the host machine located at `:~/securosys_tsb/output`

:::

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="300 seconds">
	<!-- infrastructure logging (journalctl, docker, IDE output) -->
	<appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
		<withJansi>true</withJansi>
		<encoder>
			<charset>UTF-8</charset>
			<pattern>%d{yyyy.MM.dd HH:mm:ss.SSS} %highlight(%-5.5p) [%15.15t] %cyan([%30.30c]) %X{indent}%m%n</pattern>
		</encoder>
	</appender>
	<!-- history logging, disabled for openshift/docker deployment -->
	<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
		<file>/etc/app/output/service.log</file>
		<append>true</append>
		<rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">\
			<fileNamePattern>logs/service-%d{yyyy-MM-dd}.log</fileNamePattern>
			<maxHistory>13</maxHistory>
			<totalSizeCap>100MB</totalSizeCap>
		</rollingPolicy>
		<encoder>
			<pattern>%d %-5.5p [%15.15t] [%30.30c] %X{indent}%m%n</pattern>
		</encoder>
	</appender>

	<!-- profile -->
	<!-- Uncomment if you want to "debug" the TSB: -->
	<logger name="com.securosys.ska" level="INFO" />
	<logger name="net.javacrumbs.shedlock" level="INFO" />
	<!-- Uncomment if you want to "debug" JPA queries: -->
	<!-- <logger name="org.hibernate.SQL" level="DEBUG" /> -->
	<!-- <logger name="org.hibernate.type.descriptor.sql.BasicBinder" level="TRACE" /> -->
	
    <!-- channels -->
	<root level="INFO"> <!-- set the logging level for all appenders -->
		<appender-ref ref="CONSOLE" />
		<appender-ref ref="FILE" />
		<!-- <appender-ref ref="SYSLOG" /> -->
		<!-- <appender-ref ref="SPLUNK" /> -->
		<!-- <appender-ref ref="SplunkHEC" /> -->
		<!-- <appender-ref ref="Socket" /> -->
	</root>
</configuration>
```


| **Attributes** | **Content description** |
| --- | --- |
| Log level – TRACE | the lowest level of information, mostly used for very deep code debugging, usually not included in production logs |
| Log level - DEBUG | low level of information used for debugging purposes, usually not included in production logs |
| Log level – INFO | log severity carrying information, like an operation that stared or finished |
| Log level - WARN | log level informing about an event that may require attention, but is not critical and may be expected |
| Log level - ERROR | log level telling that an error, expected or unexpected, usually meaning that part of the system in not working properly |
<br />

# 9 Setting up Trusted Execution Environment Configuration (Optional)

Securosys Imunes is a confidential computing platform that offers a trusted execution environment (TEE) for secure code execution on tamper-protected hardware. It can be deployed as a single unit or a cluster of multiple TEEs, enabling various use cases focused on scalability, automation, trust, and confidentiality. The TEE ensures the execution of securely loaded and untampered executables, making it ideal for transactional programs and automating trusted decisions at scale. This chapter specifically covers the setup of the Transaction Security Broker within the Trusted Execution Environment. For complete setup instructions, please download the documentation from the Support Portal. If you have any questions or are interested in TEE, please reach out to our support team.

This is done in the application-tee.yml in a _new_ block named tee and general

```yaml
...
general:
  allowedTimestampSigningCertificates: # optional, configured certificates can fetch and delete all tasks for an approver
    - file:/etc/app/config/approval_certs/TIMESTAMP KEY (IMUNES-TSB-PM).pem
## tee
tee:
  approvalInformations:
    -
      # Identifier for which approver the information is valid
      approvalCertificate: 'file:/etc/app/config/tee/TEE OUTPUT KEY.pem'
      # TEE target system, e.g. 'vitosha.securosys.ch'
      host: **'vitosha.securosys.ch'** # change to the
      # TEE target system port, default is '8899'
      port: '2801'
      # Partition on the TEE target, e.g. 'USER0'
      partition: IMUNES-TSB
      # PEM file with the TLS trust certificate(s).
      tlsTrustCertificates: 'file:/etc/app/configtee/tls_certificate.pem'
      # PEM file with the client certificate.
      clientCertificate: 'file:/etc/app/config/tee/client_certificate.pem'
      # PEM file with the client key.
      clientKey: 'file:/etc/app/config/tee/client_key.pem'
  # The interval in which the TEE client should check for approvals, in milliseconds
  approvalProcessingInterval: 60000
...
```

| **Attributes** | **Content description** |
| --- | --- |
| allowedTimestampSigningCertificate | List of configured certificates, which can fetch and delete all tasks for an approver |
| approvalCertificate | Identified for which approver the information is valid |
| host | The host of where Trusted Execution is running on |
| port | The port to be used for trusted execution, default is 2801 |
| partition | The Partition which is configured for Trusted Execution Environment |
| tlsTrustCertificates | The Trust certificate issued by TEE deficedevice |
| clientCertificate | The client certificate in PEM format |
| clientKey | The client kKey for mTLS to connect to the TEE device in PEM format |
| approvalProcessingInterval | The interval in which the TEE client should check for approvals, in milisecondsmilliseconds |
<br />

# 10 Docker installation - Linux

- Install Docker Engine on Linux

```
:~/$ sudo apt-get update
:~/$ sudo apt-get install ca-certificates curl gnupg lsb-release
:~/$ sudo install -m 0755 -d /etc/apt/keyrings
:~/$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
:~/$ sudo chmod a+r /etc/apt/keyrings/docker.gpg
:~/$ **curl** -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
:~/$ echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION\_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list \> /dev/null
:~/$ sudo apt-get update
:~/$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
:~/$ sudo **systemctl** enable docker
:~/$ sudo **systemctl** restart docker
```

- Create docker group and assign user, then **logout** and **login** again to take affect on the group changes
```
:~/$ sudo groupadd docker
:~/$ sudo usermod -aG docker <CURRENT_USERNAME_ON_HOST>
:~/$ sudo usermod -aG docker <CURRENT_USERNAME_ON_HOST>
```

- Test Installation

```
:~/$ docker –version
:~/$ docker-compose -version
:~/$ sudo docker run hello-world
```
<br />

# 11 Testing and Troubleshooting
| **Error ** | **Possible solutions ** |
| --- | --- |
| securosys_tsb container doesn't start  | 1) Ensure, that mariadb container is running: docker container ls <br /> 2) Check container logs for possible configuration/connection issues docker container logs securosys_tsb |
| Cannot connect to the TSB API/Swagger  | 1. By default, the TSB API is accessible through port 8080, so ensure that your requests are directed to this port unless you have made changes to the configuration. <br />2. Test the local connection to the API by attempting to access it from your browser or Linux console using the command "wget http://localhost:8080/api". If successful, consider two possible solutions: create a host-only network in VirtualBox to connect from the host to the VirtualBox guest, or check for any firewall settings that may be blocking the connection to the specified port. | 
| `Caused by: com.securosys.primus.jce.spi0.SpiException: status: PKCS#11: GENERAL_ERROR; for key attestation-key` | You will have to Install and setup Root Key Store, before TSB can create the required keys. <br /> Connected with the HSM-Console type: <br /><br /> `hsm_sec_install_rke` - Install root key element firmware (root key store and ais20/31-rng) <br /><br />`hsm_sec_setup_rks` - Initialize new keys in the root key store | | 10.10.10.10:2300:TESTUSER: java.net.ConnectException: **Connection timed out** | Connection timed out, means that the HSM cannot be reached due to network problems.  |

## 11.1 User Login to Artifactory but fails due to lack or misconfiguration of credential store.

```
:~/securosys_tsb$ docker login securosys.jfrog.io -u robot.reader.tsb
Password:
Error saving credentials: error storing credentials - err: exit status 1, out: `Failed to execute child process "dbus-launch" (No such file or directory)`
```

**Solution** : `sudo apt install gnupg2 pass`

<br /> 
<br /> 

# Copyright Notice

| **Copyright Notice** |
| --- |
| Copyright © 2018 - 2023 Securosys SA. All rights reserved. The programs (which include both the software and documentation) contain proprietary information of Securosys SA; they are provided under a license agreement containing restrictions on use and disclosure and are also protected by copyright, patent and other intellectual and industrial property law. Reverse engineering, disassembly or decompilation of the Programs is prohibited. Program documentation is licensed for use solely to support the deployment of the programs and not for any other purpose. The information contained in this document is subject to change without notice. If you find any problems in the documentation, please report them to us in writing. Securosys SA does not warrant that this document is error free and assumes no responsibility for any inaccuracies. Except as may be expressly permitted in your license agreement for these programs, no part of these programs may be reproduced or transmitted in any form or by any means, electronic or mechanical, for any purpose, without the express written permission of Securosys SA. Securosys SA reserves the right to change, modify, transfer, or otherwise revise this publication without notice.Copyright © 2020 Securosys SA. All rights reserved.All information is subject to change without notice. Securosys SA assumes no responsibility for any inaccuracies in this document or for any obligation to update information in this document. Securosys SA reserves the right to change, modify, transfer, or otherwise revise this publication without notice. |