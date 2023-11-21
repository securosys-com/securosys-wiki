import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Network Setup

---

## Network Setup (if not done using initial wizard)

Continue setting up the network interfaces (if not already done using the initial wizard) or go directly to section 3.7 below and setup policies and network configuration in one go. Please refer to
the chapter 4.4 for Network Settings details.

Primus HSM User Guide v2.11.1 page 33 of 182
The network configuration can be either edited in the exported Primus HSM configuration file and
reimported to the device using the following commands:

:::tip Tip

Edit the exported xml configuration file (default `<deviceName>.nconfig`) and import it

:::


<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    -  SETUP → CONFIGURATION → IMPORT/EXPORT → EXPORT SYSTEM CONFIG
    -  SETUP → CONFIGURATION → IMPORT/EXPORT → IMPORT SYSTEM CONFIG
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
    -  `hsm_net_export_config` [filename]
    -  `hsm_net_import_config`

    Check `help_net_config` for the specific syntax of the commands.
  </TabItem>
</Tabs>