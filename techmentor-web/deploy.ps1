$BUCKET_NAME = "techmentor-web"
$REGION = "ap-south-1"

Write-Host "Building React app..."
npm run build

Write-Host "Removing old files from S3..."
aws s3 rm "s3://$BUCKET_NAME" --recursive

Write-Host "Uploading new files..."
aws s3 sync "build/" "s3://$BUCKET_NAME" --delete

Write-Host "Deployment complete!"
Write-Host "Site URL: http://$BUCKET_NAME.s3-website.$REGION.amazonaws.com"
