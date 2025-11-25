# modules/load_balancer/main.tf

# Public IP for Load Balancer
resource "azurerm_public_ip" "lb_public_ip" {
  name                = "${var.lb_name}-pip"
  location            = var.location
  resource_group_name = var.resource_group_name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# Load Balancer
resource "azurerm_lb" "web_lb" {
  name                = var.lb_name
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "Standard"

  frontend_ip_configuration {
    name                 = "PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.lb_public_ip.id
  }
}

# Backend Address Pool
resource "azurerm_lb_backend_address_pool" "web_backend_pool" {
  loadbalancer_id = azurerm_lb.web_lb.id
  name            = "web-backend-pool"
}

# Associate VM NIC with Backend Pool
resource "azurerm_network_interface_backend_address_pool_association" "web_nic_lb_assoc" {
  network_interface_id    = var.app_vm_nic_id
  ip_configuration_name   = var.app_vm_nic_ip_config_name
  backend_address_pool_id = azurerm_lb_backend_address_pool.web_backend_pool.id
}

# Health Probe for HTTP
resource "azurerm_lb_probe" "http_probe" {
  loadbalancer_id     = azurerm_lb.web_lb.id
  name                = "http-health-probe"
  protocol            = "Http"
  port                = 80
  request_path        = "/"
  interval_in_seconds = 15
  number_of_probes    = 2
}

# Load Balancing Rule for HTTP
resource "azurerm_lb_rule" "http_rule" {
  loadbalancer_id                = azurerm_lb.web_lb.id
  name                           = "HTTP"
  protocol                       = "Tcp"
  frontend_port                  = 80
  backend_port                   = 80
  frontend_ip_configuration_name = "PublicIPAddress"
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.web_backend_pool.id]
  probe_id                       = azurerm_lb_probe.http_probe.id
  enable_tcp_reset               = true
  idle_timeout_in_minutes        = 4
}

# Load Balancing Rule for HTTPS
resource "azurerm_lb_rule" "https_rule" {
  loadbalancer_id                = azurerm_lb.web_lb.id
  name                           = "HTTPS"
  protocol                       = "Tcp"
  frontend_port                  = 443
  backend_port                   = 443
  frontend_ip_configuration_name = "PublicIPAddress"
  backend_address_pool_ids       = [azurerm_lb_backend_address_pool.web_backend_pool.id]
  probe_id                       = azurerm_lb_probe.http_probe.id
  enable_tcp_reset               = true
  idle_timeout_in_minutes        = 4
}