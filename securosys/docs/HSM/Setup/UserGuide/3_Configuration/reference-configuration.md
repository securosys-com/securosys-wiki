# Reference config (v2.11.1)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<primus version="2" minor="2" name="PRIMUS-HSM-MASTER" state="master" serialnumber="000000000">
	<system_time>2023-03-10 10:06:44 UTC</system_time>
	<!-- external syslog (logserver) and audit server (cryptoserver) configuration -->
	<syslog logserver="disabled" cryptoserver="enabled" gapless_auditlog="enabled">
		<syslog_level>6</syslog_level>
		<!-- log level 1-6 -->
		<crypto_level>6</crypto_level>
		<!-- log level 1-6 -->
		<!-- settings for syslog -->
		<syslog_address id="1"/>
		<syslog_size>50000</syslog_size>
		<syslog_port tcp="disabled">514</syslog_port>
		<!-- TCP/UDP and port -->
		<syslog_interface>2</syslog_interface>
		<!-- interface 1-4 -->
		<!-- settings for security/audit log, note security log contains syslog msgs -->
		<crypto_address id="1">10.10.2.205</crypto_address>
		<crypto_size>50000</crypto_size>
		<crypto_port tcp="enabled">514</crypto_port>
		<!-- TCP/UDP and port -->
		<crypto_interface>2</crypto_interface>
		<!-- interface 1-4 -->
		<ca_certificate base64="" sni="enabled"/>
		<!-- TLS certificate -->
	</syslog>
	<!-- networking configuration -->
	<network>
		<!-- manual DNS resolver configuration -->
		<resolv_config>
			<domain_name>mydomain.com</domain_name>
			<!-- domain name -->
			<nameserver_ipv4 id="1">10.10.2.200</nameserver_ipv4>
			<nameserver_ipv6 id="1"/>
		</resolv_config>
		<!-- interface 1 configuration IP networks of all interfaces must be disjunct -->
		<data dhcp="disabled" dhcp6="disabled">
			<!-- disable DHCP for manual IP address setting -->
			<autoNeg>enabled</autoNeg>
			<!-- auto-negotiation -->
			<lineSpeed>100</lineSpeed>
			<!-- max.Ethernet speed -->
			<fullDuplex>enabled</fullDuplex>
			<ipv4addr>10.10.1.11</ipv4addr>
			<!-- IPv4 address -->
			<ipv4mask>24</ipv4mask>
			<!-- IPv4 netmask CIDR notation -->
			<ipv4gate>0.0.0.0</ipv4gate>
			<!-- optional gateway, dont use -->
			<ipv6addr>::</ipv6addr>
			<!-- Ipv6 address -->
			<ipv6mask>0</ipv6mask>
			<!-- IPv6 netmask -->
			<ipv6gate>::</ipv6gate>
			<!-- optional IPv6 gateway, dont use -->
		</data>
		<!-- interface 2 configuration IP networks of all interfaces must be disjunct -->
		<management dhcp="disabled" dhcp6="disabled">
			<autoNeg>enabled</autoNeg>
			<lineSpeed>100</lineSpeed>
			<fullDuplex>enabled</fullDuplex>
			<ipv4addr>10.10.2.11</ipv4addr>
			<ipv4mask>24</ipv4mask>
			<ipv4gate>0.0.0.0</ipv4gate>
			<ipv6addr>::</ipv6addr>
			<ipv6mask>0</ipv6mask>
			<ipv6gate>::</ipv6gate>
		</management>
		<!-- interface 3 configuration IP networks of all interfaces must be disjunct -->
		<high-availability dhcp="disabled" dhcp6="disabled">
			<autoNeg>enabled</autoNeg>
			<lineSpeed>100</lineSpeed>
			<fullDuplex>enabled</fullDuplex>
			<ipv4addr>10.10.3.11</ipv4addr>
			<ipv4mask>24</ipv4mask>
			<ipv4gate>0.0.0.0</ipv4gate>
			<ipv6addr>::</ipv6addr>
			<ipv6mask>0</ipv6mask>
			<ipv6gate>::</ipv6gate>
		</high-availability>
		<!-- interface 4 configuration IP networks of all interfaces must be disjunct -->
		<redundancy dhcp="disabled" dhcp6="disabled">
			<autoNeg>enabled</autoNeg>
			<lineSpeed>100</lineSpeed>
			<fullDuplex>enabled</fullDuplex>
			<ipv4addr>10.10.4.11</ipv4addr>
			<ipv4mask>24</ipv4mask>
			<ipv4gate>0.0.0.0</ipv4gate>
			<ipv6addr>::</ipv6addr>
			<ipv6mask>0</ipv6mask>
			<ipv6gate>::</ipv6gate>
		</redundancy>
		<!-- List of routing entries, max 32 ids per IPv4 and IPv6, only one default route! -->
		<static_ipv4_route id="1">
			<!-- increment ids for more routes -->
			<network>0.0.0.0</network>
			<!-- IPv4 network -->
			<mask>0</mask>
			<!-- IPv4 netmask CIDR -->
			<gateway>10.10.1.1</gateway>
			<!-- IPv4 gateway, within interface subnet -->
			<interface>1</interface>
			<!-- via interface -->
		</static_ipv4_route>
		<static_ipv6_route id="1">
			<network>::</network>
			<mask>0</mask>
			<gateway>::</gateway>
			<interface>1</interface>
		</static_ipv6_route>
	</network>
	<!-- services mapping configuration -->
	<config_process>
		<single_port>disabled</single_port>
		<!-- all traffic on interface 1, 2-3,(4) unused -->
		<all_port>disabled</all_port>
		<!-- all services on all interfaces -->
		<redundancy>0</redundancy>
		<!-- interface 4 redundant for interface 1-3, 0=off -->
		<dual_redundancy>disabled</dual_redundancy>
		<!-- use 2x2 redundancy -->
		<bond_mode>1</bond_mode>
		<!-- bonding mode 1=active-backup, 2=LACP slow, 3=LACP fast -->
		<snmp_interface>2</snmp_interface>
		<!-- snmp on interface -->
		<password/>
		<!-- snmp password -->
		<snmp>enabled</snmp>
		<!-- enable snmp -->
		<backup>enabled</backup>
		<!-- allow usb backup -->
		<restore>enabled</restore>
		<!-- allow usb backup restore -->
		<local_clone>enabled</local_clone>
		<!-- manual cloning -->
		<remote_update>enabled</remote_update>
		<!-- remote firmware update via Decanus Terminal -->
		<modify_config>enabled</modify_config>
		<!-- manual clones can modify configuration -->
		<add_genesis>enabled</add_genesis>
		<!-- allow to make copy of genesis card -->
		<noise_source>1</noise_source>
		<!-- choose noise source, default=1 (TRNG) 2 (AIS31)-->
		<tilt_sensor>enabled</tilt_sensor>
		<!-- enable logging of vibration sensor -->
	</config_process>
	<!-- JCE interface enable and configuration -->
	<jce_process>
		<active>enabled</active>
		<port>2300</port>
		<interface>1</interface>
	</jce_process>
	<!-- PKCS#11 interface enable and configuration -->
	<pkcs_process>
		<active>disabled</active>
		<port>2310</port>
		<interface>1</interface>
	</pkcs_process>
	<!-- MS crypto API new generation (CNG) interface enable and configuration -->
	<mscng_process>
		<active>disabled</active>
		<port>2320</port>
		<interface>1</interface>
	</mscng_process>
	<!-- Active synchronisation HA cloning (online clone) configuration -->
	<ha_process>
		<active>disabled</active>
		<port>2330</port>
		<interface>3</interface>
	</ha_process>
	<!-- Remote administration (Decanus) for device managment configuration -->
	<decanus_process>
		<active>enabled</active>
		<port>2340</port>
		<interface>2</interface>
	</decanus_process>
	<!-- Security configuration, requires SO priviledges -->
	<crypto_process>
		<master_url id="1">10.10.3.11</master_url>
		<!-- HA master ip address(es) -->
		<master_url id="2">10.10.1.11</master_url>
		<remote_ha_clone>enabled</remote_ha_clone>
		<!-- active HA cloning enable -->
		<max_user>1</max_user>
		<!-- max number of users/partitions, must be <= licensed value -->
		<max_so>10</max_so>
		<!-- max number of SO role individuals, 2 of n (default n = 10) -->
		<delete_user>disabled</delete_user>
		<setup_password_lifespan>72</setup_password_lifespan>
		<!-- intial setup password life in hours -->
		<login_attempt_threshold>100</login_attempt_threshold>
		<!-- max number of failed logins in attempt reset time interval -->
		<attempt_reset_time>300</attempt_reset_time>
		<!-- attempt reset time interval, default 100 attemps in 300s -->
		<login_lockout_time>300</login_lockout_time>
		<!-- lock out time in s if attemps in interval are exceeded -->
		<keystore_size_limit>150</keystore_size_limit>
		<!-- max key store size in MB -->
		<import_keys>disabled</import_keys>
		<!-- enable key import on device -->
		<export_keys>disabled</export_keys>
		<!-- enable key export on device -->
		<extract_keys>disabled</extract_keys>
		<!-- enable wrapped key export on device -->
		<crypto_log>enabled</crypto_log>
		<!-- enable security/audit log -->
		<clone_modify>enabled</clone_modify>
		<!-- enable object generation on clones, disable = only on master -->
		<user_config>enabled</user_config>
		<!-- indicates license value -->
		<invalidate_keys>disabled</invalidate_keys>
		<!-- enable: deleted keys are not erased, but invalidated, erasure requires SO action -->
		<verify_block_state>disabled</verify_block_state>
		<!-- enable: verification of blocking state of key delegated to master, used for EKA/SKA -->
		<client_api_access>enabled</client_api_access>
		<!-- disable will reject new connections to keystore, brings device into maintenance state, previously crypto_access -->
		<session_objects>enabled</session_objects>
		<!-- enable session objects using device external key objects -->
		<destroy_objects>enabled</destroy_objects>
		<!-- enable deletion of keystore objects, disable: delete will fail -->
		<use_objects>enabled</use_objects>
		<trust_store>disabled</trust_store>
		<!-- certificates reported as trusted -->
		<keystore_size_limit>0</keystore_size_limit>
		<pkcs_password state="value"/>
		<!-- set a default PIN for PKCS#11 -->
		<!-- Partition configuration -->
		<crypto_user state="enabled">
			<!-- enabled=user config, disabled=device config -->
			<user_name>PART001</user_name>
			<!-- partition name -->
			<management>disabled</management>
			<!-- allow Decanus partition management -->
			<size_limit>0</size_limit>
			<setup_password_lifespan>72</setup_password_lifespan>
			<import_keys>disabled</import_keys>
			<export_keys>disabled</export_keys>
			<extract_keys>disabled</extract_keys>
			<clone_modify>disabled</clone_modify>
			<read_only>disabled</read_only>
			<!-- enable: no new keys can be added to object keystore (create,import key fail) -->
			<invalidate_keys>disabled</invalidate_keys>
			<verify_block_state>disabled</verify_block_state>
			<key_authorization>disabled</key_authorization>
			<!-- enable SKA policies on keys -->
			<rest_api>disabled</rest_api>
			<!-- enable access through rest api -->
			<tsb_engine>disabled</tsb_engine>
			<!-- enable access by transaction security broker -->
			<client_api_access>enabled</client_api_access>
			<!-- disable to take user/partition offline -->
			<session_objects>enabled</session_objects>
			<destroy_objects>enabled</destroy_objects>
			<use_objects>enabled</use_objects>
			<trust_store>disabled</trust_store>
			<userlog>disabled</userlog>
			<!-- partition specific logging -->
			<userlog_size>12000</userlog_size>
			<userlog_level>6</userlog_level>
			<pkcs_password>PRIMUSDEV</pkcs_password>
			<!-- set partition PIN for PKCS#11, default = none -->
			<jce_allowed>enabled</jce_allowed>
			<!-- enable JCE interface on partition -->
			<pkcs_allowed>enabled</pkcs_allowed>
			<!-- enable PKCS#11, interface on partition -->
			<mscng_allowed>enabled</mscng_allowed>
			<!-- enable CNG interface on partition -->
		</crypto_user>
	</crypto_process>
	<!-- List of time servers (ntp) -->
	<ntp state="enabled">
		<!-- enable ntp protocol -->
		<server id="1">10.10.2.201</server>
		<!-- ntp url or ip address -->
		<interface>2</interface>
		<!-- ntp via interface -->
		<ntp_pool>disabled</ntp_pool>
		<!-- enable NTP pool addresses -->
	</ntp>
</primus>
```
