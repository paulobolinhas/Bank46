resource "google_compute_firewall" "frontend_rules" {
  name    = "frontend"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["balancer"]
}

# TODO add web services rules

resource "google_compute_firewall" "microservices_rules" {
  name    = "microservices"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["80", "2400", "2500", "2600"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags = ["microservices"]
}

resource "google_compute_firewall" "monitor_rules" {
  name    = "monitor"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["3000", "9090", "2400"]
  }

  source_ranges = ["0.0.0.0/0"] 

  target_tags = ["monitor"]
}

resource "google_compute_firewall" "mongo_rules" {
  name    = "mongo"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["27017"]
  }

  source_ranges = ["0.0.0.0/0"] 

  target_tags = ["mongodb"]
}
