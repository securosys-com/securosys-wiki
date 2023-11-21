import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Fimware update to (v2.11)

## Update the device from factory state (firmware `<v2.11`)

When updating a device having an initial firmware below v2.11 a couple of intermediate steps are required, before the v2.11 initial wizard can be used:
- Genesis PIN (GPIN) creation (if not available) using the Activation Code via old initial wizard
- Update the factory license
- Update the firmware to v2.11 or higher


:::tip For Primus X devices

For the next **Step 1** you will need the Genesis Card(s) ![](../../img/HSM/genesis_card.png) for devices with card slots (e.g. Primus X),
and the [Activation Code](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14), retrieved from the support portal to generate the initial GPIN. 

Devices without card slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested.

:::

Please follow carefully the step-by-step procedures described below:<br />
Power-up the device and wait for completion of the boot procedure, until all 4 LEDs light blue steady.<br />

Please follow carefully the step-by-step procedures described below:



<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    **Genesis PIN**
    - If you already **have the Genesis PIN**, jump to **step 4)** performing the following activities
      - Apply license update
      - Apply firmware update
    - If you **don’t have the Genesis PIN**, continue with **step 1)** performing the following activities:
      - Have the Activation Code ready (to be retrieved via Securosys Support Portal)
      - Login and run the initial wizard until Creation of the Genesis PIN, then reboot the device
      - Apply license update
      - Apply firmware update
    ---
    - **1) Login to device** <br />
      - Press **MENU**
      - select **LOGIN**
      - and enter the default login password `ABCD`,
      - followed by **ENT** on the displayed entry screen.
---
    - **2) Initial Wizard** ![](../../img/HSM/genesis_card.png) <br />
      Run the initial wizard until Creation of the Genesis PIN, then reboot the device:
      ```
        SETUP → WIZARD → INITIAL WIZARD
      
        USE NORMAL MODE (No - For special (fips) mode)       
      - Confirm with YES to continue
      
        CREATE NEW KEK
      - Confirm with YES
      ```
      
      For the next step you will need the Genesis Card(s) ![](../../img/HSM/genesis_card.png) for devices with card slots (e.g. Primus X), and the [Activation Code, retrieved from the support portal](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14) to generate the initial GPIN. <br />
      Devices without card slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested. 
      ```
        ENTER GN CARD IN S2 (Card Slot 2)

        USE EXISTING GN PIN?
        (NO TO CREATE ONE)
      ```
      - **a)** In case you already have a Genesis PIN: select YES, and jump to **step 4)**
      - **b)** In case you don’t have the Genesis PIN, and retrieved the Activation Code from the Securosys Support Portal: select NO, and continue with **step 3)** below
---
    - **3) Setup of Genesis PIN** ![](../../img/HSM/genesis_card.png) <br />
      In case you do not have a Genesis PIN (continuation from 2b):<br />
      In that case you will be asked to enter the Activation Code for the Genesis Card (labeled with the serial number of your device). After that you have to define a new PIN for your Genesis Card (8 digits, no leading 0)

      __NOTE: THIS PIN CANNOT BE CHANGED LATER!__


      Record and store this PIN securely! If you lose the PIN, the device will have to be returned to a Securosys maintenance center to bring it back into factory distribution state.
      
      Resetting the device by issuing the factory_reset command will **NOT** reset the PIN
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
    - **3.1) Power-off the device** <br />
      Abort now the initial wizard by disconnecting mains to power off the device
---
    - **4) Update License** ![](../../img/HSM/genesis_card.png) <br />
      - Copy the license file **(*.license)** to the USB stick and plug it into the USB Port
      - Power-up the device
      - Login again
      - Update the license (requires Genesis Card/PIN)

      ```
        SYSTEM → LICENSE

        DO YOU WANT TO UPDATE LICENSE 
      - Confirm with YES

        ENTER PIN / #4 GN CARD IN S2
      - `********`

        PIN ACCEPTED
      - Confirm with OK

        UPDATING LICENSE
        PATIENCE…
        LICENSE UPDATED 
      - Confirm with OK

        REBOOTING NOW
      ```
---
    - **5) Update Firmware** ![](../../img/HSM/genesis_card.png) <br />
      - Copy the firmware file **(*.hsm)** file to the USB stick and plug it into the USB Port
      - Login again, see step 1)
      - Update the firmware (requires Genesis Card/PIN)

      ```
        SYSTEM → FW UPDATE

        DO YOU WANT TO UPDATE FIRMWARE 
      - Confirm with YES

        ENTER PIN / #4 GN CARD IN S2
      - `********`

        PIN ACCEPTED
      - Confirm with OK

        FIRMWARE UPDATE STARTED ..
        FIRMWARE UPDATE
        SUCCESSFUL 
      - Confirm with OK
      
      REBOOTING NOW…
      ```

    As the device is now updated to firmware version v2.11, continue running the Initial Wizard according to <br />
    - [Initial Setup (v2.11.1)](../HSM-Update-to-v2-11-1.md)


  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
    **Genesis PIN**
    - If you already **have the Genesis PIN**, jump to **step 4)** performing the following activities
      - Apply license update
      - Apply firmware update
    - If you **don’t have the Genesis PIN**, continue with **step 1)** performing the following activities:
      - Have the Activation Code ready (to be retrieved via Securosys Support Portal)
      - Login and run the initial wizard until Creation of the Genesis PIN, then reboot the device
      - Apply license update
      - Apply firmware update
    ---
---
    - **1) Connect Serial Cable to PC**<br />
      To setup your device using the CLI connect your PC (with terminal program) over the serial port with the following settings:
      115200 8N1 (speed of 115200bps, 8 data bits, no parity bit, 1 stop bit)<br />

      - **1.1) Login to device**<br />
        In Terminal-Program: Press "ENTER"
        ```
        - Login password: `ABCD` 
        ```
---
    - **2) Initial Wizard** ![](../../img/HSM/genesis_card.png) <br />
      Run the initial wizard until Creation of the Genesis PIN, then reboot the device:
      ```        
        Execute initial wizard? [Yes]/No
        (No - Resume to device menu)
      - Confirm with YES
      ```

      ```
        Create a new KEK? [Yes]/No
      - Confirm with YES
      ```
      For the next step you will need the Genesis Card(s) ![](../../img/HSM/genesis_card.png) for devices with card slots (e.g. Primus X), and the [Activation Code, retrieved from the support portal](https://support.securosys.com/external/ticket/create/process?ProcessID=Process-5a0414d13b1fe09bfc6643ed159c0f14) to generate the initial GPIN. <br />
      Devices without card slots (Primus E) have the Genesis card built-in, and therefore no card insertion is requested. 
      ```
      Enter Genesis card (Active) in Slot 2 and then press <ENTER>
      ```
      ```
        Use existing Genesis PIN? [Yes]/No
        (No - to create one)      
      ```
      - **a)** In case you already have a Genesis PIN: select YES, and jump to **step 4)**
      - **b)** In case you don’t have the Genesis PIN, and retrieved the Activation Code from the Securosys Support Portal: select NO, and continue with **step 3)** below
---
    - **3) Setup of Genesis PIN** ![](../../img/HSM/genesis_card.png) <br />
      In case you do not have a Genesis PIN (continuation from 2b):<br />
      In that case you will be asked to enter the Activation Code for the Genesis Card (labeled with the serial number of your device). After that you have to define a new PIN for your Genesis Card (8 digits, no leading 0)

      __NOTE: THIS PIN CANNOT BE CHANGED LATER!__


      Record and store this PIN securely! If you lose the PIN, the device will have to be returned to a Securosys maintenance center to bring it back into factory distribution state.
      
      Resetting the device by issuing the factory_reset command will **NOT** reset the PIN
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
      - **3.1) Power-off the device** <br />
      Abort now the initial wizard by disconnecting mains to power off the device
---
    - **4) Update License** ![](../../img/HSM/genesis_card.png) <br />
      - Copy the license file **(*.license)** to the USB stick and plug it into the USB Port
      - Power-up the device
      - Login again
      - Update the license (requires Genesis Card/PIN)

      ```
      - `>>> hsm_sec_lic_update`
        Enter PIN for Genesis card (Active) in Slot 2 (4 attempts left):
      - `>>> ********`

        PIN accepted!
        Patience, updating license...

        License updated!  
        Rebooting!
      ```
---
    - **5) Update Firmware** ![](../../img/HSM/genesis_card.png) <br />
      - Copy the firmware file **(*.hsm)** file to the USB stick and plug it into the USB Port
      - Login again, see step 1)
      - Update the firmware (requires Genesis Card/PIN)
      ```
      - `>>> hsm_sec_software_update`

        Enter PIN for Genesis card (Active) in Slot 2 (4 attempts left):
      - `>>> ********`

        PIN accepted!        
        Please choose a file by entering its number from the list:
          - 1. Primus-2.10.3-rxxr.hsm
          - 2. Primus-2.11.1-rxxr.hsm
      - `>>> 2`

        Firmware update has started...

        Firmware update was successful!
        Rebooting!
      ```
    As the device is now updated to firmware version v2.11, continue running the Initial Wizard according to <br />
    - [Initial Setup (v2.11.1)](../HSM-Update-to-v2-11-1.md)
  </TabItem>
</Tabs>

:::danger Take care

In case you do not have a Genesis PIN (continuation from 2 b):

__Note that this PIN cannot be changed later!__

Record and store this PIN securely! If you lose the PIN, the device will have to be returned to a Securosys maintenance center to bring it back into factory distribution state.

Resetting the device by issuing the `factory_reset` command will **NOT** reset the PIN.

:::