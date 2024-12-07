variable "GCP_PROJECT_ID" {
    default = "agisit-2425-g46"
}

# https://cloud.google.com/compute/docs/machine-types
variable "GCP_MACHINE_TYPE" {
    default = "n1-standard-1"
}

# https://cloud.google.com/compute/docs/regions-zones/regions-zones?hl=en_US
# Compute Engine dashboard -> VM instances -> Zone
variable "GCP_ZONE" {
    default = "europe-central2-a"
}

variable "GCP_ZONE_2" { # TODO maquinas replicadas usar esta zona
    default = "europe-central2-a"
}

variable "DISK_SIZE" {
    default = "15"
}