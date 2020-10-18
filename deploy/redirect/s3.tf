resource "aws_s3_bucket" "website_bucket" {
  bucket = var.domain_name
  acl    = "public-read"
  website {
    redirect_all_requests_to = var.redirect_to_domain_name
  }
}
