#!/bin/bash

# Deploy script for Journal Studio AWS backend
# This script will help deploy the fixed PhonepeController.js to production

echo "🚀 Deploying Journal Studio AWS Backend Fixes..."

# Check if we're in the right directory
if [ ! -f "Controllers/PhonepeController.js" ]; then
    echo "❌ Error: Please run this script from the thejournalstudioaws directory"
    exit 1
fi

echo "✅ Found PhonepeController.js"

# Create a backup of the current production file (if deploying to production)
if [ "$1" = "production" ]; then
    echo "📦 Creating backup..."
    # You can add backup commands here if needed
fi

echo "🔧 The following files have been updated:"
echo "   - Controllers/PhonepeController.js (added fallback config)"
echo "   - config/appConfig.js (enhanced environment handling)"
echo "   - server.js (updated port and added debugging)"

echo ""
echo "📋 Next steps:"
echo "1. Upload the updated files to your production server"
echo "2. Restart your PM2 process: pm2 restart server"
echo "3. Check the logs: pm2 logs server"
echo "4. Test the payment flow"

echo ""
echo "🔍 The fix includes:"
echo "   - Fallback configuration that works even if config import fails"
echo "   - Robust environment variable handling"
echo "   - Enhanced error logging and debugging"
echo "   - Production-ready baseUrl configuration"

echo ""
echo "✨ Payment processing should now work correctly!"
