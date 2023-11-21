import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Initial Setup (v2.8)

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

---

## Initial Setup of the HSM (firmware ≥v2.8.21)

The Initial Wizard will guide you through the complete setup process by means of <br /><br />


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

## Preparations for the Initial Wizard (Firmware `≥v2.8.21`)
Prepare all necessary material, information, and files for execution of the initial wizard:
- **Genesis Card**(s) for devices with card slots (e.g. Primus X),
the Genesis PIN, either created previously or received on other ways or the Activation Code, retrieved from the support portal to generate the initial GPIN
- **SO Cards** in case of 2-factor authentication (Primus X, min. 2 cards)
- Decide about operation mode (normal, restricted, FIPS, CC; see chapter 3.10)
- **USB memory stick**
  - License file (*.license) downloadable from the Securosys Support Portal ([see asset under section Equipment & Contracts](https://support.securosys.com/external/itsmconfigitem/overview))
  - Latest (or required) [firmware file (*.hsm; v2.8.21 or newer)](https://support.securosys.com/external/knowledge-base/article/111)
  - c) Device configuration file (*.xml, without user configuration)


### Run the Initial Wizard (Firmware `≥v2.8.21 and <2.11`)

Please follow carefully the step-by-step procedures described below:<br />
Power-up the device and wait for completion of the boot procedure, until all 4 LEDs light blue steady.<br />

:::tip Tip

For Primus E-Series (and X-Series) you can setup the device via the console input ( ). Connect a PC (with terminal program) over the serial port with the following settings: <br /><br /> **115200 8N1 (speed of 115200bps, 8 data bits, no parity bit, 1 stop bit).**

:::

On Primus X-Series you can setup the device via the front panel interface ( ). Press “MENU”, select LOGIN and enter the default maintenance password “ABCD”, followed by ENT on the displayed entry screen. Then choose:
    ```
        SETUP → WIZARD → INITIAL WIZARD
    ```

:::tip For Primus X devices

For the next **Step 1** you will need the Genesis Card(s) ![](../../../img/HSM/genesis_card.png) for devices with card slots (e.g. Primus X),
and the [Activation Code](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14), retrieved from the support portal to generate the initial GPIN. 

Devices without card slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested.

:::

For Primus E-Series (and X-Series) you can setup the device via the console input ( ). Connect a PC
over the serial port with the following settings: 115200 8N1 (8 bits, no parity, 1 stop bit). Hit return,
when you see the “Login password” prompt and type the default maintenance password “ABCD”.
Then at the prompt type the command:
```
    hsm_initial_wizard
```



After that, the wizard leads through several initial configuration questions:
    - “Use Normal Mode”: select YES (except you require FIPS or restricted mode)
        - for common criteria (CC) compliant setup refer to chapter 3.2.2 first for correct mode and setup selection
        - SIC/SECOM user choose special mode, restricted mode (see chapter 3.2.1)
        - User requiring strict FIPS compliance choose special mode, FIPS mode (see chapter 3.2.1)
    - “Create New KEK”: select YES,
        - this creates the internal Primus HSM encryption key. It is unique to each Primus HSM, cannot be read out and therefore it remains always in the HSM. The KEK is deleted whenever the Primus is reset to the factory-reset state and generated anew during the initial wizard or restore wizard. The KEK encrypts all internal files, data, certificates and passwords of the Primus HSM
    - “Use existing GN PIN”: select NO in case you have not yet defined (or received) a PIN for the Genesis Card. In this case you will be asked to enter the Activation Code for the Genesis Card (labeled with the serial number of your device). After that you have to define a new PIN for your Genesis Card (8-12 digits, no leading 0).

:::danger danger
    Note, that this PIN cannot be changed later!
    Record and store this PIN securely! If you lose the PIN, the device will have to be returned to a
    Securosys maintenance center to bring it back into factory distribution state.
    Resetting the device by issuing the factory_reset command will NOT reset the PIN.
:::

Continue with the wizard (see user manual chapters 3.2 to 3.4 for more details)
    - “Create New SO”: select YES to create two Security Officer (SO) cards, requires SO name, PIN
    - “Create User”: select YES to initialize a user (partition), requires username. Note, the Temporary Setup Password, required to initially connect with the Client Providers (JCE, MS CNG, PKCS#11).

::tip tip

Note: before live operation, we recommend to setup additional GN and SO cards for redundancy
purposes in case of lost/damage of a card. See the User Guide for specific instructions.

::