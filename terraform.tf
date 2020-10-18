variable "aws_region" {
  type = string
}

variable "domain_name" {
  type = string
}

variable "redirected_domain_names" {
  type = set(string)
}

provider "aws" {
  region = var.aws_region
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

module "redirect" {
  for_each                = var.redirected_domain_names
  source                  = "./deploy/redirect"
  domain_name             = each.key
  redirect_to_domain_name = var.domain_name
}
