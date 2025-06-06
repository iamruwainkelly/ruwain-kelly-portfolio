<template>
  <div class="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50" @click="$emit('close')">
    <div class="bg-dark-surface border border-dark-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <!-- Header -->
      <div class="flex justify-between items-center p-6 border-b border-dark-border">
        <div>
          <h2 class="text-2xl font-bold text-white">{{ order.id }}</h2>
          <p class="text-gray-400">Order Details & Tracking</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Status Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <StatusBadge :status="order.status" class="mb-2" />
            <p class="text-2xl font-bold text-white">{{ order.progress }}%</p>
            <p class="text-sm text-gray-400">Complete</p>
          </div>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <RiskScore :score="order.riskScore" class="justify-center mb-2" />
            <p class="text-sm text-gray-400">Risk Assessment</p>
          </div>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4 text-center">
            <PriorityBadge :priority="order.priority" class="mb-2" />
            <p class="text-sm text-gray-400">Priority Level</p>
          </div>
        </div>

        <!-- Order Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Order Information</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Order ID</span>
                <span class="text-white font-medium">{{ order.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Customer</span>
                <span class="text-white font-medium">{{ order.customer || 'Global Logistics Inc.' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Weight</span>
                <span class="text-white font-medium">{{ order.weight || '245 kg' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Value</span>
                <span class="text-white font-medium">{{ order.value || '€12,500' }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-white mb-3">Shipping Details</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-400">Carrier</span>
                <span class="text-white font-medium">{{ order.carrier }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Destination</span>
                <span class="text-white font-medium">{{ order.destination }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">ETA</span>
                <span class="text-white font-medium">{{ new Date(order.eta).toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Last Update</span>
                <span class="text-white font-medium">{{ order.lastUpdate }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Route Tracking -->
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Route Progress</h3>
          <div class="bg-dark-bg border border-dark-border rounded-lg p-4">
            <div class="space-y-4">
              <RouteStep 
                v-for="(step, index) in routeSteps" 
                :key="index"
                :step="step"
                :isActive="index <= currentStep"
                :isCurrent="index === currentStep"
              />
            </div>
          </div>
        </div>

        <!-- Alerts & Issues -->
        <div v-if="order.alerts && order.alerts.length > 0">
          <h3 class="text-lg font-semibold text-white mb-3">Active Alerts</h3>
          <div class="space-y-2">
            <div v-for="alert in order.alerts" :key="alert" 
                 class="flex items-center p-3 rounded-lg"
                 :class="getAlertBgClass(alert)">
              <span class="text-lg mr-3">{{ getAlertIcon(alert) }}</span>
              <div>
                <p class="font-medium">{{ getAlertTitle(alert) }}</p>
                <p class="text-sm opacity-80">{{ getAlertDescription(alert) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 pt-4 border-t border-dark-border">
          <button class="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 opacity-50 cursor-not-allowed">
            Update Status (Demo)
          </button>
          <button class="px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-orange-500 transition-all duration-300 opacity-50 cursor-not-allowed">
            Contact Carrier (Demo)
          </button>
          <button @click="generatePDFReport" class="px-4 py-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Generate PDF Report
          </button>
          <button @click="exportCSV" class="px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg hover:border-orange-500 transition-all duration-300 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'
import RiskScore from './RiskScore.vue'
import RouteStep from './RouteStep.vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])

const routeSteps = [
  { name: 'Order Placed', location: 'Origin Warehouse', completed: true },
  { name: 'Picked Up', location: 'Distribution Center', completed: true },
  { name: 'In Transit', location: props.order.currentLocation, completed: true },
  { name: 'Out for Delivery', location: 'Local Hub', completed: false },
  { name: 'Delivered', location: props.order.destination, completed: false }
]

const currentStep = computed(() => {
  return Math.floor((props.order.progress / 100) * (routeSteps.length - 1))
})

function getAlertBgClass(alert) {
  const classes = {
    'weather': 'bg-blue-500/20 text-blue-400',
    'traffic': 'bg-yellow-500/20 text-yellow-400',
    'delay': 'bg-red-500/20 text-red-400',
    'route': 'bg-purple-500/20 text-purple-400'
  }
  return classes[alert] || 'bg-gray-500/20 text-gray-400'
}

function getAlertIcon(alert) {
  const icons = {
    'weather': '🌧️',
    'traffic': '🚧',
    'delay': '⏰',
    'route': '🗺️'
  }
  return icons[alert] || '⚠️'
}

function getAlertTitle(alert) {
  const titles = {
    'weather': 'Weather Delay',
    'traffic': 'Traffic Congestion',
    'delay': 'Schedule Delay',
    'route': 'Route Change'
  }
  return titles[alert] || 'Alert'
}

function getAlertDescription(alert) {
  const descriptions = {
    'weather': 'Heavy rain affecting delivery schedule',
    'traffic': 'Unexpected traffic causing minor delays',
    'delay': 'Carrier experiencing operational delays',
    'route': 'Route optimized for faster delivery'
  }
  return descriptions[alert] || 'Alert description'
}

function generateReport() {
  // Generate comprehensive delivery report
  const reportData = {
    orderId: props.order.id,
    customer: props.order.customer,
    destination: props.order.destination,
    origin: props.order.origin,
    carrier: props.order.carrier,
    status: props.order.status,
    progress: props.order.progress,
    priority: props.order.priority,
    value: props.order.value || '€12,500',
    estimatedDelivery: props.order.estimatedDelivery,
    currentLocation: props.order.currentLocation,
    riskScore: props.order.riskScore,
    alerts: props.order.alerts || [],
    route: routeSteps,
    currentStep: currentStep.value,
    generatedAt: new Date().toISOString(),
    reportType: 'Delivery Status Report'
  }

  // Create and download the report
  const reportContent = generateReportContent(reportData)
  downloadReport(reportContent, `Order_${props.order.id}_Report_${new Date().toISOString().split('T')[0]}.txt`)
}

function generatePDFReport() {
  // Generate comprehensive delivery report data
  const reportData = {
    orderId: props.order.id,
    customer: props.order.customer || 'Global Logistics Inc.',
    destination: props.order.destination,
    origin: props.order.origin || 'Distribution Center',
    carrier: props.order.carrier,
    status: props.order.status,
    progress: props.order.progress,
    priority: props.order.priority,
    value: props.order.value || '€12,500',
    estimatedDelivery: props.order.estimatedDelivery || props.order.eta,
    currentLocation: props.order.currentLocation,
    riskScore: props.order.riskScore,
    alerts: props.order.alerts || [],
    route: routeSteps,
    currentStep: currentStep.value,
    generatedAt: new Date().toISOString(),
    reportType: 'Delivery Status Report'
  }

  // Create HTML content for PDF
  const htmlContent = generatePDFContent(reportData)
  
  // Create a blob with the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = window.URL.createObjectURL(blob)
  
  // Create a link to download the HTML file
  const link = document.createElement('a')
  link.href = url
  link.download = `Order_${reportData.orderId}_Report_${new Date().toISOString().split('T')[0]}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  // Also open in new window for immediate viewing/printing
  const printWindow = window.open('', '_blank')
  printWindow.document.write(htmlContent)
  printWindow.document.close()
  
  // Show success notification
  alert(`📄 PDF Report Generated!

Demo feature: In production, this would generate a comprehensive logistics report with all order data, carrier metrics, and risk analysis.

File downloaded: Order_${reportData.orderId}_Report_${new Date().toISOString().split('T')[0]}.html

The report includes:
• Complete order and delivery details
• Visual progress tracking  
• Risk assessment and alerts
• Professional formatting

To save as PDF: Use browser's Print function (Ctrl/Cmd+P) and select "Save as PDF"`)
}

function exportCSV() {
  const csvData = generateCSVContent()
  const blob = new Blob([csvData], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `Order_${props.order.id}_Data_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  alert(`📊 CSV Export Completed!

Demo feature: In production, this would export comprehensive logistics data for analysis.

File: Order_${props.order.id}_Data_${new Date().toISOString().split('T')[0]}.csv

Includes:
• Order information
• Route tracking data
• Performance metrics
• Alert details

Perfect for spreadsheet analysis!`)
}

function generateReportContent(data) {
  return `
SUPPLY CHAIN MANAGEMENT - DELIVERY STATUS REPORT
==============================================

Report Generated: ${new Date(data.generatedAt).toLocaleString('de-DE')}
Report Type: ${data.reportType}

ORDER INFORMATION
================
Order ID: ${data.orderId}
Customer: ${data.customer}
Order Value: ${data.value}
Priority: ${data.priority}
Status: ${data.status}

DELIVERY DETAILS
===============
Origin: ${data.origin}
Destination: ${data.destination}
Current Location: ${data.currentLocation}
Progress: ${data.progress}%
Estimated Delivery: ${data.estimatedDelivery}
Carrier: ${data.carrier}

ROUTE TRACKING
=============
${data.route.map((step, index) => 
  `${index + 1}. ${step.name} - ${step.location} ${step.completed ? '✓ COMPLETED' : '○ PENDING'}`
).join('\n')}

Current Step: ${data.currentStep + 1}/${data.route.length}

RISK ASSESSMENT
==============
Risk Score: ${data.riskScore}/100
${data.riskScore < 30 ? 'Risk Level: LOW - Delivery on track' : 
  data.riskScore < 70 ? 'Risk Level: MEDIUM - Monitor delivery' : 
  'Risk Level: HIGH - Immediate attention required'}

ACTIVE ALERTS
============
${data.alerts.length > 0 ? 
  data.alerts.map(alert => `• ${getAlertTitle(alert)}: ${getAlertDescription(alert)}`).join('\n') :
  'No active alerts for this delivery'}

PERFORMANCE METRICS
==================
Delivery Progress: ${data.progress}%
On-Time Performance: ${data.riskScore > 70 ? 'At Risk' : 'On Track'}
Customer Impact: ${data.priority === 'High' ? 'Critical' : data.priority === 'Medium' ? 'Important' : 'Standard'}

RECOMMENDATIONS
==============
${data.riskScore > 70 ? 
  '• Immediate carrier contact recommended\n• Consider alternative routing\n• Notify customer of potential delays' :
  data.riskScore > 30 ?
  '• Continue monitoring delivery progress\n• Prepare contingency plans if needed' :
  '• Delivery proceeding as planned\n• No immediate action required'}

===================================================
This report was generated automatically by the SCM Order Tracker
For questions, contact: logistics@company.com
===================================================
`
}

function downloadReport(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
  
  // Show success notification
  console.log(`Report generated successfully: ${filename}`)
  alert(`Delivery report generated and downloaded successfully!\n\nFile: ${filename}\n\nThe report includes:\n• Order details and tracking information\n• Route progress and current status\n• Risk assessment and alerts\n• Performance metrics and recommendations`)
}

function generatePDFContent(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>SCM Delivery Report - ${data.orderId}</title>
      <style>
        @media print {
          body { margin: 0; }
          .no-print { display: none; }
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          border-bottom: 3px solid #f97316;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #f97316;
          margin-bottom: 10px;
        }
        .report-title {
          font-size: 20px;
          color: #1f2937;
          margin: 0;
        }
        .report-meta {
          color: #6b7280;
          font-size: 14px;
        }
        .section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 15px;
          border-bottom: 2px solid #f3f4f6;
          padding-bottom: 5px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .info-label {
          font-weight: 600;
          color: #6b7280;
        }
        .info-value {
          color: #1f2937;
        }
        .progress-bar {
          width: 100%;
          height: 20px;
          background-color: #f3f4f6;
          border-radius: 10px;
          overflow: hidden;
          margin: 10px 0;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f97316, #a855f7);
          transition: width 0.3s ease;
        }
        .route-step {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        .route-step:last-child {
          border-bottom: none;
        }
        .route-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 12px;
        }
        .route-completed {
          background-color: #10b981;
          color: white;
        }
        .route-pending {
          background-color: #e5e7eb;
          color: #6b7280;
        }
        .route-current {
          background-color: #f97316;
          color: white;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .status-on-track {
          background-color: #d1fae5;
          color: #065f46;
        }
        .status-at-risk {
          background-color: #fef3c7;
          color: #92400e;
        }
        .status-delayed {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .alert-item {
          padding: 12px;
          margin: 8px 0;
          border-radius: 6px;
          border-left: 4px solid;
        }
        .alert-weather {
          background-color: #dbeafe;
          border-color: #3b82f6;
        }
        .alert-traffic {
          background-color: #fef3c7;
          border-color: #f59e0b;
        }
        .alert-delay {
          background-color: #fee2e2;
          border-color: #ef4444;
        }
        .risk-score {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          padding: 20px;
          border-radius: 8px;
        }
        .risk-low {
          background-color: #d1fae5;
          color: #065f46;
        }
        .risk-medium {
          background-color: #fef3c7;
          color: #92400e;
        }
        .risk-high {
          background-color: #fee2e2;
          color: #991b1b;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">📦 SCM Order Tracker</div>
        <h1 class="report-title">Delivery Status Report</h1>
        <div class="report-meta">
          Generated: ${new Date(data.generatedAt).toLocaleString('de-DE')} | Order: ${data.orderId}
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">📋 Order Overview</h2>
        <div class="info-grid">
          <div>
            <div class="info-item">
              <span class="info-label">Order ID:</span>
              <span class="info-value">${data.orderId}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Customer:</span>
              <span class="info-value">${data.customer}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Value:</span>
              <span class="info-value">${data.value}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Priority:</span>
              <span class="info-value">${data.priority}</span>
            </div>
          </div>
          <div>
            <div class="info-item">
              <span class="info-label">Status:</span>
              <span class="info-value">
                <span class="status-badge ${getStatusClass(data.status)}">${data.status}</span>
              </span>
            </div>
            <div class="info-item">
              <span class="info-label">Carrier:</span>
              <span class="info-value">${data.carrier}</span>
            </div>
            <div class="info-item">
              <span class="info-label">ETA:</span>
              <span class="info-value">${data.estimatedDelivery}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Progress:</span>
              <span class="info-value">${data.progress}%</span>
            </div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${data.progress}%"></div>
        </div>
      </div>

      <div class="section">
        <h2 class="section-title">🚚 Route Tracking</h2>
        ${data.route.map((step, index) => `
          <div class="route-step">
            <div class="route-icon ${step.completed ? 'route-completed' : index === data.currentStep ? 'route-current' : 'route-pending'}">
              ${step.completed ? '✓' : index === data.currentStep ? '○' : '○'}
            </div>
            <div>
              <strong>${step.name}</strong><br>
              <span style="color: #6b7280;">${step.location}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2 class="section-title">⚠️ Risk Assessment</h2>
        <div class="risk-score ${getRiskClass(data.riskScore)}">
          Risk Score: ${data.riskScore}/100
        </div>
        <p style="margin-top: 15px;">
          <strong>Risk Level:</strong> 
          ${data.riskScore < 30 ? 'LOW - Delivery on track' : 
            data.riskScore < 70 ? 'MEDIUM - Monitor delivery' : 
            'HIGH - Immediate attention required'}
        </p>
      </div>

      ${data.alerts.length > 0 ? `
      <div class="section">
        <h2 class="section-title">🚨 Active Alerts</h2>
        ${data.alerts.map(alert => `
          <div class="alert-item alert-${alert}">
            <strong>${getAlertTitle(alert)}:</strong> ${getAlertDescription(alert)}
          </div>
        `).join('')}
      </div>
      ` : ''}

      <div class="section">
        <h2 class="section-title">📊 Performance Summary</h2>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Delivery Progress:</span>
            <span class="info-value">${data.progress}%</span>
          </div>
          <div class="info-item">
            <span class="info-label">On-Time Performance:</span>
            <span class="info-value">${data.riskScore > 70 ? 'At Risk' : 'On Track'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Customer Impact:</span>
            <span class="info-value">${data.priority === 'High' ? 'Critical' : data.priority === 'Medium' ? 'Important' : 'Standard'}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Current Location:</span>
            <span class="info-value">${data.currentLocation}</span>
          </div>
        </div>
      </div>

      <div class="footer">
        <p>This report was generated automatically by the SCM Order Tracker</p>
        <p>For questions, contact: logistics@company.com</p>
      </div>
    </body>
    </html>
  `
}

function getStatusClass(status) {
  const classes = {
    'On Track': 'status-on-track',
    'At Risk': 'status-at-risk',
    'Delayed': 'status-delayed'
  }
  return classes[status] || 'status-on-track'
}

function getRiskClass(score) {
  if (score < 30) return 'risk-low'
  if (score < 70) return 'risk-medium'
  return 'risk-high'
}

function generateCSVContent() {
  const order = props.order
  const csvHeaders = [
    'Order ID',
    'Customer',
    'Status',
    'Progress (%)',
    'Priority',
    'Value',
    'Carrier',
    'Origin',
    'Destination',
    'Current Location',
    'Risk Score',
    'ETA',
    'Active Alerts',
    'Route Step',
    'Report Generated'
  ]
  
  const csvData = [
    order.id || '',
    order.customer || 'Global Logistics Inc.',
    order.status || '',
    order.progress || '',
    order.priority || '',
    order.value || '€12,500',
    order.carrier || '',
    order.origin || 'Distribution Center',
    order.destination || '',
    order.currentLocation || '',
    order.riskScore || '',
    order.estimatedDelivery || order.eta || '',
    (order.alerts || []).join('; '),
    `${currentStep.value + 1}/${routeSteps.length}`,
    new Date().toISOString()
  ]
  
  // Create CSV content
  const csvContent = [
    csvHeaders.join(','),
    csvData.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
  ].join('\n')
  
  return csvContent
}
</script>
