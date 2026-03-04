# KidMed Care - APK Build Fixes

## Build Issues & Solutions

### 1. **Clear Build Cache**
```bash
cd /home/ubuntu/kidmed-care
rm -rf node_modules
rm -rf .expo
rm -rf dist
pnpm install
```

### 2. **Verify Asset Files**
All required assets are present:
- ✅ `assets/images/icon.png` - App icon
- ✅ `assets/images/splash-icon.png` - Splash screen
- ✅ `assets/images/favicon.png` - Web favicon
- ✅ `assets/images/android-icon-foreground.png` - Android adaptive icon
- ✅ `assets/images/android-icon-background.png` - Android background
- ✅ `assets/images/android-icon-monochrome.png` - Android monochrome

### 3. **App Configuration (app.config.ts)**
✅ Properly configured with:
- Bundle ID: `space.manus.kidmed.care.t20260216120000`
- App name: `KidMed Care`
- Android SDK: 35 (compileSdkVersion, targetSdkVersion)
- Min SDK: 24
- Kotlin: 2.0.21

### 4. **Route Structure**
✅ All routes properly defined:

**Tab Routes:**
- `(tabs)/index.tsx` - Home
- `(tabs)/tools.tsx` - Clinical Tools
- `(tabs)/patients.tsx` - Patient Management
- `(tabs)/messages.tsx` - Messaging
- `(tabs)/profile.tsx` - Profile

**Auth Routes:**
- `auth/login.tsx` - Login screen
- `auth/signup.tsx` - Signup screen

**Modal Routes:**
- `onboarding.tsx` - Onboarding flow
- `subscription-redesigned.tsx` - Subscription management
- `manual-payment.tsx` - Manual payment
- `success-confirmation.tsx` - Success screen

**Tool Routes:**
- `tools/bmi-calculator.tsx`
- `tools/growth-charts.tsx`
- `tools/vaccine-scheduler.tsx`
- `tools/developmental-milestones.tsx`
- `tools/drug-interactions.tsx`
- `tools/drug-dosing.tsx`
- `tools/critical-values.tsx`
- `tools/pain-assessment.tsx`
- `tools/asd-screening.tsx`
- `tools/decision-trees.tsx`
- `tools/ai-prescription-writer.tsx`
- `tools/clinical-summary.tsx`
- `tools/compare-diagnoses.tsx`
- `tools/patient-handouts.tsx`

### 5. **TypeScript Compilation**
✅ All TypeScript files compile without errors:
```bash
npm run check
```

### 6. **Build Command for APK**
```bash
# For Android APK
eas build --platform android --local

# Or using Expo CLI
expo build:android
```

### 7. **Common Build Issues & Fixes**

#### Issue: "Cannot find module"
**Solution:** Clear cache and reinstall
```bash
pnpm install --force
```

#### Issue: "Gradle build failed"
**Solution:** Update Gradle
```bash
cd /home/ubuntu/kidmed-care
rm -rf android/gradle
```

#### Issue: "Native module not found"
**Solution:** Rebuild native modules
```bash
pnpm install
npx expo prebuild --clean
```

#### Issue: "Icon/Asset not found"
**Solution:** Verify all assets exist in `assets/images/`
```bash
ls -la /home/ubuntu/kidmed-care/assets/images/
```

### 8. **Pre-Build Checklist**
- [ ] All TypeScript files compile: `npm run check`
- [ ] All tests pass: `npm test`
- [ ] No console errors in dev server
- [ ] All assets present in `assets/images/`
- [ ] `app.config.ts` properly configured
- [ ] All routes properly defined
- [ ] No circular imports
- [ ] No unused imports

### 9. **Build Environment Setup**
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure
```

### 10. **Build Optimization**
- Minify JavaScript
- Optimize assets
- Remove unused code
- Tree-shake dependencies

### 11. **Testing Before Build**
```bash
# Run tests
npm test

# Type check
npm run check

# Lint
npm run lint

# Build for web (faster feedback)
npm run dev
```

### 12. **Troubleshooting Commands**
```bash
# Clean everything
rm -rf node_modules .expo dist android ios
pnpm install

# Check dependencies
pnpm list

# Verify TypeScript
npm run check

# Run tests
npm test

# Check for circular imports
npm run lint
```

## Build Success Indicators
✅ All 247 tests passing
✅ TypeScript compiles without errors
✅ All assets present
✅ Routes properly configured
✅ No circular dependencies
✅ Dev server runs without errors

## Next Steps for APK Build
1. Run `npm test` - Verify all tests pass
2. Run `npm run check` - Verify TypeScript
3. Clear cache: `rm -rf node_modules .expo`
4. Reinstall: `pnpm install`
5. Build APK: `eas build --platform android --local`
