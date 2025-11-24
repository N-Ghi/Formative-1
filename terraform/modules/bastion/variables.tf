variable "resource_group_name" {
  type        = string
  description = "Azure Resource Group name"
}

variable "public_subnet_id" {
  type        = string
  description = "ID of the public subnet where Bastion will reside"
}

variable "bastion_vm_name" {
  type        = string
  description = "Name of the Bastion VM"
}

variable "admin_username" {
  type        = string
  description = "Admin username for the Bastion VM"
}

variable "admin_password" {
  type        = string
  description = "Admin password for the Bastion VM"
}

variable "location" {
  type        = string
  description = "Azure region for the Bastion VM"
}

variable "private_vm_nsg_id" {
  type        = string
  description = "Network Security Group ID of the private VM to allow SSH access from Bastion"
}

variable "ssh_public_key" {
  type        = string
  description = "SSH public key content for VM authentication. Can contain multiple keys separated by newlines."
  sensitive   = true
}