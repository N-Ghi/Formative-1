resource "azurerm_subnet" "db_subnet" {
  name                 = "db-subnet"
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefixes     = ["10.0.3.0/24"]
  delegation {
    name = "db_delegation"
    service_delegation {
      name    = "Microsoft.DBforPostgreSQL/flexibleServers"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action"]
    }
  }
}

resource "azurerm_postgresql_flexible_server" "db" {
  name                          = var.db_name
  resource_group_name           = var.resource_group_name
  location                      = var.location
  version                       = "15"              # PostgreSQL version
  sku_name                      = "B_Standard_B1ms" # small dev instance
  storage_mb                    = 32768             # 32 GB
  administrator_login           = var.admin_username
  administrator_password        = var.db_admin_password
  delegated_subnet_id           = azurerm_subnet.db_subnet.id
  public_network_access_enabled = false
  private_dns_zone_id           = azurerm_private_dns_zone.postgres.id
  zone                          = "2"
  depends_on                    = [azurerm_private_dns_zone_virtual_network_link.postgres]
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
  name                          = "formative-db"
  resource_group_name           = var.resource_group_name
  location                      = var.location
  version                       = "15"
  delegated_subnet_id           = null # public access doesn't need a subnet
  administrator_login           = "dbadmin"
  administrator_password        = var.db_admin_password
  sku_name                      = "B_Standard_B1ms"
  storage_mb                    = 32768
  backup_retention_days         = 7
  zone                          = "2"
  public_network_access_enabled = true
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_my_ip" {
  name             = "allow-my-ip"
  server_id        = azurerm_postgresql_flexible_server.dev_db.id
  start_ip_address = var.my_ip
  end_ip_address   = var.palvis
}