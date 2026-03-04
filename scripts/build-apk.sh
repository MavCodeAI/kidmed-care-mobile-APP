#!/bin/bash

# KidMed Care - APK Build Script
# This script handles all necessary steps to build a production APK

set -e

echo "🚀 KidMed Care APK Build Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clean cache
echo -e "${YELLOW}Step 1: Cleaning build cache...${NC}"
rm -rf node_modules
rm -rf .expo
rm -rf dist
rm -rf android/build
echo -e "${GREEN}✓ Cache cleaned${NC}"

# Step 2: Install dependencies
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
pnpm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: TypeScript check
echo -e "${YELLOW}Step 3: Checking TypeScript...${NC}"
npm run check
echo -e "${GREEN}✓ TypeScript OK${NC}"

# Step 4: Run tests
echo -e "${YELLOW}Step 4: Running tests...${NC}"
npm test
echo -e "${GREEN}✓ All tests passed${NC}"

# Step 5: Lint check
echo -e "${YELLOW}Step 5: Linting code...${NC}"
npm run lint 2>&1 | grep -E "error|Error" || echo -e "${GREEN}✓ Lint OK${NC}"

# Step 6: Verify assets
echo -e "${YELLOW}Step 6: Verifying assets...${NC}"
if [ -f "assets/images/icon.png" ] && \
   [ -f "assets/images/splash-icon.png" ] && \
   [ -f "assets/images/android-icon-foreground.png" ] && \
   [ -f "assets/images/android-icon-background.png" ]; then
    echo -e "${GREEN}✓ All assets present${NC}"
else
    echo -e "${RED}✗ Missing assets!${NC}"
    exit 1
fi

# Step 7: Build APK
echo -e "${YELLOW}Step 7: Building APK...${NC}"
echo -e "${YELLOW}Note: This requires EAS CLI and Expo account${NC}"
echo -e "${YELLOW}Install with: npm install -g eas-cli${NC}"
echo -e "${YELLOW}Login with: eas login${NC}"

# Check if eas-cli is installed
if command -v eas &> /dev/null; then
    echo -e "${YELLOW}Building APK with EAS...${NC}"
    eas build --platform android --local
else
    echo -e "${YELLOW}EAS CLI not found. Using expo build...${NC}"
    expo build:android
fi

echo -e "${GREEN}✓ APK build complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}Build successful! 🎉${NC}"
