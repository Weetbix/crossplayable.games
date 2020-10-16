variable "aws_region" {
  type = string
}

variable "domain_name" {
  type = string
}

provider "aws" {
  region  = var.aws_region
  version = "~> 2.52"
}

module "website" {
  source      = "./deploy"
  domain_name = var.domain_name
}
