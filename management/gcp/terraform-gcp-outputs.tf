output "balancer" {
    value = join(" ", google_compute_instance.balancer.*.network_interface.0.access_config.0.nat_ip)
}

output "balancer_ssh" {
 value = google_compute_instance.balancer.self_link
}

output "web_IPs"  {
  value = formatlist("%s = %s", google_compute_instance.web[*].name, google_compute_instance.web[*].network_interface.0.access_config.0.nat_ip)
}

output "microservices_IPs"  {
  value = formatlist("%s = %s", google_compute_instance.microservices[*].name, google_compute_instance.microservices[*].network_interface.0.access_config.0.nat_ip)
}

output "mongodb_instance_ip" {
  value = google_compute_instance.mongodb_instance.network_interface.0.access_config.0.nat_ip
}

output "monitor_instance_ip" {
  value = google_compute_instance.monitor.network_interface.0.access_config.0.nat_ip
}



