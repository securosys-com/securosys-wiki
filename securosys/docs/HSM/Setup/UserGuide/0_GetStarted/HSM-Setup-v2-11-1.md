import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Initial Setup (≥ v2.11.1)

This page reflects the Quick Start Guide delivered with the device and guides how to initially setup the HSM.

---

## Unpack the HSM

"Genesis" card and PIN may be sent by separate post mail for some Swiss customers.
Depending on the device type (X-Series or E-Series) the package content may differ:

<Tabs groupId="device-setup">
  <TabItem value="x-series" label="Primus X-Series device" default>
    Accessory box contains: 
 
    - this Quick Start Guide 
    - 2 power cables 
    - 1 USB memory stick 
    - 2 Genesis Cards (GN) ![](../../../img/HSM/genesis_card.png) 
    - 3 Security Officer (SO) Cards ![](../../../img/HSM/so_card.png)
  </TabItem>
  <TabItem value="e-series" label="Primus E-Series device">
    Accessory box contains: 
    - this Quick Start Guide 
    - 1 power cable 
    - 1 USB memory stick
  </TabItem>
</Tabs>
---

## Obtain Activation Code, License, Firmware, Documentation
:::danger Take care

To continue, access to the Securosys Support Portal https://support.securosys.com is required. If
you are not a registered Support Portal user, contact sales@securosys.ch for registration.

:::


The following preparations are necessary before setting up the Primus HSM:
- Retrieve the Activation Code for the “Genesis” (GN) smartcard (physical/virtual) activation, via Support Portal Ticket:
  - [1 – Administrative – Activation Code request (Primus HSM or Imunes TEE)](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14)
  - __Note: You do not need the activation code if you have received the GPIN by separate PIN letter.__
- Download the license file from the Support Portal, provided on the asset section [Compay Configuration Items](https://support.securosys.com/external/itsmconfigitem/overview).
- Download the latest or required firmware under [Knowledge Base – 10. Primus HSM – 8. Firmware](https://support.securosys.com/external/knowledge-base/article/111).
- Download the corresponding User Guides under [Knowledge Base – 10. Primus HSM – 7 Documentation](https://support.securosys.com/external/knowledge-base/category/25)
- Download the required provider (JCE, MS CNG, PKCS#11) software and user guide under [Knowledge Base – 31. API Provider](https://support.securosys.com/external/knowledge-base/category/7).
  - __Note: You do not need to donwload the provider if you are using HSM__
- For further documentation and application notes consult the Knowledge Base.

---
## Evaluate the Installed HSM Firmware Version

Depending on the installed firmware the update procedure might differ. A new device delivered from factory stock might not have the latest firmware installed (e.g. v2.7.x, v2.8.x).

The following step-by-step procedure helps to evaluate the installed firmware:

**1)** Power-up the device and wait for completion of the boot procedure, the blue moving LEDs to settle into 4
light blue steady LEDs. This indicates completion of the power-up sequence and self-tests.

**2)** Verify the firmware version of the device (example):

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    The LC Display shows the version on the lower line right side of the screen:
      
    ```
      SECUROSYS
      PRIMUS-HSM-X V2.8.46
    ```


  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>
   Press "ENTER" 
  - `Login password: ABCD` 
  -  `hsm_diagnostics fw` (or "hsm_diagnostics frw" on v2.7.x firmware)

    ```
      Device firmware diagnostics: 
        Operation mode: Normal
        Firmware version: RX-2.8.46
    ```

  </TabItem>
</Tabs>

__Note: In case of firmware < v2.11, continue with [Firmware update to (v2.11)](../Update/HSM-Update-to-v2-11-1.md), <br />In case of firmware ≥ v2.11, continue with chapter [1.3 - Initial Setup of the HSM (firmware ≥v2.11)](#13---initial-setup-of-the-hsm-firmware-v211)__

---
## Initial Setup of the HSM (firmware ≥v2.11)

:::danger V2.11 required

Note that the procedure below applies only to firmware v2.11 and newer, <br />
check [Firmware update to (v2.11)](../Update/HSM-Update-to-v2-11-1.md) to update to firmware version v2.11

:::
<br />


The Initial Wizard will guide you through the complete setup process. <br /><br />
With firmware v2.11 onwards the Initial Wizard allows to install or update various elements partially automated via present files on inserted USB stick, up to completely setup your HSM by

| Step | Operation |
|---|---|
|1, 2, 3, 4, 5, 6|initializing the HSM (Genesis, KEK)|
|7|applying License update|
|8|applying Firmware update|
|9|choosing the operation mode|
|10|applying HSM Security Configuration (without users)|
|11|setup Root Key Store (if licensed)|
|12|creating Security Officers (SO)|
|13| differentiate between initialization of Master or Clone HSM|
|13a|create user(s) from configuration files and report the generated setup passwords in files|
|14|pair Decanus Remote Terminal(s) and report pairing password and files for Decanus|
|15|generate the necessary signed attestation files for audit procedures|

### Preparations for the Initial Wizard (Firmware `≥v2.11`)
Prepare all necessary material, information, and files for execution of the initial wizard:
- **Genesis Card**(s) for devices with card slots (e.g. Primus X),
the Genesis PIN, either created previously or received on other ways or the Activation Code, retrieved from the support portal to generate the initial GPIN
- **SO Cards** in case of 2-factor authentication (Primus X, min. 2 cards)
- Decide about operation mode (normal, restricted, FIPS, CC; see chapter 3.10)
- **USB memory stick** to use the new features, with some of the following files prepared on the stick (optionally)
  - Updated license file (*.license) downloadable from the Securosys Support Portal ([see asset under section Equipment & Contracts](https://support.securosys.com/external/itsmconfigitem/overview))
  - Latest (or required) [firmware file (*.hsm; v2.11.1 or newer)](https://support.securosys.com/external/knowledge-base/article/111)
  - c) Device configuration file (*.sconfig, without user configuration) see chapter 14.11 (14.12.2) as example, without the user sections like 
    `<crypto_user state="… ">` and 
    `<locked_user state="… ">`

  - User configuration file(s) (*.pconfig) to create partitions see chapter 5.5.11 Create User(s) via XML File Import for details.
  - Decanus UID file (*.dconfig) for Decanus pairing Consult chapter 14.13 for XML reference.
  - HSM Backup file (*.backup) in case you want to restore from backup see chapter 9 Backup and Restore for details.

### Run the Initial Wizard (Firmware v2.11+)

:::tip Tip

For Primus E-Series (and X-Series) you can setup the device via the console input ( ). Connect a PC (with terminal program) over the serial port with the following settings: <br /><br /> **115200 8N1 (speed of 115200bps, 8 data bits, no parity bit, 1 stop bit).**

:::

:::tip For Primus X devices

For the next **Step 1** you will need the Genesis Card(s) ![](../../../img/HSM/genesis_card.png) for devices with card slots (e.g. Primus X),
and the [Activation Code](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14), retrieved from the support portal to generate the initial GPIN. 

Devices without card slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested.

:::

Please follow carefully the step-by-step procedures described below:<br />
Power-up the device and wait for completion of the boot procedure, until all 4 LEDs light blue steady.<br />

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default> 
    - **1) Preparations**<br />
      Required preparations, see [chapter above](#preparations-for-the-initial-wizard-firmware-v211)
---
    - **2) Plug-in the USB**<br />
      Plug-in the prepared (or empty) USB stick into the USB Port (X-Series: front panel; E-Series: rear panel)
---
    - **3) Login to device** <br />
      - Press **MENU**
      - select **LOGIN**
      - and enter the default login password `ABCD`,
      - followed by **ENT** on the displayed entry screen.
---
    - **4) Initial Wizard**<br />
      As long as the initial wizard is not completed you get prompted after each login again to execute (or continue) the wizard.
      ```
        EXECUTE WIZARD
      - Confirm with YES
      ```      
---
    - **5) Setup of Genesis PIN** ![](../../../img/HSM/genesis_card.png) <br />
          For the next step you will need the Genesis Card(s) <br /> for devices with card slots (e.g. Primus X),the Genesis PIN, either created previously or received on other ways (see accompanying documentation) or the Activation Code, retrieved from the [support portal](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14) to generate the initial GPIN. Devices without card
      slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested.
      ```
        ENTER GN CARD IN S2 (Card Slot 2)
      ```
      - **5a)** In case you have an existing Genesis PIN:
        ```
          ENTER PIN / #4 GN CARD IN S2 
        - `********`
        - Confirm with OK
        ```
      - **5b)** In case you do not have a Genesis PIN: 
        ```
          ENTER ACTIVATION CODE 
        - `XXXXX-XXXXX-XXX`

          NEW PIN 
          ENTER PIN 
          GN CARD IN S2 
        - `XXXXXXXX`

          REENTER PIN 
          GN CARD IN S2 
        - `XXXXXXXX`

          NEW PIN ACCEPTED
        - Confirm with OK

          GENESIS CARD UPDATED 
        - Confirm with OK
        ```
---
    - **6)** In case the USB stick is not yet inserted: 
      ```
        INSERT USB STORAGE DEVICE 
      ```
---
    - **7) License update** ![](../../../img/HSM/genesis_card.png)<br />
      In case a license file **(*.license)** is found on the USB stick, the license is checked and updated if necessary. <br />
      In some upgrade scenarios the license might be updated again after the firmware update. <br />
      A license change will cause a device reboot. Restart at step 15) after the device reboot.
      ```
        CHECKING LICENSE UPDATE PATIENCE…
      ```
---
    - **8) Firmware update** ![](../../../img/HSM/genesis_card.png)<br />
      In case a firmware file **(*.hsm)** is found on the USB stick, the file is checked and updated if necessary.<br />
      A firmware change will cause a device reboot. Restart at step 15) after the device reboot.
      ```
        CHECKING FIRMWARE UPDATE PATIENCE…
      ```
---
    - **9) Operation Mode** ![](../../../img/HSM/genesis_card.png)<br />
      In the next step you define the operation mode, which cannot be changed later.
      ```
        USE NORMAL MODE (No - For FIPS mode) 
      ```
      - Select **YES** for
        - Standard HSM setup (see 3.10)
        - SIC/SECOM user (on S500 this results to restricted mode, see 3.10.2)
        - Common criteria (CC) compliant setup, refer to chapter 3.10.4 for correct mode and setup selection
      - Select **NO** for
        - User requiring strict FIPS compliance (FIPS mode see chapter 3.10)<br />

      Select the required operation mode (default normal mode) to continue initialization and KEK creation.
      This creates the internal Primus HSM encryption key. The KEK encrypts all internal files, data, certificates,
      and passwords of the Primus HSM. It is unique to each Primus HSM, cannot be read out and therefore it remains always in the HSM. The KEK is deleted whenever the Primus is reset to the factory-reset state and
      generated anew during the initial wizard or restore wizard.

      ```
        CREATE NEW KEK
      - Confirm with OK

        PATIENCE OPERATION IN PROGRESS
        KEK CREATED 
      - Confirm with OK
      ```
---
    - **10) Device Security Configuration** ![](../../../img/HSM/genesis_card.png)<br />
      In case a device security configuration file **(*.sconfig)** is found on the USB stick, the content is validated and applied. <br />
      Note: the file is invalid if it contains user information!
      ```
        IMPORTING DEVICE CONFIGURATION PATIENCE… 
        IMPORT CONFIG FROM USB SUCCESSFUL 
      - Confirm with OK
      ```
---
    - **11) Root Key Store** ![](../../../img/HSM/genesis_card.png)<br />
      In case the Root Key Store is licensed, it is setup automatically (used for audit information).<br />
      __Note: This setting is required to operate TSB__
      ```
        SETTING UP ROOT KEY STORE PATIENCE 
        ROOT KEY STORE SETUP SUCCESSFULLY 
      - Confirm with OK
      ```    
---
    - **12) Security Officer (SO)** ![](../../../img/HSM/genesis_card.png) ![](../../../img/HSM/so_card.png)<br />
      For the next step you will need the SO Cards in case of 2-factor authentication (Primus X, min. 2 cards). <br />
      Create two or more Security Officers (SO) for the device, by defining unique SO operator names and the associated SO PIN, which must have 8 to 12 digits and shall not lead with 0:
      ```
        CREATE NEW SO? 
      - Confirm with OK

        ENTER SO OWNER NAME 
      - `SO1` (or SO-Name of your choice)

        NEW PIN 
        ENTER PIN SO CARD IN S1
      - `********`

        REENTER PIN SO CARD IN S1 
      - `********` 
        PIN ACCEPTED OK 
      ```
    -  ….(same procedure for SO2 in cardslot 3)    
        ```
          CONTINUE WIZARD?
          (No - to add SO)
        ``` 

        - Choose **NO** to create more Security Officers. 
        - Choose **YES** if all SOs are defined and to continue the next activity of the wizard.       

        ```
          SO ROLE CREATED
        - Confirm with OK
        ```
---
    - **13) Clustering** <br />
      In the next step you define if you setup the device as Master or Clone (and HA or Manual):
      ```
        SETUP AS MASTER? 
      ```
      - **13a)** Yes - “Setup as Master” selected:<br />
          In case Partition Configuration File(s) **(*.pconfig)** is found on the USB stick, the specified user(s) is created, the original file deleted, and the information of the created user with the necessary credentials (setup password etc.) is written to the output file(s) **(*.pcreated)** on the USB stick, until all files are processed.
          ```
            CREATING USER FROM CONFIGURATION FILE
          - Confirm with OK

            USER SUCCESSFULLY CREATED!
            XXXXXXXXXX
          - Confirm with OK          
          ```
        -  Continue with step 14)<br />
      ---
        In case **no Partition Configuration File** was found, you are asked to create a new user (partition) and to define the username. In this case you should note the displayed Temporary Setup Password (not written to USB stick), required to initially connect with the Client Providers (JCE, MS CNG, PKCS#11) safely to the HSM. The setup password is only valid for 3 days (configurable), starting after first usage.
            ```
              ENTER NEW USERNAME 
            - `PARTITION001` 

              TEMPORARY SETUP PASSWORD `AAAAA-BBBBB-CCCCC-DDDDD-EEEEE`          
            ```
          -  Continue with step 14)
      --- 
      - **13b)** No – “Setup as Clone” selected:<br />

        Select if you want to setup the Clone as HA Clone or Manual Clone.<br />
        The procedure writes the clone key as file to the USB stick (`<devicename>.clone`):<br />
          
        ```
          SETUP AS HA CLONE?
        - Choose Yes to integrate the clone device into a high-availability cluster
        - Choose No to create a offline clone

          PATIENCE OPERATION IN PROGRESS 
          CLONE KEY CREATED 
        - Confirm with OK
        ```
---
    - **14) Decanus** <br />
      In case a Decanus list file **(*.dconfig)** is found on the USB stick and Decanus process is enabled, the listed Decanus ID(s) is paired, the pairing password(s) is written back to the list file, and Decanus pairing files
      **(*.decanus)** are generated:
      ```
        CREATING DECANUS PAIRING FILES PATIENCE…
      ```
---
    - **15) Audit Information**<br />
      In case the Root Key Store is setup, the Audit Information is written to the USB stick **(*.sconfig.zip, *.seal.zip, *.state.zip)**. After that the initial wizard terminates.
      ```
        EXPORTING DEVICE AUDIT INFORMATION PATIENCE…
        WIZARD FINISHED OK 
      - Confirm with OK
      ```
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>      
    - **1) Preparations**<br />
      Required preparations, see [chapter above](#131-preparations-for-the-initial-wizard-firmware-v211)
---
    - **2) Plug-in the USB**<br />
      Plug-in the prepared (or empty) USB stick into the USB Port (X-Series: front panel; E-Series: rear panel)
---
    - **3) Connect Serial Cable to PC**<br />
      To setup your device using the CLI connect your PC (with terminal program) over the serial port with the following settings:
      115200 8N1 (speed of 115200bps, 8 data bits, no parity bit, 1 stop bit)
---
    - **4) Login to device**<br />
       In Terminal-Program: Press "ENTER"
      ```
      - Login password: `ABCD` 
      ```
---
    - **5) Initial Wizard**<br />
      As long as the initial wizard is not completed you get prompted after each login again to execute (or continue) the wizard.
         
        ```
          Execute initial wizard? [Yes]/No
          (No - Resume to device menu)
        - Confirm with YES
        ```
---
    - **6) Setup of Genesis PIN** ![](../../../img/HSM/genesis_card.png)<br />    
      For the next step you will need the Genesis Card(s) <br /> for devices with card slots (e.g. Primus X),
      the Genesis PIN, either created previously or received on other ways (see accompanying documentation)
      or the Activation Code, retrieved from the [support portal](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14) to generate the initial GPIN. Devices without card
      slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested.

      ```
        Use existing Genesis PIN? [Yes]/No 
        (No - to create one)
      ```

      - **6a)** In case you have an existing Genesis PIN:
        ```
          Enter PIN for Genesis card (Active) in Slot 2 (4 attempts left): 
        - `>>> ********` 
          PIN accepted!
        ```
        
        - Continue with step 7)

      - **6b)** In case you do not have a Genesis PIN: 
        ```
          Enter activation code:
        - `>>> XXXXX-XXXXX-XXX`

          New PIN!
          Enter PIN for Genesis card (Active) in Slot 2:        
        - `>>> ********`

          Reenter PIN for Genesis card (Active) in Slot 2:        
        - `>>> ********`

          PIN accepted! 
          Genesis card updated … 
        ```
---
    - **7)** In case the USB stick is not yet inserted:
      ```
        Insert USB memory stick and then press `<ENTER>`.
      ```
---
    - **8)** **License update** ![](../../../img/HSM/genesis_card.png)<br />
      In case a license file **(*.license)** is found on the USB stick, the license is checked and updated if necessary. <br />
      In some upgrade scenarios the license might be updated again after the firmware update. <br />
      A license change will cause a device reboot. Restart at step 1) after the device reboot.
      ```
        Checking license update 
        Patience, updating license... 
        License updated! 
        Rebooting!
      ```
---
    - **9) Firmware update** ![](../../../img/HSM/genesis_card.png)<br />      
      In case a firmware file **(*.hsm)** is found on the USB stick, the file is checked and updated if necessary.<br />
      A firmware change will cause a device reboot. Restart at step 15) after the device reboot.
      ```
        Checking firmware update 
        Patience, updating firmware... 
        Firmware updated! 
        Rebooting!
      ```
---
    - **10) Operation Mode** ![](../../../img/HSM/genesis_card.png)<br />
      In the next step you define the operation mode, which cannot be changed later.
      - Select **YES** for
        - Standard HSM setup (see 3.10)
        - SIC/SECOM user (on S500 this results to restricted mode, see 3.10.2)
        - Common criteria (CC) compliant setup, refer to chapter 3.10.4 for correct mode and setup selection
      - Select **NO** for
        - User requiring strict FIPS compliance (FIPS mode see chapter 3.10)
        ```
          Use normal mode? [Yes]/No (No - FIPS mode)
        ```
      Select the required operation mode (default normal mode) to continue initialization and KEK creation.
      This creates the internal Primus HSM encryption key. The KEK encrypts all internal files, data, certificates,
      and passwords of the Primus HSM. It is unique to each Primus HSM, cannot be read out and therefore it remains always in the HSM. The KEK is deleted whenever the Primus is reset to the factory-reset state and
      generated anew during the initial wizard or restore wizard.
        ```
          Creating KEK
          Patience, operation in progress...
          KEK created!
        ```
---
    - **11) Device Security Configuration** ![](../../../img/HSM/genesis_card.png)<br />
      In case a device security configuration file **(*.sconfig)** is found on the USB stick, the content is validated and applied. <br />
      Note: the file is invalid if it contains user information!
      ```
        Importing device configuration 
        Importing the configuration from the USB is successful!
      ```
---
    - **12) Root Key Store** ![](../../../img/HSM/genesis_card.png)<br />
      In case the Root Key Store is licensed, it is setup automatically (used for audit information). 
      ```
        Setting up root key store 
        Root key store setup successful!
      ```
---
    - **13) Security Officer (SO)** ![](../../../img/HSM/genesis_card.png) ![](../../../img/HSM/so_card.png)<br />
      For the next step you will need the SO Cards in case of 2-factor authentication (Primus X, min. 2 cards). <br />
      Create two or more Security Officers (SO) for the device, by defining unique SO operator names and the associated SO PIN, which must have 8 to 12 digits and shall not lead with 0:
      ```
        Creating SO
        Enter SO card owner name:
      - `>>> SO1`

        New PIN!
        Enter PIN for SO card (Device) in Slot 1:
      - `>>> ********`

        Reenter PIN for SO card (Device) in Slot 1:
      - `>>> ********`

        PIN accepted!
        ```        
      ```
        Enter SO card owner name:
      - `>>> SO2`
        New PIN!
        Enter PIN for SO card (Device) in Slot 3:
      - `>>> ********`

        Reenter PIN for SO card (Device) in Slot 3:
      - `>>> ********`

        PIN accepted!
      ```
      ```
        Continue device setup wizard? [Yes]/No (No - Add additional security officer)
      ```
      - Choose **NO** to create more Security Officers. 
      - Choose **YES** if all SOs are defined and to continue the next activity of the wizard.
      ```
        SO role created! 
      ```
---
    - **14) Clustering** <br />
      In the next step you define if you setup the device as Master or Clone (and HA or Manual):
      ```
        Setup as master? [Yes]/No
      ```
      - **14a)** Yes - “Setup as Master” selected:<br /><br />
        In case Partition Configuration File(s) **(*.pconfig)** is found on the USB stick, the specified user(s) is created, the original file deleted, and the information of the created user with the necessary credentials (setup password etc.) is written to the output file(s) **(*.pcreated)** on the USB stick, until all files are processed.
        ```
          Creating user from configuration file
          User xxxxxxx successfully created!
          …
          User xxxxxxx successfully created!
        ```
        ---
          In case **no Partition Configuration File** was found, you are asked to create a new user (partition) and to define the username. In this case you should note the displayed Temporary Setup Password (not written to USB stick), required to initially connect with the Client Providers (JCE, MS CNG, PKCS#11) safely to the HSM. The setup password is only valid for 3 days (configurable), starting after first usage.
          ```
            Enter new username:
          - `>>> PARTITION001`

            Temporary setup password is: aaaaa-bbbbbccccc-ddddd-eeeee
          ```
          - Continue with step 15)
        ---
      - **14b)** No – “Setup as Clone” selected:<br />
        Select if you want to setup the Clone as HA Clone or Manual Clone.<br />
        The procedure writes the clone key as file to the USB stick (`<devicename>.clone`):<br />

        ```
          Setup as high availability clone? [Yes]/No <br />
          (No - Setup as offline clone)

        - Type Yes to integrate the clone device into a high-availability cluster
        - Type No to create a offline clone

          Patience, operation in progress... 
          Clone key created
        ```
        - Continue with step 15)
---
    - **15) Decanus** <br />
      In case a Decanus list file **(*.dconfig)** is found on the USB stick and Decanus process is enabled, the listed Decanus ID(s) is paired, the pairing password(s) is written back to the list file, and Decanus pairing files
      **(*.decanus)** are generated:

      ```
        Creating DECANUS list pairing file
      ```
---
    - **16) Audit Information**<br />
      In case the Root Key Store is setup, the Audit Information is written to the USB stick **(*.sconfig.zip, *.seal.zip, *.state.zip)**. After that the initial wizard terminates.
      ```
        Exporting device audit information
      ```
      ```
        Wizard finished OK.
      ```
  </TabItem>
</Tabs>
After this step the initial wizard has completed and cannot be restarted (except after factory reset).

After the initial wizard, the HSM is either in the state “Master” or “Clone” as indicated on the display with "MSTR" or "CLON".

:::tip tip

Note: before live operation, we recommend to setup additional GN and SO cards for redundancy purposes in case of loss/damage of a card. See the User Guide for specific instructions.

:::

---
## Assure integrity of the device (checking digital seal and hardware seal)

The digital seal allows to check that the equipment was not manipulated, tampered, or reset since factory provisioning.

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
     AUDIT → DIGITAL SEAL → DISPLAY SEAL    
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
     `hsm_display_seal`
  </TabItem>
</Tabs>


The above command should display the digital seal code.

Raise a ticket on the Securosys Support Portal under ["1 – Administrative”, “Digital Seal Validation request (Primus HSM or Imunes TEE)"](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-dcf9fb84eb5d2da15c7b76f1ac92bda1), referencing the equipment (asset, serial number) and the digital seal code.

Our technical support will confirm the validity of the digital seal code.