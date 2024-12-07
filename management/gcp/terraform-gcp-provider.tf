provider "google" {
    credentials = file("agisit-2425-g46-65cf0d4c1c2c.json")
    project = var.GCP_PROJECT_ID
    zone = var.GCP_ZONE
}
