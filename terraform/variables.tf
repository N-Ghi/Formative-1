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

variable "palvis" {
  type        = string
  description = "A custom variable for demonstration purposes"
  sensitive   = false
}

variable "Palvis-ssh" {
  type        = string
  description = "SSH public key content for VM authentication. Store in Terraform Cloud as a sensitive variable. Required for SSH key-based auth. Can contain multiple keys separated by newlines."
  sensitive   = true
}