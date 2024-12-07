# ###########  Load Balancer   #############
resource "google_compute_instance" "balancer" {
    name = "balancer"
    machine_type = var.GCP_MACHINE_TYPE
    zone = var.GCP_ZONE

    boot_disk {
        initialize_params {
        # image list can be found at:
        image = "ubuntu-2004-focal-v20240830"
        }
    }

    network_interface {
        network = "default"
        access_config {
        }
    }

    metadata = {
      ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
    }

  tags = ["balancer"]
}


###########  Web Services   #############
resource "google_compute_instance" "web" {
  
  count = 2
  name = "web${count.index+1}"

  ## TODO maybe put each machine in a different zone
  machine_type = var.GCP_MACHINE_TYPE
  zone         = var.GCP_ZONE

  boot_disk {
    initialize_params {
      image = "ubuntu-2004-focal-v20240830"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  tags = ["web"]
}

###########  Microservices   #############
resource "google_compute_instance" "microservices" {
  
  count = 3
  name = ["insurance", "loan", "transaction"][count.index]

  machine_type = var.GCP_MACHINE_TYPE
  zone         = var.GCP_ZONE

  boot_disk {
    initialize_params {
      image = "ubuntu-2004-focal-v20240830"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  tags = ["microservices"]
}

resource "google_compute_instance" "mongodb_instance" {
  name         = "mongodb-instance"
  machine_type = var.GCP_MACHINE_TYPE 
  zone         = var.GCP_ZONE

  boot_disk {
    initialize_params {
      image = "ubuntu-2004-focal-v20240830"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  tags = ["mongodb"]
}

###########  Monitor   #############
resource "google_compute_instance" "monitor" {
  
  name = "monitor"

  machine_type = var.GCP_MACHINE_TYPE
  zone         = var.GCP_ZONE

  boot_disk {
    initialize_params {
      image = "ubuntu-2004-focal-v20240830"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }

  metadata = {
    ssh-keys = "ubuntu:${file("/home/vagrant/.ssh/id_rsa.pub")}"
  }

  tags = ["monitor"]
}

