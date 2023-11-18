---
sidebar_position: 6
---

# Overview

Welcome to the official documentation for Securosys Transaction Security Broker (TSB) and the associated Primus Hardware Security Module (HSM) integration. This guide offers comprehensive instructions for setting up and configuring TSB on both Linux and Windows platforms.

The Transaction Security Broker Software is the Restful interface for PrimusHSM and delivered as a set of Docker containers. It establishes connections to a Database for state management, an HSM (Hardware Security Module) cluster for key operations and policy enforcement, and utilizes various logging mechanisms to capture relevant information.

## 1. Notification and Symbols

### 1.1 Key Notifications

:::tip Tip

The guide includes essential information for setting up TSB onPremise, offering valuable insights for a smooth configuration.

:::

:::danger Take care

A cautionary note emphasizing the importance of following instructions diligently to avoid potential data loss. Specific roles, such as Genesis Card and Security Officer (SO) Cards, are highlighted for critical actions.

:::

### 1.2 Symbols and Navigation

- Various symbols guide you through HSM configuration, utilizing graphical user interfaces and console commands for seamless navigation.

## 2. Introduction

This section introduces the Securosys REST API and the TSB license installation process, accommodating both Linux and Windows environments. The guide covers tested configurations on RHEL 7, CentOS 8, Docker 19.03, and MariaDB 10.4.

- **Flexibility:** TSB supports deployment on Kubernetes and standalone Docker containers, ensuring adaptability to diverse environments.

:::tip Security Architecture:

TSB offers support for three security architecture types (Type1, Type2, Type3), providing detailed instructions for their setup.

:::

![TSB Architecture](./TSB/img/Untitled%20Diagram-1695464332605.drawio%20(3).svg)

## 2.1 Security Architecture

Explore three distinct security architecture types:

### 2.1.1 Type1 - TSB with OnPremise Primus HSM

- Self-management of TSB and HSM operations in your datacenter.
- Complete control, elimination of network boundary issues, and seamless operational inheritance.

### 2.1.2 Type2 - TSB Software with HSMaaS in a Shared Environment

- Dedicated access in a shared HSM environment.
- Reliable, scalable, high availability failover, and load balancing provided by Securosys "as a Service" Solution.

### 2.1.3 Type3 - TSB Software with HSMaaS in a Dedicated Environment

- Dedicated HSM per customer in CloudsHSM service.
- High Availability, cloning mechanisms, and quality backups for data protection.

## 2.2 Support Contacts

For any installation, registration, or operational issues, consult the support portal at [https://support.securosys.com/](https://support.securosys.com/). Refer to your support plan agreement for entitlements, service level agreements, and contact details.

## 2.3 Abbreviations

Understand key acronyms used throughout the documentation, such as TSB, TEE, SKA, HSMaaS, mTLS, REST, and more.

# 3. HSM - Device Setup and Configuration

This section provides a detailed overview of setting up the Primus HSM for onPremise architecture (Type1).

- **Important Note (SKA Tip):** Differentiating setup instructions for onPremise architecture and HSMaaS products.

- **Initial Setup Caution (Take Care Warning):** Users are directed to the QuickStart Guide and Primus HSM User Guide for the initial setup, emphasizing the importance of device configuration.

- **Device Configuration Steps:** A step-by-step guide for device setup, including network configuration verification.

- **Device Security Settings:** Instructions for configuring REST-API access, enabling the TSB Workflow Engine, and additional security settings.

# 4. Transaction Security Broker Service Requirements

## 4.1 Supported Platforms

Discover the supported platforms for running the Transaction Security Broker Service, including Linux, Windows, and the availability of IOS upon request.

## 4.2 Installation Guides

Explore Docker installation requirements for both Linux and Windows, with specific instructions for each platform.

# 5. Transaction Security Broker Configuration

This section outlines the necessary steps for configuring the TSB application:

- **Download Configuration Files:** Retrieve essential configuration files using provided commands.
- **Setup Docker-Compose:** Optional steps for configuring Docker-Compose based on your setup.
- **HSM-Connection Properties:** Configure properties for HSM connection in the application-local.yml file.
- **Logging Configuration:** Adjust logging behavior based on specific requirements.

These steps ensure a successful setup and configuration of the Transaction Security Broker application.

For additional software releases and resources, visit [Transaction Security Broker: Software - Download](https://support.securosys.com/external/knowledge-base/article/114).


## What's next?

- Read the [QuickStart Guide - as a Service](./TSB/1_Get-Started/0_TSB-Quickstart.md)
- Read the [QuickStart Guide - on Premise Installation](./TSB/1_Get-Started/1_TSB-Installation-OnPremises.md)
- Request Samples (Rest-API) [Samples](/docs/category/fundamentals)
- En-Decrypt, SignVerify [Tutorials](/docs/category/tutorial)
- Read the [official Deployment Guide](./TSB/2_Installation-Userguide/On-Premise-Installation.md)
