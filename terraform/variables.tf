variable "vm_admin_password" {
  type        = string
  description = "Admin password for the private VM"
  sensitive   = true
}

variable "db_admin_password" {
  type        = string
  description = "Admin password for the managed database"
  sensitive   = true
}

variable "my_ip" {
  type        = string
  description = "Your public IP address to allow access to the database"
  sensitive   = false
}