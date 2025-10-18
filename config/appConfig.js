// Backend Configuration
const config = {
  // Server Settings
  server: {
    port: process.env.PORT || 5001,
    env: process.env.NODE_ENV || 'development'
  },
  
  // Database
  database: {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/journalstudio'
  },
  
  // PhonePe Settings
  phonepe: {
    merchantId: "M23QC1WPAN5Z3",
    secretKey: "37e1984b-2ab0-43ed-b939-2ae4cc88a2af",
    apiUrl: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
    clientId: "SU2510162000595879332958",
    clientSecret: "37e1984b-2ab0-43ed-b939-2ae4cc88a2af",
    clientVersion: 1,
    env: "PRODUCTION" // or "SANDBOX" for testing
  },
  
  // Frontend URLs
  frontend: {
    baseUrl: (() => {
      const env = process.env.NODE_ENV;
      console.log("NODE_ENV in config:", env);
      // Default to production if NODE_ENV is undefined (common in production deployments)
      if (env === 'production' || !env) {
        return 'https://thejournalstudio.in';
      } else {
        return 'http://localhost:3000';
      }
    })(),
    paymentSuccess: '/Paymentsuccess',
    checkout: '/CheckOut'
  },
  
  
  // Order Settings
  order: {
    autoCreateOnPaymentSuccess: true,
    defaultShipmentStatus: 'pending',
    defaultPaymentStatus: 'completed'
  }
};

// Validate config structure
console.log("Config validation:");
console.log("- Frontend object exists:", !!config.frontend);
console.log("- Frontend baseUrl exists:", !!config.frontend?.baseUrl);
console.log("- Frontend baseUrl value:", config.frontend?.baseUrl);

export default config;
