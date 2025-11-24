terraform {
  required_version = ">= 1.0.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.116.0"
    }
  }
  cloud {
    organization = "Summative"
    workspaces {
      name = "Group-Project"
    }
  }
}

provider "azurerm" {
  features {}
}

# ----------------------------
# Resource Group (single source of truth)
# ----------------------------
resource "azurerm_resource_group" "summative_rg" {
  name     = "Summative-rg"
  location = "spaincentral"
}

# ----------------------------
# Modules
# ----------------------------

# 1 VNet
module "vnet" {
  source              = "./modules/vnet"
  resource_group_name = azurerm_resource_group.summative_rg.name
  location            = azurerm_resource_group.summative_rg.location
  vnet_cidr           = "10.0.0.0/16"
  public_subnet_cidr  = "10.0.1.0/24"
  private_subnet_cidr = "10.0.2.0/24"
  allowed_ssh_cidr    = "10.0.1.0/24" # Allow SSH from bastion subnet
}

# 2 Bastion host
module "bastion" {
  source              = "./modules/bastion"
  resource_group_name = azurerm_resource_group.summative_rg.name
  location            = azurerm_resource_group.summative_rg.location
  public_subnet_id    = module.vnet.public_subnet_id
  bastion_vm_name     = "bastion-vm"
  admin_username      = "azureuser"
  admin_password      = var.vm_admin_password # sensitive variable from Terraform Cloud (deprecated - use SSH keys)
  ssh_public_key      = var.ssh_public_key
  private_vm_nsg_id   = module.private_vm.private_vm_nsg_id
}

# 3 Private VM
module "private_vm" {
  source              = "./modules/vm"
  resource_group_name = azurerm_resource_group.summative_rg.name
  location            = azurerm_resource_group.summative_rg.location
  private_subnet_id   = module.vnet.private_subnet_id
  vm_name             = "app-vm"
  admin_username      = "azureuser"
  vm_admin_password   = var.vm_admin_password # sensitive variable (deprecated - use SSH keys)
  ssh_public_key      = var.ssh_public_key
  allowed_ssh_cidr    = module.vnet.public_subnet_cidr
}

# 4 Managed DB
module "db" {
  source = "./modules/db"

  resource_group_name      = azurerm_resource_group.summative_rg.name
  location                 = azurerm_resource_group.summative_rg.location
  admin_username           = "dbadmin"
  db_admin_password        = var.db_admin_password
  vnet_id                  = module.vnet.vnet_id
  vnet_name                = module.vnet.vnet_name
  subnet_nsg_name          = "db-subnet-nsg"
  db_subnet_address_prefix = "10.0.3.0/24"
  # db_admin_password   = var.db_admin_password # sensitive variable
  # my_ip               = var.my_ip
  # palvis              = var.palvis
}


# 5 Container Registry
module "acr" {
  source              = "./modules/acr"
  resource_group_name = azurerm_resource_group.summative_rg.name
  location            = azurerm_resource_group.summative_rg.location
  acr_name            = "summativeacr1234"
  sku                 = "Basic"
}
