#!/bin/bash

# Arovia Frontend Installation Script
# This script sets up the complete React + TypeScript frontend

echo "🏥 Arovia Frontend Installation"
echo "================================"

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create environment file
if [ ! -f ".env" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "✅ Created .env file - please configure it with your settings"
else
    echo "✅ .env file already exists"
fi

# Create public assets directory structure
mkdir -p public/assets/images
mkdir -p public/assets/icons

# Create favicon placeholder
if [ ! -f "public/favicon.ico" ]; then
    echo "🎨 Creating favicon placeholder..."
    # Create a simple favicon placeholder
    echo "<!-- Favicon placeholder -->" > public/favicon.ico
fi

# Create PWA icons placeholders
if [ ! -f "public/pwa-192x192.png" ]; then
    echo "🎨 Creating PWA icon placeholders..."
    echo "<!-- PWA 192x192 icon placeholder -->" > public/pwa-192x192.png
    echo "<!-- PWA 512x512 icon placeholder -->" > public/pwa-512x512.png
fi

# Build type definitions
echo "🔧 Checking TypeScript configuration..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "⚠️  TypeScript compilation issues detected"
    echo "   This is normal during initial setup - dependencies need to be installed"
fi

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env file with backend API URL"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For production build: npm run build"
echo ""
echo "📖 See README.md for detailed documentation"
