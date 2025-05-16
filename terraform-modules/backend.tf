terraform {
  cloud {
    organization = "DEPIII"
    workspaces {
      name = "EKS"
    }
  }
}