// AWS Service Integration Layer
// Provides real AWS data integration for the Serverless Dashboard

import {
  CloudWatchClient,
  GetMetricStatisticsCommand,
  DescribeAlarmsCommand
} from '@aws-sdk/client-cloudwatch'

import {
  LambdaClient,
  ListFunctionsCommand,
  GetFunctionCommand
} from '@aws-sdk/client-lambda'

import {
  APIGatewayClient,
  GetRestApisCommand,
  GetUsageCommand
} from '@aws-sdk/client-api-gateway'

import {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand
} from '@aws-sdk/client-dynamodb'

import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetDimensionValuesCommand
} from '@aws-sdk/client-cost-explorer'

class AWSService {
  constructor() {
    this.isConfigured = false
    this.clients = {}
    this.region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
    
    // Initialize clients if credentials are available
    this.initializeClients()
  }

  initializeClients() {
    try {
      const config = {
        region: this.region,
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        }
      }

      // Only initialize if credentials are provided
      if (config.credentials.accessKeyId && config.credentials.secretAccessKey) {
        this.clients = {
          cloudwatch: new CloudWatchClient(config),
          lambda: new LambdaClient(config),
          apigateway: new APIGatewayClient(config),
          dynamodb: new DynamoDBClient(config),
          costexplorer: new CostExplorerClient({ ...config, region: 'us-east-1' }) // Cost Explorer only in us-east-1
        }
        this.isConfigured = true
        console.log('✅ AWS clients initialized successfully')
      } else {
        console.log('⚠️ AWS credentials not configured - using demo mode')
      }
    } catch (error) {
      console.error('❌ Failed to initialize AWS clients:', error.message)
      this.isConfigured = false
    }
  }

  // Check if AWS integration is available
  isLive() {
    return this.isConfigured
  }

  // Get Lambda function metrics
  async getLambdaMetrics(timeRange = '24h') {
    if (!this.isConfigured) {
      throw new Error('AWS not configured')
    }

    try {
      // Get list of Lambda functions
      const listCommand = new ListFunctionsCommand({})
      const functions = await this.clients.lambda.send(listCommand)

      // Get CloudWatch metrics for Lambda
      const endTime = new Date()
      const startTime = new Date()
      
      switch (timeRange) {
        case '24h':
          startTime.setHours(startTime.getHours() - 24)
          break
        case '7d':
          startTime.setDate(startTime.getDate() - 7)
          break
        case '30d':
          startTime.setDate(startTime.getDate() - 30)
          break
      }

      // Get invocation metrics
      const invocationCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/Lambda',
        MetricName: 'Invocations',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600, // 1 hour
        Statistics: ['Sum']
      })

      const invocations = await this.clients.cloudwatch.send(invocationCommand)

      // Get duration metrics
      const durationCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/Lambda',
        MetricName: 'Duration',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: ['Average']
      })

      const duration = await this.clients.cloudwatch.send(durationCommand)

      // Get error metrics
      const errorCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/Lambda',
        MetricName: 'Errors',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: ['Sum']
      })

      const errors = await this.clients.cloudwatch.send(errorCommand)

      return {
        functions: functions.Functions?.length || 0,
        invocations: invocations.Datapoints?.reduce((sum, point) => sum + (point.Sum || 0), 0) || 0,
        avgDuration: invocations.Datapoints?.length > 0 
          ? duration.Datapoints?.reduce((sum, point) => sum + (point.Average || 0), 0) / duration.Datapoints.length 
          : 0,
        errorRate: invocations.Datapoints?.length > 0 
          ? (errors.Datapoints?.reduce((sum, point) => sum + (point.Sum || 0), 0) / invocations.Datapoints?.reduce((sum, point) => sum + (point.Sum || 0), 0)) * 100
          : 0
      }
    } catch (error) {
      console.error('Error fetching Lambda metrics:', error)
      throw error
    }
  }

  // Get API Gateway metrics
  async getAPIGatewayMetrics(timeRange = '24h') {
    if (!this.isConfigured) {
      throw new Error('AWS not configured')
    }

    try {
      // Get list of APIs
      const apisCommand = new GetRestApisCommand({})
      const apis = await this.clients.apigateway.send(apisCommand)

      const endTime = new Date()
      const startTime = new Date()
      
      switch (timeRange) {
        case '24h':
          startTime.setHours(startTime.getHours() - 24)
          break
        case '7d':
          startTime.setDate(startTime.getDate() - 7)
          break
        case '30d':
          startTime.setDate(startTime.getDate() - 30)
          break
      }

      // Get request count metrics
      const requestCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/ApiGateway',
        MetricName: 'Count',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: ['Sum']
      })

      const requests = await this.clients.cloudwatch.send(requestCommand)

      // Get latency metrics
      const latencyCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/ApiGateway',
        MetricName: 'Latency',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: ['Average']
      })

      const latency = await this.clients.cloudwatch.send(latencyCommand)

      // Get 4xx error metrics
      const errorCommand = new GetMetricStatisticsCommand({
        Namespace: 'AWS/ApiGateway',
        MetricName: '4XXError',
        StartTime: startTime,
        EndTime: endTime,
        Period: 3600,
        Statistics: ['Sum']
      })

      const errors = await this.clients.cloudwatch.send(errorCommand)

      const totalRequests = requests.Datapoints?.reduce((sum, point) => sum + (point.Sum || 0), 0) || 0
      const totalErrors = errors.Datapoints?.reduce((sum, point) => sum + (point.Sum || 0), 0) || 0

      return {
        totalRequests,
        avgLatency: latency.Datapoints?.length > 0 
          ? latency.Datapoints.reduce((sum, point) => sum + (point.Average || 0), 0) / latency.Datapoints.length 
          : 0,
        errorRate: totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0
      }
    } catch (error) {
      console.error('Error fetching API Gateway metrics:', error)
      throw error
    }
  }

  // Get DynamoDB metrics
  async getDynamoDBMetrics() {
    if (!this.isConfigured) {
      throw new Error('AWS not configured')
    }

    try {
      // Get list of tables
      const tablesCommand = new ListTablesCommand({})
      const tables = await this.clients.dynamodb.send(tablesCommand)

      let totalItems = 0
      let totalSize = 0

      // Get details for each table
      for (const tableName of tables.TableNames || []) {
        try {
          const describeCommand = new DescribeTableCommand({ TableName: tableName })
          const tableInfo = await this.clients.dynamodb.send(describeCommand)
          
          totalItems += tableInfo.Table?.ItemCount || 0
          totalSize += tableInfo.Table?.TableSizeBytes || 0
        } catch (error) {
          console.warn(`Could not describe table ${tableName}:`, error.message)
        }
      }

      return {
        tableCount: tables.TableNames?.length || 0,
        totalItems,
        totalSize: (totalSize / (1024 * 1024 * 1024)).toFixed(2) // Convert to GB
      }
    } catch (error) {
      console.error('Error fetching DynamoDB metrics:', error)
      throw error
    }
  }

  // Get cost metrics
  async getCostMetrics(timeRange = '7d') {
    if (!this.isConfigured) {
      throw new Error('AWS not configured')
    }

    try {
      const endDate = new Date().toISOString().split('T')[0]
      const startDate = new Date()
      
      switch (timeRange) {
        case '24h':
        case '7d':
          startDate.setDate(startDate.getDate() - 7)
          break
        case '30d':
          startDate.setDate(startDate.getDate() - 30)
          break
      }

      const costCommand = new GetCostAndUsageCommand({
        TimePeriod: {
          Start: startDate.toISOString().split('T')[0],
          End: endDate
        },
        Granularity: 'DAILY',
        Metrics: ['BlendedCost'],
        GroupBy: [
          {
            Type: 'DIMENSION',
            Key: 'SERVICE'
          }
        ]
      })

      const costs = await this.clients.costexplorer.send(costCommand)

      // Process cost data
      const serviceCosts = {}
      let totalCost = 0

      costs.ResultsByTime?.forEach(result => {
        result.Groups?.forEach(group => {
          const service = group.Keys?.[0] || 'Unknown'
          const cost = parseFloat(group.Metrics?.BlendedCost?.Amount || '0')
          
          if (!serviceCosts[service]) {
            serviceCosts[service] = 0
          }
          serviceCosts[service] += cost
          totalCost += cost
        })
      })

      return {
        totalCost: totalCost.toFixed(2),
        serviceCosts,
        currency: costs.ResultsByTime?.[0]?.Groups?.[0]?.Metrics?.BlendedCost?.Unit || 'USD'
      }
    } catch (error) {
      console.error('Error fetching cost metrics:', error)
      throw error
    }
  }

  // Get service health status
  async getServiceHealth() {
    if (!this.isConfigured) {
      throw new Error('AWS not configured')
    }

    try {
      // Get CloudWatch alarms
      const alarmsCommand = new DescribeAlarmsCommand({
        StateValue: 'ALARM',
        MaxRecords: 100
      })

      const alarms = await this.clients.cloudwatch.send(alarmsCommand)
      
      // Basic service health based on alarms
      const services = ['Lambda', 'API Gateway', 'DynamoDB', 'S3', 'CloudWatch']
      const serviceHealth = services.map(service => {
        const serviceAlarms = alarms.MetricAlarms?.filter(alarm => 
          alarm.AlarmName?.toLowerCase().includes(service.toLowerCase())
        ) || []

        return {
          name: service,
          status: serviceAlarms.length > 0 ? 'warning' : 'healthy',
          alarmCount: serviceAlarms.length
        }
      })

      return serviceHealth
    } catch (error) {
      console.error('Error fetching service health:', error)
      throw error
    }
  }

  // Test AWS connection
  async testConnection() {
    if (!this.isConfigured) {
      return { success: false, message: 'AWS credentials not configured' }
    }

    try {
      // Simple test - list Lambda functions
      const command = new ListFunctionsCommand({ MaxItems: 1 })
      await this.clients.lambda.send(command)
      
      return { 
        success: true, 
        message: 'AWS connection successful',
        region: this.region
      }
    } catch (error) {
      return { 
        success: false, 
        message: `AWS connection failed: ${error.message}`,
        error: error.name
      }
    }
  }
}

// Export singleton instance
export const awsService = new AWSService()
export default awsService
