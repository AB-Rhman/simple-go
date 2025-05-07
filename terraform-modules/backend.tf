terraform {
  backend "s3" {
    bucket = "terraform-project-DEPI"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}