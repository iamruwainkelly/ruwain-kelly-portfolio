# AWS Integration Setup Guide

## Overview
The AWS Serverless Dashboard can connect to your real AWS account to display live metrics from Lambda, API Gateway, DynamoDB, and other services.

## Setup Instructions

### 1. Create AWS IAM User (Recommended)
1. Go to AWS IAM Console
2. Create a new user for dashboard access
3. Attach the following minimal policies:
   - `CloudWatchReadOnlyAccess`
   - `AWSLambda_ReadOnlyAccess` 
   - `APIGatewayServiceRolePolicy`
   - `AmazonDynamoDBReadOnlyAccess`
   - `CostExplorerServiceRolePolicy`

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your AWS credentials to `.env.local`:
   ```bash
   VITE_AWS_ACCESS_KEY_ID=your_access_key_here
   VITE_AWS_SECRET_ACCESS_KEY=your_secret_key_here
   VITE_AWS_REGION=us-east-1
   ```

### 3. Test Connection
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the AWS Serverless Dashboard
3. Click "Configure AWS" in the demo banner
4. Click "Test Connection" to verify your setup

### 4. Enable Live Mode
Once the connection test passes, you can click "Enable Live Mode" to see real AWS data.

## Security Best Practices

⚠️ **Important Security Notes:**
- Never commit `.env.local` to version control
- Use IAM roles instead of access keys in production
- Regularly rotate access keys
- Follow the principle of least privilege

## Troubleshooting

### Common Issues:
1. **Access Denied**: Check IAM permissions
2. **Invalid Credentials**: Verify access key and secret
3. **Region Issues**: Ensure region is correct and services exist
4. **Cost Explorer Access**: Must be enabled in AWS Console first

### Debug Mode:
Set `VITE_AWS_DEBUG_MODE=true` in your `.env.local` to see detailed logs.

## Supported AWS Services
- AWS Lambda (functions, invocations, duration, errors)
- API Gateway (requests, latency, errors)
- DynamoDB (tables, items, storage)
- CloudWatch (metrics, alarms)
- Cost Explorer (billing, service costs)

## Demo Mode
The dashboard works perfectly without AWS credentials using realistic mock data. Live integration is optional but provides real insights into your AWS infrastructure.
