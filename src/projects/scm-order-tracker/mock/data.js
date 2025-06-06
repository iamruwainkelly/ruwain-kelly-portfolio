// Mock data for German/European Supply Chain Order Tracker

export const mockOrders = [
  {
    id: 'DE-2025-001',
    customer: 'Siemens AG',
    origin: 'Munich, DE',
    destination: 'Berlin, DE',
    carrier: 'DHL Deutschland',
    status: 'on_track',
    priority: 'high',
    progress: 75,
    riskScore: 2.1,
    eta: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Leipzig Hub',
    lastUpdate: '2 min ago',
    weight: '245 kg',
    value: '€12,500',
    alerts: []
  },
  {
    id: 'DE-2025-002',
    customer: 'BMW Group',
    origin: 'Stuttgart, DE',
    destination: 'Hamburg, DE',
    carrier: 'DPD Deutschland',
    status: 'at_risk',
    priority: 'medium',
    progress: 45,
    riskScore: 6.8,
    eta: new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Frankfurt Hub',
    lastUpdate: '15 min ago',
    weight: '180 kg',
    value: '€8,750',
    alerts: ['weather', 'traffic']
  },
  {
    id: 'DE-2025-003',
    customer: 'Volkswagen AG',
    origin: 'Wolfsburg, DE',
    destination: 'Düsseldorf, DE',
    carrier: 'Hermes Germany',
    status: 'delayed',
    priority: 'high',
    progress: 30,
    riskScore: 8.5,
    eta: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Hannover, DE',
    lastUpdate: '45 min ago',
    weight: '320 kg',
    value: '€15,200',
    alerts: ['delay', 'route']
  },
  {
    id: 'EU-2025-004',
    customer: 'Philips Electronics',
    origin: 'Amsterdam, NL',
    destination: 'Vienna, AT',
    carrier: 'GLS Europe',
    status: 'on_track',
    priority: 'low',
    progress: 90,
    riskScore: 1.2,
    eta: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Prague, CZ',
    lastUpdate: '5 min ago',
    weight: '95 kg',
    value: '€4,200',
    alerts: []
  },
  {
    id: 'EU-2025-005',
    customer: 'Roche Pharmaceuticals',
    origin: 'Basel, CH',
    destination: 'Copenhagen, DK',
    carrier: 'UPS Europe',
    status: 'at_risk',
    priority: 'high',
    progress: 60,
    riskScore: 5.9,
    eta: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Cologne, DE',
    lastUpdate: '8 min ago',
    weight: '67 kg',
    value: '€22,800',
    alerts: ['weather']
  },
  {
    id: 'DE-2025-006',
    customer: 'Bosch GmbH',
    origin: 'Stuttgart, DE',
    destination: 'Dresden, DE',
    carrier: 'FedEx Europe',
    status: 'on_track',
    priority: 'medium',
    progress: 85,
    riskScore: 2.7,
    eta: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Nuremberg, DE',
    lastUpdate: '12 min ago',
    weight: '410 kg',
    value: '€18,900',
    alerts: []
  },
  {
    id: 'EU-2025-007',
    customer: 'IKEA Group',
    origin: 'Malmö, SE',
    destination: 'Milan, IT',
    carrier: 'DB Schenker',
    status: 'delayed',
    priority: 'medium',
    progress: 25,
    riskScore: 7.3,
    eta: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Innsbruck, AT',
    lastUpdate: '1 hr ago',
    weight: '125 kg',
    value: '€6,400',
    alerts: ['traffic', 'delay']
  },
  {
    id: 'DE-2025-008',
    customer: 'BASF SE',
    origin: 'Ludwigshafen, DE',
    destination: 'Rotterdam, NL',
    carrier: 'TNT Express',
    status: 'on_track',
    priority: 'high',
    progress: 70,
    riskScore: 3.1,
    eta: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Dortmund, DE',
    lastUpdate: '3 min ago',
    weight: '580 kg',
    value: '€9,650',
    alerts: []
  },
  {
    id: 'EU-2025-009',
    customer: 'Airbus Group',
    origin: 'Toulouse, FR',
    destination: 'Hamburg, DE',
    carrier: 'Geodis Europe',
    status: 'at_risk',
    priority: 'low',
    progress: 40,
    riskScore: 6.2,
    eta: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
    currentLocation: 'Brussels, BE',
    lastUpdate: '25 min ago',
    weight: '1,250 kg',
    value: '€32,100',
    alerts: ['route']
  }
]

export const mockCarriers = [
  {
    id: 'dhl-deutschland',
    name: 'DHL Deutschland',
    type: 'Express Delivery',
    onTimeRate: 96,
    activeOrders: 47,
    avgDeliveryTime: '1.8 days',
    costPerMile: '€2.45',
    performanceScore: 96,
    status: 'active',
    lastUpdate: '2 min ago'
  },
  {
    id: 'dpd-deutschland',
    name: 'DPD Deutschland',
    type: 'Ground Service',
    onTimeRate: 94,
    activeOrders: 62,
    avgDeliveryTime: '2.1 days',
    costPerMile: '€1.89',
    performanceScore: 94,
    status: 'active',
    lastUpdate: '1 min ago'
  },
  {
    id: 'hermes-germany',
    name: 'Hermes Germany',
    type: 'Standard Delivery',
    onTimeRate: 92,
    activeOrders: 38,
    avgDeliveryTime: '2.3 days',
    costPerMile: '€2.12',
    performanceScore: 92,
    status: 'active',
    lastUpdate: '5 min ago'
  },
  {
    id: 'gls-europe',
    name: 'GLS Europe',
    type: 'European Network',
    onTimeRate: 87,
    activeOrders: 23,
    avgDeliveryTime: '1.6 days',
    costPerMile: '€3.25',
    performanceScore: 87,
    status: 'active',
    lastUpdate: '8 min ago'
  }
]

export const mockActivities = [
  {
    id: 1001,
    type: 'pickup',
    orderId: 'DE-2025-001',
    message: 'Order DE-2025-001 picked up from Siemens AG warehouse in Munich',
    timestamp: '14:32:15',
    severity: 'low'
  },
  {
    id: 1002,
    type: 'transit',
    orderId: 'DE-2025-002',
    message: 'BMW Group shipment scanned at Frankfurt Hub - weather delays detected',
    timestamp: '14:28:42',
    severity: 'medium'
  },
  {
    id: 1003,
    type: 'delay',
    orderId: 'DE-2025-003',
    message: 'Volkswagen AG delivery delayed due to traffic congestion in Düsseldorf',
    timestamp: '14:15:28',
    severity: 'high'
  },
  {
    id: 1004,
    type: 'update',
    message: 'Route optimization applied to 12 shipments - ETA improved by avg 45 minutes',
    timestamp: '14:10:33',
    severity: 'low'
  },
  {
    id: 1005,
    type: 'carrier_update',
    message: 'DHL Deutschland performance metrics updated - 94% on-time rate maintained',
    timestamp: '14:05:17',
    severity: 'low'
  },
  {
    id: 1006,
    type: 'status_change',
    orderId: 'EU-2025-004',
    message: 'Order EU-2025-004 status changed to delivered - customer notification sent',
    timestamp: '13:58:44',
    severity: 'low'
  },
  {
    id: 1007,
    type: 'alert',
    orderId: 'DE-2025-005',
    message: 'Weather alert: Heavy snow expected in Stuttgart region - potential delays',
    timestamp: '13:45:22',
    severity: 'medium'
  },
  {
    id: 1008,
    type: 'pickup',
    orderId: 'EU-2025-006',
    message: 'SAP SE shipment collected from Walldorf facility',
    timestamp: '13:30:15',
    severity: 'low'
  },
  {
    id: 1009,
    type: 'delivery_attempt',
    orderId: 'DE-2025-007',
    message: 'First delivery attempt for Bosch order - recipient unavailable',
    timestamp: '13:22:08',
    severity: 'medium'
  },
  {
    id: 1010,
    type: 'system_update',
    message: 'Risk assessment system updated - improved accuracy by 15%',
    timestamp: '13:15:55',
    severity: 'low'
  }
]

// Risk prediction algorithm simulation
export function calculateRiskScore(order) {
  let riskScore = 0
  
  // Base risk from carrier reliability
  const carrierRisk = {
    'DHL Deutschland': 1.2,
    'DPD Deutschland': 1.5,
    'Hermes Germany': 2.0,
    'GLS Europe': 1.8,
    'UPS Europe': 1.6,
    'FedEx Europe': 1.3,
    'DB Schenker': 1.7,
    'TNT Express': 1.4,
    'Geodis Europe': 1.9
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
    'DHL Deutschland': 0.5,
    'DPD Deutschland': 0.8,
    'Hermes Germany': 1.2,
    'GLS Europe': 1.0,
    'UPS Europe': 0.7,
    'FedEx Europe': 0.6,
    'DB Schenker': 1.1,
    'TNT Express': 0.8,
    'Geodis Europe': 1.3
  }
  
  delayHours *= carrierDelayFactor[order.carrier] || 1
  
  return {
    isOverdue,
    predictedDelayHours: Math.round(delayHours * 10) / 10,
    confidence: Math.max(0.6, 1 - (delayHours * 0.1))
  }
}
