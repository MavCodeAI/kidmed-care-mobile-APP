# KidMed Care - Mobile App Interface Design

## Overview
KidMed Care is a pediatric clinical decision support platform designed for healthcare providers. The app delivers 13 clinical tools, AI-powered guidance, and patient case management with enterprise-grade security and multi-tier subscription support.

---

## Screen List

### Authentication & Onboarding
1. **Splash Screen** - App logo and branding
2. **Login Screen** - Email/password login with social options
3. **Sign Up Screen** - Account creation with email verification
4. **Password Recovery** - Email-based password reset flow
5. **Biometric Setup** - Face ID/Touch ID enrollment (optional)

### Main Navigation (Tab Bar)
6. **Home Screen** - Dashboard with quick access to tools and recent cases
7. **Clinical Tools Hub** - Grid/list of all 13 clinical tools
8. **Patient Cases** - Patient case management and history
9. **Messages** - In-app messaging and notifications center
10. **Profile** - User account settings and preferences

### Clinical Tools Screens
11. **BMI Calculator** - Pediatric BMI and percentile calculation
12. **Growth Charts** - WHO/CDC percentile visualization
13. **Vaccine Scheduler** - Age-based vaccine schedule
14. **Developmental Milestones** - Development checklist by age
15. **Lab Values Reference** - Pediatric normal ranges
16. **Vital Signs Reference** - BP, HR, RR normal ranges
17. **ASD Screening (M-CHAT)** - Autism screening tool
18. **Catch-up Vaccination** - Missed vaccines planning
19. **Critical Values Guide** - Emergency lab values
20. **Urgent Care Protocols** - Emergency treatment guidelines
21. **Patient Handouts** - Educational materials for parents
22. **Pain Assessment** - Pediatric pain scales
23. **Drug Dosing Calculator** - Weight-based drug dosing

### Patient Management
24. **Patient Detail Screen** - View patient information and history
25. **Add Patient Screen** - Create new patient case
26. **Patient History** - Timeline of patient visits and notes

### AI & Guidance
27. **AI Guidance Screen** - AI-powered diagnosis and treatment suggestions
28. **Evidence Citations** - References and citations for recommendations
29. **Audit Trail** - History of AI outputs and clinical decisions

### Settings & Account
30. **Profile Settings** - User information and preferences
31. **Subscription Management** - Current plan and upgrade options
32. **Workspace Settings** - Team and clinic management (Clinic tier)
33. **Security Settings** - Password, biometric, session management
34. **Notifications Settings** - Push notification preferences
35. **Dark/Light Mode Toggle** - Theme selection

---

## Primary Content and Functionality

### Home Screen
- **Welcome Header** - Personalized greeting with user name
- **Quick Stats** - Today's patient count, pending cases, alerts
- **Recent Patients** - List of recently accessed patient cases
- **Quick Access Buttons** - Shortcuts to most-used clinical tools
- **AI Insights Card** - Latest AI recommendations
- **Subscription Status** - Current plan tier with upgrade CTA

### Clinical Tools Hub
- **Grid Layout** - 13 tools displayed as cards (2-column grid)
- **Search Bar** - Filter tools by name or category
- **Tool Categories** - Filter by: Assessment, Reference, Calculator, Screening
- **Tool Cards** - Icon, name, description, last used date
- **Favorites** - Star system to pin frequently used tools

### Patient Cases Screen
- **Patient List** - All patient cases with search and filters
- **Sort Options** - By date, name, condition, status
- **Case Status Indicators** - Active, archived, completed
- **Patient Card** - Name, age, last visit date, condition summary
- **Add Patient Button** - Floating action button to create new case
- **Case Details** - Tap to view full patient information

### Clinical Tool Screens (Generic Pattern)
- **Tool Header** - Tool name, info icon, help button
- **Input Section** - Form fields specific to each tool
- **Calculate/Analyze Button** - Primary action button
- **Results Section** - Output with visualizations (charts, tables)
- **Reference Range** - Normal values for context
- **Share/Export Button** - Export results as PDF or share
- **History** - Previous calculations for this patient

### AI Guidance Screen
- **Input Context** - Patient demographics, symptoms, labs
- **AI Recommendation** - Primary diagnosis/treatment suggestion
- **Confidence Level** - Visual indicator of recommendation strength
- **Alternative Options** - Secondary suggestions
- **Evidence Citations** - Clickable references to supporting studies
- **Disclaimer** - Clinical decision support notice
- **Save to Audit Trail** - Log the recommendation

### Messages/Notifications
- **Notification Center** - List of all notifications
- **Message Types** - System alerts, patient updates, team messages
- **Unread Badge** - Count of unread messages
- **Message Detail** - Full message content and actions
- **In-app Chat** - Direct messaging with support team

### Profile/Settings
- **User Avatar** - Profile picture with upload option
- **Account Information** - Name, email, specialization
- **Subscription Status** - Current plan, renewal date, usage stats
- **Security Settings** - Password change, biometric toggle, sessions
- **Preferences** - Language, notifications, data sharing
- **Logout Button** - Sign out with confirmation

---

## Key User Flows

### Flow 1: Calculate Pediatric BMI
1. User taps "BMI Calculator" from home or tools hub
2. Enters patient age, weight, height
3. Taps "Calculate" button
4. App displays BMI value, percentile, and interpretation
5. User can save to patient case or share results
6. Returns to home or patient detail screen

### Flow 2: Access Vaccine Schedule
1. User taps "Vaccine Scheduler" from tools
2. Enters patient date of birth
3. App displays age-appropriate vaccine schedule
4. Shows completed, pending, and overdue vaccines
5. User can print schedule or share with parents
6. Option to log vaccine administration

### Flow 3: Get AI Clinical Guidance
1. User navigates to patient case
2. Taps "Get AI Guidance" button
3. Selects relevant clinical context (symptoms, labs, history)
4. AI generates diagnosis and treatment recommendations
5. User reviews suggestions and evidence citations
6. Can accept, modify, or reject recommendations
7. Logged to audit trail for compliance

### Flow 4: Manage Patient Cases
1. User taps "Patient Cases" tab
2. Searches for or selects patient from list
3. Views patient detail screen with history
4. Can add new clinical notes or tool results
5. Accesses patient's previous calculations and AI outputs
6. Can archive or delete case (with confirmation)

### Flow 5: Upgrade Subscription
1. User taps "Profile" → "Subscription"
2. Views current plan (Free/Pro/Clinic) with features
3. Taps "Upgrade" button
4. Selects desired plan tier
5. Completes payment process
6. Subscription activated immediately
7. New features become available

---

## Color Choices

### Primary Brand Colors
- **Primary Blue**: `#0a7ea4` - Trust, medical authority, professional
- **Accent Teal**: `#17a2b8` - Complementary, modern healthcare
- **Success Green**: `#22c55e` - Positive results, safe status
- **Warning Orange**: `#f59e0b` - Alerts, attention needed
- **Error Red**: `#ef4444` - Critical values, errors

### Neutral Colors
- **Background Light**: `#ffffff` - Clean, professional
- **Background Dark**: `#151718` - Reduced eye strain
- **Surface Light**: `#f5f5f5` - Card backgrounds
- **Surface Dark**: `#1e2022` - Dark mode cards
- **Text Primary**: `#11181c` (light) / `#ecedee` (dark)
- **Text Secondary**: `#687076` (light) / `#9ba1a6` (dark)
- **Border**: `#e5e7eb` (light) / `#334155` (dark)

### Semantic Colors
- **Clinical Safe**: Green (`#22c55e`) - Normal ranges, safe values
- **Clinical Warning**: Orange (`#f59e0b`) - Borderline values, caution
- **Clinical Critical**: Red (`#ef4444`) - Critical values, immediate action
- **Information**: Blue (`#0a7ea4`) - Tips, help text, informational

---

## Design Principles

1. **Medical Clarity** - All values, ranges, and recommendations must be unambiguous
2. **One-Handed Usage** - Primary actions accessible in thumb-reach zone
3. **Accessibility** - WCAG 2.1 AA compliance, high contrast, readable fonts
4. **Offline Support** - Core tools work without internet connection
5. **Data Security** - No PHI displayed in lists, encrypted storage
6. **Fast Performance** - Clinical tools load in <1 second
7. **Gesture-Based** - Swipe, tap, long-press for intuitive navigation
8. **Dark Mode** - Full support for reduced-light environments (hospitals)

---

## Navigation Structure

```
Root
├── Auth Stack (if not logged in)
│   ├── Login
│   ├── Sign Up
│   └── Password Recovery
├── Main Tabs (if logged in)
│   ├── Home
│   ├── Clinical Tools
│   ├── Patient Cases
│   ├── Messages
│   └── Profile
├── Modal Screens
│   ├── Patient Detail
│   ├── Tool Results
│   ├── AI Guidance
│   └── Settings
└── Deep Links
    ├── /patient/:id
    ├── /tool/:toolId
    └── /case/:caseId
```

---

## Responsive Design Notes

- **Portrait Orientation** - Primary layout (9:16 aspect ratio)
- **Tablet Support** - Landscape mode with split-view for tools
- **Safe Area Handling** - Notch and home indicator awareness
- **Font Scaling** - Respects system font size preferences
- **Touch Targets** - Minimum 44pt for interactive elements

