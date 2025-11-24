resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = var.sku
  admin_enabled       = false  # Disable ACR admin account (CKV_AZURE_137)

  # Deny public network access (CKV_AZURE_139)
  network_rule_set {
    default_action = "Deny"
  }
}
