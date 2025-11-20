resource "azurerm_network_security_group" "private_vm_nsg" {
  name                = "${var.vm_name}-nsg"
  location            = var.location
  resource_group_name = var.resource_group_name

  security_rule {
    name                       = "SSH-from-Bastion"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    # source_address_prefix      = var.allowed_ssh_cidr
    source_address_prefix      = "*" # Allow any source for testing purposes
    destination_port_range     = 22
    destination_address_prefix = "*"
  }
}

resource "azurerm_network_interface" "private_vm_nic" {
  name                = "${var.vm_name}-nic"
  location            = var.location
  resource_group_name = var.resource_group_name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = var.private_subnet_id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_network_interface_security_group_association" "private_vm_nic_nsg_assoc" {
  network_interface_id      = azurerm_network_interface.private_vm_nic.id
  network_security_group_id = azurerm_network_security_group.private_vm_nsg.id
}

resource "azurerm_linux_virtual_machine" "private_vm" {
  name                = var.vm_name
  resource_group_name = var.resource_group_name
  location            = var.location
  size                = "Standard_B1s"
  admin_username      = var.admin_username
  admin_password      = var.vm_admin_password

  network_interface_ids = [
    azurerm_network_interface.private_vm_nic.id
  ]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  disable_password_authentication = false
}
