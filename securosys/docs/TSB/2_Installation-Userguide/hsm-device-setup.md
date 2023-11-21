import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# HSM Device Setup

:::tip tip

This page gives an overview of the main HSM setup and settings. Note that information in this chapter may not be complete nor up-to-date, depending on the HSM firmware in use. This chapter is written exclusively for complete onPremise architecture ( **Type 1** ). HSMaaS products are not affected. If the architecture types Type2, Type3 have been selected, you can skip to chapter [3. Transaction Security Broker Service Installation](#_Transaction_Security_Broker)

:::

:::danger Take care

The initial setup of the Primus HSM is not covered in this guide, please refer to the [QuickStart Guide](https://support.securosys.com/external/knowledge-base/article/67) **and** the [Primus HSM User Guide](https://support.securosys.com/external/knowledge-base/article/63) (specifically chapters 3 and 4). If you haven't already done so, follow the initial wizard for device setup.

:::

---

## Running the Initial Wizard

[Initial Wizard](../../HSM/Setup/UserGuide/0_GetStarted/HSM-Setup-v2-11-1.md)

## Device configuration and partition setup

<Tabs groupId="device-setup">
  <TabItem value="ui" label="HSM User Interface (LC Display) Primus X/S-Series" default>
    - **1) Activate SO role**
        ```
             SETUP → ROLE ACTIVATION
        ```
    - **2) Install and setup Root Key Store**<br />
        Please ensure that you have copied the obtained license file to a USB stick.<br />
        Insert the USB stick into the device before proceeding with the following step. ![](../img/TSB/genesis_card.png) <br />
        ```
            SYSTEM -> ROOT KEY ELEMENT -> INSTALL ROOT KEY STORE
            SYSTEM -> ROOT KEY ELEMENT -> SETUP ROOT KEY STORE
        ```
    - **3) Enable REST-API**<br />
        To utilize the basic TSB functionality, ensure that the REST-API is enabled. <br />
        Enabling this feature grants access to execute the following endpoint.<br /><br />
        - Service Information (Information about the service) <br />
        - Synchronous Key Operations (Synchronous operations that are directly forwarded to the HSM. <br />
        - Keys (Access to the HSM KeyStore) <br />
        - Certificate (Access to certificate mangement) <br />        
    ```
        SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → CLIENT API ACCESS
        SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → KEY AUTH
        SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → JCE
        SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → USER security → REST API ACCESS
    ```
    - **4) Enable (TSB) Workflow Engine**<br />
        Enable TSB Workflow Engine
        To utilize the enhanced multiauthorization signature workflow in TSB, ensure that the TSB Workflow engine is enabled, provided that the module is properly licensed.<br />
        Enabling this feature grants access to execute the following endpoints:            
                - `/v1/sign, /v1/decrypt, /v1/unwrap, /v1/modify, /v1/block, /v1/request/**`<br /><br />

            ```
                SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPTO POLICY → TSB WORKFLOW ENGINE
            ```
    - **5) Additional device security Settings** (Optional)<br />
        Please note that for a comprehensive understanding of the following settings being configured, it is advised to consult the Primus HSM User Guide.
        ```
            SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → SESSION OBJECTS
            SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → KEY IMPORT
            SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → KEY EXPORT
            SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → KEY EXTRACT
        ```
        - **5.1) Key Invalidation** (Optional)<br />
            Activated Key Invalidation creates a **shadow copy** of the key when it is **deleted**.<br />
            Be careful. this prevent creation of a new key with the **same key name** and key id.
            ```
                SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → KEY INVALIDATION
            ```
        - **5.2) Object Destruction** (Optional)<br />
            If set to false, key cannot be deleted (delete will always fail)
            ```
                SETUP → CONFIGURATION → SECURITY → DEVICE SECURITY → CRYPO POLICY → OBJECT DESTRUCTION
            ```
    - **6) Create User / Generate Setup-Password**<br />
            If you have already created a user with the initial wizard you can skip this step. (the setup password has limited lifetime, default 3 days after first usage)<br /><br />
            To create a new User:
            ```
                ROLES → USER → CREATE NEW USER
            ```
            To generate a new Setup-Password:
            ```
                ROLES → USER → NEW SETUP PASSWORD
            ```
            **Note down the generated setup-password, _It is required to setup TSB connection to the HSM._**
    
    You have now configured the HSM, created a new user and noted the setup-password. You can now continue on deploying Transaction Security Broker as a docker container.
  </TabItem>
  <TabItem value="console" label="HSM Console Primus HSM, all Series" default>   
    Activate SO role:
    - **1) Activate SO role**
        ```
            hsm_so_activation
        ```
        ```
            Enter PIN for SO card (Device) in Slot 1 (4 attempts left):
            >>> ******
            PIN accepted!

            Enter PIN for SO card (Device) in Slot 3 (4 attempts left):
            >>> ********
            PIN accepted!
            
            SO-Role is successfully activated!
        ```
    - **2) Install and setup Root Key Store**<br />
        Please ensure that you have copied the obtained license file to a USB stick. <br />
        Insert the USB stick into the device before proceeding with the following step. ![](../img/TSB/genesis_card.png) <br />
        ```
            hsm_sec_install_rke
        ```
        ```
            hsm_sec_setup_rks
        ```
    - **3) Enable REST-API**<br />
        To utilize the basic TSB functionality, ensure that the REST-API is enabled. <br />
        Enabling this feature grants access to execute the following endpoint.<br /><br />
        - Service Information (Information about the service) <br />
        - Synchronous Key Operations (Synchronous operations that are directly forwarded to the HSM. <br />
        - Keys (Access to the HSM KeyStore) <br />
        - Certificate (Access to certificate mangement) <br />        
    ```
        hsm_sec_set_config crypto_access=true
        hsm_sec_set_config jce=true
        hsm_sec_set_config key_auth=true
        hsm_sec_set_config rest_api=true
    ```
    - **4) Enable (TSB) Workflow Engine** (optional)<br />        
        To utilize the enhanced multiauthorization signature workflow in TSB, ensure that the TSB Workflow engine is enabled, provided that the module is properly licensed.<br />
        Enabling this feature grants access to execute the following endpoints:            
                - `/v1/sign, /v1/decrypt, /v1/unwrap, /v1/modify, /v1/block, /v1/request/**`<br /><br />

            ```
                hsm_sec_set_config tsb_engine=true
            ```
    - **5) Additional device security Settings** (Optional)<br />
        Please note that for a comprehensive understanding of the following settings being configured, it is advised to consult the Primus HSM User Guide.
        ```
            hsm_sec_set_config session_objects=true
            hsm_sec_set_config key_import=true
            hsm_sec_set_config key_export=true
            hsm_sec_set_config key_extract=true
        ```
        - **5.1) Key Invalidation** (Optional)<br />
            Activated Key Invalidation creates a **shadow copy** of the key when it is **deleted**.<br />
            Be careful. this prevent creation of a new key with the **same key name** and key id.
            ```
                hsm_sec_set_config inval_keys=true
            ```
        - **5.2) Object Destruction** (Optional)<br />
            If set to false, key cannot be deleted (delete will always fail)
            ```
                hsm_sec_set_config destroy_objects=true
            ```
    - **6) Create User / Generate Setup-Password**<br />
            If you have already created a user with the initial wizard you can skip this step. (the setup password has limited lifetime, default 3 days after first usage)<br /><br />
            To create a new User:
            ```
                hsm_sec_create_user
            ```
            ```
                Enter new username:
                - SO >>> TEST_USERGUIDE

                Temporary setup password is: aaaaa-bbbbb-ccccc-ddddd-eeeee
                User created.
            ```
            To generate a new Setup-Password:
            ```
                hsm_user_new_setup_pass
            ```
            ```
                Enter username:
                - SO >>> TEST_USERGUIDE
                
                Temporary setup password is: aaaaa-bbbbb-ccccc-ddddd-eeeee
                Successfully finished.
            ```
            
            **Note down the generated setup-password, _It is required to setup TSB connection to the HSM._**
    
    You have now configured the HSM, created a new user and noted the setup-password. You can now continue on deploying Transaction Security Broker as a docker container.
  </TabItem>
</Tabs>

## Listing current user configuration

To list parameters: use:
```
    hsm_user_enter_config
```
```
    Enter username:
    SO >>> TEST_USERGUIDE

    SO already activated!        
```
```
    hsm_user_list_config <parameter>
```

    - Available Parameters:
        ```
        client_api_access           - Allow access to the key store of this user
        clone_modify                - Allow clone devices to modify the key store                                                                                      
        destroy_objects             - Allow destruction of objects              
        enforce_key_limits          - Limit key usage count to maximum defined by certification                                                                        
        inval_keys                  - Invalidate keys instead of deleting them immediately                                                                             
        jce                         - Enable JCE interface                      
        key_auth                    - Allow key authorization                   
        key_export                  - Allow key export                          
        key_extract                 - Allow key extraction                      
        key_import                  - Allow key import                          
        lifespan_setup_pwd          - Time in hours a setup password is valid. 0 - OTP                                                                                 
        max_partition_size          - Maximum size of the partition in MB       
        mgmt_access                 - Allow management access for this user     
        mscng                       - Enable MSCNG interface                    
        partition_ro                - Set partition read only                   
        persistent_external_objects - Allow export of objects for persistent storage                                                                                   
        pkcs_pwd                    - PKCS#11 PIN for this user (write-only)    
        pkcs11                      - Enable PKCS#11 interface                  
        rest_api                    - Allow REST API access                     
        session_objects             - Allow creation and usage of session objects                                                                                      
        trust_store                 - Set all certificates as trusted           
        tsb_engine                  - Allow TSB work flow engine                
        use_objects                 - Allow usage of objects                    
        use_usr_cnf                 - Enable user configuration                 
        usrlog                      - Enable User specific log file             
        usrlog_level                - User specific log level                   
        usrlog_size                 - Maximum user specific log size            
        verify_block                - Verify block state of keys on master 
        ```

To change user configuration:
- Make sure you have enabled user configuration:
    ```
        hsm_user_list_config use_usr_cnf
    ```
    - If the above command returns `false`<br />
        **Be careful herewidth you are ignoring the device configuration default and each property has to be set accordingly.**
        ```
            hsm_user_set_config use_usr_cnf=true
        ```
    - If the above command returns `true`
        ```
            hsm_user_set_config tsb_engine=true
        ```