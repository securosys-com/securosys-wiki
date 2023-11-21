import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Policy Setup

---

## Initial HSM Policy Setup (if not done using initial wizard)

The setup of the device security policies requires security officer privileges. The policy of the device
can be set for the whole device and optionally for each individual partition (per user configuration,
see chapter 3.9). In case per user configuration is not setup, the device policy is used for the user.
The recommended way to setup the policy is to set the configuration by import of an XML formatted
configuration file. To get a template follow the steps in chapter 3.8. Alternatively, individual parameters can be set via configuration commands:

:::tip Tip

Partitions may use an individual user configuration. Initially these values correspond to the
factory default parameters. You may have to redo the steps below to make sure you have the configurations of those users included. If individual user configuration is not enabled, it will default to
the device config.

:::

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    - Activate SO role:  SETUP → ROLE ACTIVATION
    - Set individual parameters through:  SETUP → CONFIGURATION → SECURITY → …
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
    -  `hsm_so_activation`
    -  `hsm_sec_set_config` 
    
    Check `help_sec_config` for the specific syntax of the commands    
  </TabItem>
</Tabs>

:::tip Tip

Make sure that you have at least one API interface enabled (as licensed; JCE, PKCS#11, CNG) on the
device and, if enabled, also in each individual user config. Ensure that the “Client API Access” parameter is enabled. Otherwise, you cannot connect to the user partition with the application client.

:::


<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    -  SETUP → CONFIGURATION → SECURITY → **DEVICE SECURITY** → CRYPTO POLICY → CLIENT API ACCESS
    -  SETUP → CONFIGURATION → SECURITY → **USER SECURITY** → CLIENT API ACCESS
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
    -  `hsm_sec_set_config client_api_access=true`
    -  `hsm_user_set_config client_api_access=true`    
  </TabItem>
</Tabs>