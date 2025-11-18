output "acr_login_server" {
  value = module.acr.acr_login_server
}

output "private_vm_ip" {
  value = module.private_vm.private_vm_private_ip
}

output "db_fqdn" {
  value = module.db.db_fqdn
}