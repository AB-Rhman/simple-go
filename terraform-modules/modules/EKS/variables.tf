variable "cluster_name" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "public_subnet_ids" {
  type = list(string)
}

variable "Environment" {
  type = string
}

variable "Owner" {
  type = string
}
