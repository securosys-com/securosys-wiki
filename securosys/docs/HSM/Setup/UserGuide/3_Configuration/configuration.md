import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# XML-Configuration

The security settings and network settings parameters may also be imported via XML.<br />
Thus, configuration management of multiple HSM can be greatly simplified. It is recommended to keep a copy of the configuration of each HSM, for reference.

---

## Configuration with XML (Export and Import)

Check annotated [Reference - Configuration](../Configuration/HSM-config-2_11.md)<br />
It is best practice to export the configuration before manually modifying it.

The default file name is `<deviceName>.sconfig`. If device attestation is initialized, an archive `<deviceName>.sconfig.zip` is created.<br />
The configuration XML file consists of network config, device security config and per user configurations.<br />
Edit the xml configuration file `<deviceName>.sconfig` according to your needs.

<Tabs groupId="device-setup">
  <TabItem value="x-series" label="Primus X-Series device" default>
    - Export the configuration to USB stick:
    ```
        SETUP → CONFIGURATION → IMPORT/EXPORT → EXPORT SECURITY CONFIG
    ```
    - Import the configuration from USB stick (*.sconfig):
    ```
       SETUP → CONFIGURATION → IMPORT/EXPORT → IMPORT SECURITY CONFIG
    ```
  </TabItem>
  <TabItem value="e-series" label="Primus E-Series device">
    - Export the configuration to USB stick:
    ```
        hsm_sec_export_config [filename]
    ```
    - Import the configuration from USB stick (*.sconfig):
    ```
       hsm_sec_import_config
    ```
  </TabItem>
</Tabs>

:::danger multiple *.sconfig

    - If there are multiple *.sconfig files on the USB stick, import via Console will show a file selection of max. 8 files, and import via front panel GUI will fail (file selection not supported).
    
    - Note that import does not allow to create new user partitions (they must already exist; 
    Stated parameters without value remain unchanged (e.g. `<pkcs_password/>`). 
    
    - Missing parameters are reset to factory default (e.g. not having a `<pkcs_password/>` statement deletes the PKCS#11 password).
    
    - In Cloning and HA Cloning, most of the Security settings are cloned from the Master onto the Clone and can therefore not be changed by XML import on the Clone. 
    
    - In case of failure, export the Security Log (see 4.7) and check the file crypto.log for more details.

:::
