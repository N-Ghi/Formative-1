resource "azurerm_subnet" "db_subnet" {
  name                 = "db-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefixes     = [var.db_subnet_address_prefix]

  delegation {
    name = "db_delegation"
    service_delegation {
      name    = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

resource "azurerm_network_security_group" "db_nsg" {
  name                = var.subnet_nsg_name
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_subnet_network_security_group_association" "db_assoc" {
  subnet_id                 = azurerm_subnet.db_subnet.id
  network_security_group_id = azurerm_network_security_group.db_nsg.id
}

resource "azurerm_private_dns_zone" "postgres" {
  name                = "privatelink.postgres.database.azure.com"
  resource_group_name = var.resource_group_name
}

resource "azurerm_private_dns_zone_virtual_network_link" "postgres" {
  name                  = "postgres-dns-link"
  resource_group_name   = var.resource_group_name
  private_dns_zone_name = azurerm_private_dns_zone.postgres.name
  virtual_network_id    = var.vnet_id
}

resource "azurerm_postgresql_flexible_server" "dev_db" {
  name                = "formative-db"
  resource_group_name = var.resource_group_name
  location            = var.location
  version             = "15"

  administrator_login    = var.admin_username
  administrator_password = var.db_admin_password

  sku_name                     = "B_Standard_B1ms"
  storage_mb                   = 32768
  geo_redundant_backup_enabled = false
  backup_retention_days        = 7
  zone                         = "2"

  public_network_access_enabled = true
}


resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure_services" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.dev_db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Allow your the team member's IP address
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_Ghislaine" {
  name             = "allow-Ghislaine"
  server_id        = azurerm_postgresql_flexible_server.dev_db.id
  start_ip_address = var.my_ip
  end_ip_address   = var.my_ip
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_Palvis" {
  name             = "allow-Palvis"
  server_id        = azurerm_postgresql_flexible_server.dev_db.id
  start_ip_address = var.palvis
  end_ip_address   = var.palvis
}