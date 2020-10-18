resource "aws_s3_bucket" "website_bucket" {
  bucket = var.domain_name
  acl    = "private"
  policy = data.aws_iam_policy_document.website_policy.json

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true
    noncurrent_version_expiration {
      days = 30
    }
  }
}
