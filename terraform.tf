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

terraform {
  backend "s3" {
    bucket  = "crossplayable.games-terraform-state"
    key     = "terraform/terraform.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

module "website" {
  source      = "./deploy/site"
  domain_name = var.domain_name
}
