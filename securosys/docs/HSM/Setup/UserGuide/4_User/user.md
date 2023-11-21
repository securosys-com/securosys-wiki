import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# User Setup

---

## Individual User Configuration

Individual user security configuration can be set. This is a SO privileged operation thus first activate the SO role.

If per user config is enabled, the user config parameters are applied to the according user and overrules the device config with the following exception: <br />
  - to use the APIs (JCE, PKCS#11, MSCNG) and Client API Access, they must also be enabled on device level. 
  - Factory default parameters are initially applied to all “User Security” parameters.

To activate the per user configuration (factory defaults are applied initially):

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    -  SETUP → CONFIGURATION → SECURITY → USER SECURITY→ (USER) → ENABLE USER CONFIG
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>
      To change settings of a particular user via console type the commands below, asking for the username:
    ```
    -  hsm_sec_enter_user_config
    -  hsm_user_set_config use_user_conf=true
    ```
    To list the settings of this user:
    ```    
    -  hsm_user_list_config
    ```
    To leave the settings of this particular user:
    ```    
    -  hsm_sec_exit_user_config 
    ```
    Check `help_net_config` for the specific syntax of the commands.
  </TabItem>
</Tabs>

The setting for all users can be modified together in the XML structure and the configuration can be archived. <br />
It is recommended to archive, and revision control the applied configuration settings. 

