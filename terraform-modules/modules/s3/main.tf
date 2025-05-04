
resource "aws_s3_bucket" "bucket" {
  bucket = "terraform-project-DEPI"

  force_destroy = true

  tags = {
    Name        = "terraform-project-DEPI"
    Environment = var.Environment
    Owner       = var.Owner
  }
}
