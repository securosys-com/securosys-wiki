# Quick Start (On-Prem)

Docker Compose simplifies the configuration and deployment of multi-container Docker applications. By defining services in the docker-compose.yml file and customizing the parameters to suit your needs, you can easily create and start all the specified services with a single command. We assume docker and docker-compose to be installed on your machine already, if not please install it using the official userguide. 

 - [Install Docker Engine](https://docs.docker.com/engine/install/)
 - [Overview of installing Docker Compose](https://docs.docker.com/compose/install/)

:::danger Take care

This Quickstart Guide start TSB with default Database-Credentials and withouth TLS configured and to be used for `development purpose` only. <br />
For productive setup please read the full userguide. [On-Premise Installation Guide](../2_Installation-Userguide/On-Premise-Installation.md)
:::


### Download configuration files
```
:~$ curl -L -XGET https://robot.reader.tsb:q19T2onJ4fHNUcz7CDTvwUhSK\*8r@securosys.jfrog.io/artifactory/external-tsb/securosys-tsb-config-files/Securosys_TSB_1.15.1.1.zip -o Securosys_TSB.zip`
:~$ unzip Securosys_TSB
```

### Configure the HSM-Connection Parameters
```
:~$ nano securosys_TSB_1.15.1.1/config-files/application-local.yml
```

Adjust the following lines: `hsm.host`, `hsm.port`, `hsm.user`, `hsm.setupPassword`

```
hsm:
  host: 'nufenen.securosys.ch,grimsel.securosys.ch' # REPLACE with the hsm URL or IP
  port: '2400' # REPLACE with HSM JCE-Port
  user: SFETEST888 # REPLACE with your HSM username (PartitionName)
  setupPassword: gwe5p-Y5Lt2-nm4dJ-4SQux-KvLSk # REPLACE with your HSM SetupPassword
  encryptionPassword: G5VbL-R84Qy-XQmyR-8RZ5Z-tDtr4 # REPLACE it with some random value (high entropy). This password is used to encrypt the hsm user secret, stored in the SQL-Ddatabase
```

### Start the application

```
:~$ cd securosys_TSB_1.15.1.1/
:~/securosys_TSB_1.15.1.1$ docker-compose up -d
```

#### Open Swagger
Open the (Swagger) to interact with the API in your browser: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

## What's next?

- Follow the instructions to [ Create a Key and use it to encrypt and decrypt a payload](../5_Tutorials/EncryptDecrypt.md)
- A few more request samples [`docusaurus.config.js`](https://docusaurus.io/docs/api/docusaurus-config)
- Rest-API [Capabilities and Functions](./1_TSB-Installation-OnPremises.md)