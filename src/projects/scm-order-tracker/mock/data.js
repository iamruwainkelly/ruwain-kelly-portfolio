// Mock data for Supply Chain Order Tracker

export const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Global Electronics Inc.',
    destination: 'New York, NY',
    carrier: 'DHL Express',
    status: 'on_track',
    priority: 'high',
    progress: 75,
    riskScore: 2.1,
    eta: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    currentLocation: 'Philadelphia Hub',
    lastUpdate: '2 min ago',
    weight: '245 kg',
    value: '12,500',
    alerts: []
  },
  {
    id: 'ORD-2024-002',
    customer: 'Tech Solutions Ltd.',
    destination: 'Los Angeles, CA',
    carrier: 'FedEx Ground',
    status: 'at_risk',
    priority: 'medium',
    progress: 45,
    riskScore: 6.8,
    eta: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Denver, CO',
    lastUpdate: '15 min ago',
    weight: '180 kg',
    value: '8,750',
    alerts: ['weather', 'traffic']
  },
  {
    id: 'ORD-2024-003',
    customer: 'Manufacturing Corp.',
    destination: 'Chicago, IL',
    carrier: 'UPS Standard',
    status: 'delayed',
    priority: 'high',
    progress: 30,
    riskScore: 8.5,
    eta: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours overdue
    currentLocation: 'Kansas City, MO',
    lastUpdate: '45 min ago',
    weight: '320 kg',
    value: '15,200',
    alerts: ['delay', 'route']
  },
  {
    id: 'ORD-2024-004',
    customer: 'Retail Chain Co.',
    destination: 'Miami, FL',
    carrier: 'DHL Express',
    status: 'on_track',
    priority: 'low',
    progress: 90,
    riskScore: 1.2,
    eta: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Jacksonville, FL',
    lastUpdate: '5 min ago',
    weight: '95 kg',
    value: '4,200',
    alerts: []
  },
  {
    id: 'ORD-2024-005',
    customer: 'Healthcare Systems',
    destination: 'Seattle, WA',
    carrier: 'Local Express',
    status: 'at_risk',
    priority: 'high',
    progress: 60,
    riskScore: 5.9,
    eta: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Portland, OR',
    lastUpdate: '8 min ago',
    weight: '67 kg',
    value: '22,800',
    alerts: ['weather']
  },
  {
    id: 'ORD-2024-006',
    customer: 'Automotive Parts Inc.',
    destination: 'Detroit, MI',
    carrier: 'FedEx Express',
    status: 'on_track',
    priority: 'medium',
    progress: 85,
    riskScore: 2.7,
    eta: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Toledo, OH',
    lastUpdate: '12 min ago',
    weight: '410 kg',
    value: '18,900',
    alerts: []
  },
  {
    id: 'ORD-2024-007',
    customer: 'Fashion Brands LLC',
    destination: 'Atlanta, GA',
    carrier: 'UPS Next Day',
    status: 'delayed',
    priority: 'medium',
    progress: 25,
    riskScore: 7.3,
    eta: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Birmingham, AL',
    lastUpdate: '1 hr ago',
    weight: '125 kg',
    value: '6,400',
    alerts: ['traffic', 'delay']
  },
  {
    id: 'ORD-2024-008',
    customer: 'Food Distribution Co.',
    destination: 'Phoenix, AZ',
    carrier: 'Local Freight',
    status: 'on_track',
    priority: 'high',
    progress: 70,
    riskScore: 3.1,
    eta: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Albuquerque, NM',
    lastUpdate: '3 min ago',
    weight: '580 kg',
    value: '9,650',
    alerts: []
  },
  {
    id: 'ORD-2024-009',
    customer: 'Construction Materials Ltd.',
    destination: 'Houston, TX',
    carrier: 'Heavy Haul Express',
    status: 'at_risk',
    priority: 'low',
    progress: 40,
    riskScore: 6.2,
    eta: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Dallas, TX',
    lastUpdate: '25 min ago',
    weight: '1,250 kg',
    value: '32,100',
    alerts: ['route']
  }
]

export const mockCarriers = [
  {
    id: 'dhl-express',
    name: 'DHL Express',
    type: 'Express Delivery',
    onTimeRate: 96,
    activeOrders: 47,
    avgDeliveryTime: '2.3 days',
    costPerMile: 2.45,
    performanceScore: 96,
    status: 'active',
    lastUpdate: '2 min ago'
  },
  {
    id: 'fedex-ground',
    name: 'FedEx Ground',
    type: 'Ground Service',
    onTimeRate: 94,
    activeOrders: 62,
    avgDeliveryTime: '3.1 days',
    costPerMile: 1.89,
    performanceScore: 94,
    status: 'active',
    lastUpdate: '1 min ago'
  },
  {
    id: 'ups-standard',
    name: 'UPS Standard',
    type: 'Standard Delivery',
    onTimeRate: 92,
    activeOrders: 38,
    avgDeliveryTime: '2.8 days',
    costPerMile: 2.12,
    performanceScore: 92,
    status: 'active',
    lastUpdate: '5 min ago'
  },
  {
    id: 'local-carriers',
    name: 'Local Express',
    type: 'Regional Service',
    onTimeRate: 87,
    activeOrders: 23,
    avgDeliveryTime: '1.9 days',
    costPerMile: 3.25,
    performanceScore: 87,
    status: 'active',
    lastUpdate: '8 min ago'
  }
]

export const mockActivities = [
  {
    id: 1,
    type: 'status_change',
    orderId: 'ORD-2024-001',
    message: 'Order ORD-2024-001 departed from Philadelphia Hub',
    timestamp: '14:23:45',
    severity: 'low'
  },
  {
    id: 2,
    type: 'alert',
    orderId: 'ORD-2024-003',
    message: 'Weather delay detected for ORD-2024-003 route',
    timestamp: '14:18:22',
    severity: 'medium'
  },
  {
    id: 3,
    type: 'pickup',
    orderId: 'ORD-2024-009',
    message: 'Order ORD-2024-009 picked up from warehouse',
    timestamp: '14:15:10',
    severity: 'low'
  },
  {
    id: 4,
    type: 'delay',
    orderId: 'ORD-2024-007',
    message: 'Traffic congestion causing delays for ORD-2024-007',
    timestamp: '14:10:33',
    severity: 'high'
  },
  {
    id: 5,
    type: 'update',
    message: 'Carrier performance metrics updated',
    timestamp: '14:05:18',
    severity: 'low'
  },
  {
    id: 6,
    type: 'delivery',
    orderId: 'ORD-2024-010',
    message: 'Order ORD-2024-010 successfully delivered',
    timestamp: '13:58:45',
    severity: 'low'
  },
  {
    id: 7,
    type: 'status_change',
    orderId: 'ORD-2024-005',
    message: 'Order ORD-2024-005 status changed to at risk',
    timestamp: '13:52:12',
    severity: 'medium'
  },
  {
    id: 8,
    type: 'update',
    message: 'Route optimization completed for 12 orders',
    timestamp: '13:45:30',
    severity: 'low'
  },
  {
    id: 9,
    type: 'alert',
    orderId: 'ORD-2024-002',
    message: 'Risk assessment updated for ORD-2024-002',
    timestamp: '13:40:15',
    severity: 'medium'
  },
  {
    id: 10,
    type: 'pickup',
    orderId: 'ORD-2024-011',
    message: 'Order ORD-2024-011 scheduled for pickup',
    timestamp: '13:35:08',
    severity: 'low'
  }
]

// Risk prediction algorithm simulation
export function calculateRiskScore(order) {
  let riskScore = 0
  
  // Base risk from carrier reliability
  const carrierRisk = {
    'DHL Express': 1,
    'FedEx Ground': 1.5,
    'UPS Standard': 2,
    'Local Express': 3
  }
  riskScore += carrierRisk[order.carrier] || 2
  
  // Weather conditions
  if (order.alerts?.includes('weather')) riskScore += 3
  
  // Traffic conditions
  if (order.alerts?.includes('traffic')) riskScore += 2
  
  // Route changes
  if (order.alerts?.includes('route')) riskScore += 1.5
  
  // Delivery delays
  if (order.alerts?.includes('delay')) riskScore += 4
  
  // Priority multiplier
  const priorityMultiplier = {
    'high': 1.2,
    'medium': 1.0,
    'low': 0.8
  }
  riskScore *= priorityMultiplier[order.priority] || 1
  
  return Math.min(Math.round(riskScore * 10) / 10, 10)
}

// Delay prediction simulation
export function predictDelay(order) {
  const now = new Date()
  const eta = new Date(order.eta)
  const isOverdue = eta < now
  
  let delayHours = 0
  
  if (order.alerts?.includes('weather')) delayHours += 2
  if (order.alerts?.includes('traffic')) delayHours += 1
  if (order.alerts?.includes('delay')) delayHours += 4
  
  const carrierDelayFactor = {
    'DHL Express': 0.5,
    'FedEx Ground': 1,
    'UPS Standard': 1.2,
    'Local Express': 2
  }
  
  delayHours *= carrierDelayFactor[order.carrier] || 1
  
  return {
    isOverdue,
    predictedDelayHours: Math.round(delayHours * 10) / 10,
    confidence: Math.max(0.6, 1 - (delayHours * 0.1))
  }
}
