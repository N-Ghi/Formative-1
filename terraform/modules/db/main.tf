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
  name                = var.db_name
  resource_group_name = var.resource_group_name
  location            = var.location
  version             = "15"                # PostgreSQL version
  sku_name            = "B_Standard_B1ms"   # small dev instance
  storage_mb          = 32768               # 32 GB
  administrator_login          = var.admin_username
  administrator_password       = var.db_admin_password
  delegated_subnet_id          = azurerm_subnet.db_subnet.id
  public_network_access_enabled = false      # ensures private only
  private_dns_zone_id = azurerm_private_dns_zone.postgres.id
  depends_on = [azurerm_private_dns_zone_virtual_network_link.postgres]
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