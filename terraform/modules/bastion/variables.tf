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
