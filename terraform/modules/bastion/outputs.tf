output "bastion_vm_id" {
  value       = azurerm_linux_virtual_machine.bastion_vm.id
  description = "ID of the Bastion VM"
}

output "bastion_public_ip" {
  value       = azurerm_public_ip.bastion_public_ip.ip_address
  description = "Public IP of the Bastion VM"
}
