variable "resource_group_name" {
  type        = string
  description = "Azure Resource Group name"
}

variable "location" {
  type        = string
  description = "Azure region for the database"
}

variable "db_name" {
  type        = string
  description = "Name of the database"
}

variable "admin_username" {
  type        = string
  description = "Database admin username"
}

variable "db_admin_password" {
  type        = string
  sensitive   = true
  description = "Database admin password"
}

variable "vnet_id" {
  description = "ID of the virtual network"
  type        = string
}

variable "vnet_name" {
  description = "Name of the virtual network"
  type        = string
}