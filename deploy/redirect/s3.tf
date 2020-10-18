resource "aws_s3_bucket" "website_bucket" {
  bucket = var.domain_name
  acl    = "private"
  policy = data.aws_iam_policy_document.website_policy.json
  website {
    redirect_all_requests_to = var.redirect_to_domain_name
  }
}
