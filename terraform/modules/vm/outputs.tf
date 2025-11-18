output "private_vm_id" {
  value       = azurerm_linux_virtual_machine.private_vm.id
  description = "ID of the private VM"
}

output "private_vm_private_ip" {
  value       = azurerm_network_interface.private_vm_nic.private_ip_address
  description = "Private IP of the private VM"
}
