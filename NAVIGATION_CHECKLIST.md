# Sacred Wounds - Complete Navigation & Button Test Checklist

## 🗺️ SITE NAVIGATION MAP & BUTTON TESTING GUIDE

This document serves as a complete reference for all navigation paths, buttons, and interactive elements across the Sacred Wounds website. Use this to verify that every button and link works correctly.

---

## 📍 PAGE 1: INDEX.html (Landing/Home Page)

### Navigation Bar (Top - Fixed on all pages)
- [ ] **Logo "Harlots, Heathens & Heretic Apothecary"** → Links to index.html
- [ ] **"Gallery"** link → Links to gallery.html
- [ ] **"Submit"** link → Links to submit.html
- [ ] **"About"** link → Links to about.html
- [ ] **"Store"** link → Links to store.html

### Hero Section (Main Landing)
- [ ] **"Enter the Gallery"** CTA button → Links to gallery.html

### Featured Pieces Preview Section
- [ ] **"View Gallery"** button (Interactive Gallery card) → Links to gallery.html
- [ ] **"Design Your Merch"** button (Custom Merch card) → Links to gallery.html
- [ ] **"See Examples"** button (Confession Wall card) → Links to gallery.html
- [ ] **"Share Your Truth"** button (Submit Your Story card) → Links to submit.html
- [ ] **"Shop Now"** button (Store card) → Links to store.html
- [ ] **"Learn More"** button (About card) → Links to about.html

### How It Works Section
- [ ] **Section displays 4-step process** (no interactive buttons, informational)

### Featured Quote Section
- [ ] **Displays inspirational quote** (no interactive elements)

### Call to Action Section
- [ ] **"View the Gallery"** button → Links to gallery.html
- [ ] **"Share Your Story"** button (secondary style) → Links to submit.html

### Persistent Cart Bar (Bottom - All Pages)
- [ ] **🛒 "Cart" button** with item count → Opens shopping cart modal
- [ ] **"Total: $X.XX"** display → Updates as items added

### Footer
- [ ] **"About"** link → Links to about.html
- [ ] **"Submit Your Story"** link → Links to submit.html
- [ ] **"Store"** link → Links to store.html

---

## 📍 PAGE 2: GALLERY.html (Main Exhibition Page)

### Navigation Bar
- [ ] **Logo** → Links to index.html
- [ ] **"Gallery"** (active state) → Stays on gallery.html
- [ ] **"Submit"** → Links to submit.html
- [ ] **"About"** → Links to about.html
- [ ] **"Store"** → Links to store.html

### Hero Section
- [ ] **Displays "Five Pieces"** heading

### Five Pieces Grid Section
- [ ] **Piece 1: "Name It and Claim It"**
  - [ ] Image displays (or placeholder)
  - [ ] "Make Merch" button → Opens customizeConfession() modal
- [ ] **Piece 2: "Love the Sinner"**
  - [ ] Image displays
  - [ ] "Make Merch" button → Opens customizeConfession() modal
- [ ] **Piece 3: "We Forgive You, But..."**
  - [ ] Image displays
  - [ ] "Make Merch" button → Opens customizeConfession() modal
- [ ] **Piece 4: "Holier Than Thou"**
  - [ ] Image displays
  - [ ] "Make Merch" button → Opens customizeConfession() modal
- [ ] **Piece 5: "Sunday Marquee"**
  - [ ] Image displays
  - [ ] "Make Merch" button → Opens customizeConfession() modal

### Confession Wall (Flip Cards) Section
- [ ] **8 Flip Cards display**
  - [ ] **On hover (desktop):** Card flips to reveal hidden meaning + affirmation
  - [ ] **On tap (mobile):** Card toggles flipped state
  - [ ] **Card states work smoothly** with 3D transform animation

- [ ] **Category Filters (if implemented)**
  - [ ] "All" → Shows all 8 cards
  - [ ] "Abuse" → Filters to abuse-category cards
  - [ ] "Shame" → Filters to shame-category cards
  - [ ] "Exclusion" → Filters to exclusion-category cards
  - [ ] "Doubt" → Filters to doubt-category cards
  - [ ] "Money" → Filters to money-category cards

### Persistent Cart Bar
- [ ] **🛒 "Cart"** button → Opens cart modal
- [ ] **Cart count updates** when items added
- [ ] **Total price updates** in real-time

### Footer
- [ ] **All footer links** navigate correctly

---

## 📍 MODAL: CUSTOMIZE MERCHANDISE (Triggered from Gallery Pieces)

**Triggered by:** Clicking "Make Merch" on any gallery piece

### Modal Content
- [ ] **Close button (X)** → Closes customize modal
- [ ] **Quote display** → Shows the selected confession quote
- [ ] **Merchandise Type Dropdown**
  - [ ] T-Shirt ($24.99) → Selectable
  - [ ] Hoodie ($49.99) → Selectable
  - [ ] Hat ($19.99) → Selectable
  - [ ] Beanie ($18.99) → Selectable
  - [ ] Underwear ($14.99) → Selectable
  - [ ] Bra ($34.99) → Selectable

- [ ] **Size Dropdown** (appears after selecting merchandise type)
  - [ ] Shows appropriate sizes for selected item
  - [ ] XS, S, M, L, XL, 2XL options (varies by item)

- [ ] **Color Dropdown**
  - [ ] Black → Selectable
  - [ ] White → Selectable
  - [ ] Navy → Selectable
  - [ ] Red → Selectable
  - [ ] Gray → Selectable

- [ ] **Quantity Input**
  - [ ] Can adjust 1-100 quantity
  - [ ] Defaults to 1

- [ ] **"Add to Cart" button**
  - [ ] Validates all selections made
  - [ ] Shows alert on success
  - [ ] Item appears in cart with custom details
  - [ ] Closes modal after adding

---

## 📍 MODAL: SHOPPING CART (Persistent)

**Triggered by:** Clicking 🛒 "Cart" button on cart bar

### Cart Contents
- [ ] **Cart items display** with:
  - [ ] Item name/title
  - [ ] Quantity selector (can modify quantity live)
  - [ ] Price calculation (price × qty)
  - [ ] "Remove" button → Removes item from cart
  - [ ] For custom items: Shows merchandise type, size, color

- [ ] **Cart total** updates in real-time as quantities change
- [ ] **"Proceed to Checkout" button**
  - [ ] If user NOT logged in → Shows login prompt
  - [ ] If user IS logged in → Proceeds to Stripe checkout

- [ ] **Close button (X)** → Closes cart modal
- [ ] **Empty cart message** → Shows if cart is empty

---

## 📍 MODAL: LOGIN (Triggered on Checkout without Login)

**Triggered by:** Clicking "Proceed to Checkout" without being logged in

### Login Options
- [ ] **"Sign in with Google" button**
  - [ ] TODO: Implement Google OAuth
  - [ ] Currently shows alert placeholder
  - [ ] After login: Sets currentUser, closes modal, updates UI

- [ ] **Email Login Section**
  - [ ] Email input field
  - [ ] "Continue with Email" button
  - [ ] Validates email format
  - [ ] Sets currentUser on success
  - [ ] Closes modal and saves user to localStorage

- [ ] **Close button (X)** → Closes login modal
- [ ] **User info updates** in nav/header after login

---

## 📍 PAGE 3: SUBMIT.html (Confession Submission)

### Navigation Bar
- [ ] **Logo** → Links to index.html
- [ ] **"Gallery"** → Links to gallery.html
- [ ] **"Submit"** (active state) → Stays on submit.html
- [ ] **"About"** → Links to about.html
- [ ] **"Store"** → Links to store.html

### Submission Form (Structure - to be fully implemented)
- [ ] **Harmful Quote Input** → Text field
- [ ] **Real Meaning Input** → Text field
- [ ] **Affirmation Input** → Text field
- [ ] **Category Selector** → Dropdown
- [ ] **Submit Button** → Validates and submits
- [ ] **Success Message** → Appears after submission

### Persistent Cart Bar
- [ ] **🛒 "Cart"** button → Opens cart modal

### Footer
- [ ] **All footer links** navigate correctly

---

## 📍 PAGE 4: STORE.html (Product Store)

### Navigation Bar
- [ ] **Logo** → Links to index.html
- [ ] **"Gallery"** → Links to gallery.html
- [ ] **"Submit"** → Links to submit.html
- [ ] **"About"** → Links to about.html
- [ ] **"Store"** (active state) → Stays on store.html

### Product Grid
- [ ] **Product 1: "Name It and Claim It"** (Print, $45.00)
  - [ ] Image displays
  - [ ] "View Details" button → Opens product modal

- [ ] **Product 2: "Love the Sinner"** (Print, $45.00)
  - [ ] Image displays
  - [ ] "View Details" button → Opens product modal

- [ ] **Product 3: "We Forgive You, But..."** (Print, $45.00)
  - [ ] Image displays
  - [ ] "View Details" button → Opens product modal

- [ ] **Product 4: "Holier Than Thou"** (Digital, $25.00)
  - [ ] Image displays
  - [ ] "View Details" button → Opens product modal

- [ ] **Product 5: "Sunday Marquee"** (Print, $45.00)
  - [ ] Image displays
  - [ ] "View Details" button → Opens product modal

### Persistent Cart Bar
- [ ] **🛒 "Cart"** button → Opens cart modal
- [ ] Cart count updates when items added
- [ ] Total updates in real-time

### Footer
- [ ] **All footer links** navigate correctly

---

## 📍 MODAL: PRODUCT DETAILS

**Triggered by:** Clicking "View Details" on any store product

### Modal Content
- [ ] **Close button (X)** → Closes product modal
- [ ] **Product image** displays
- [ ] **Product title** displays
- [ ] **Product type** displays (Print/Digital)
- [ ] **Price** displays ($X.XX)
- [ ] **Description** displays
- [ ] **"Add to Cart" button**
  - [ ] Adds product to cart (not customized)
  - [ ] Shows success alert
  - [ ] Updates cart count
  - [ ] Closes modal

---

## 📍 PAGE 5: ABOUT.html (Project & Artist Info)

### Navigation Bar
- [ ] **Logo** → Links to index.html
- [ ] **"Gallery"** → Links to gallery.html
- [ ] **"Submit"** → Links to submit.html
- [ ] **"About"** (active state) → Stays on about.html
- [ ] **"Store"** → Links to store.html

### Hero Section
- [ ] **"Sacred Wounds"** heading displays

### Project Description Section
- [ ] **Full project description** displays
- [ ] Text is readable and well-formatted

### Artist Section: Meet Ansel James
- [ ] **Artist name: "Ansel James"** displays
- [ ] **Artist tagline** displays
- [ ] **Artist image/placeholder** displays
- [ ] **Biography** displays with all details
- [ ] **Artist traits list** displays with decorative bullets:
  - [ ] Savant
  - [ ] Redblooded American
  - [ ] Gay
  - [ ] Raised on Christianity
  - [ ] Fantastic Mustache
  - [ ] Good Guy
  - [ ] Two Cats & Seven Siblings
  - [ ] Thespian & Artistic to the Core
  - [ ] Based in Kansas City, Kansas
  - [ ] Humble as F*ck

### Mission Section
- [ ] **6 mission cards** display:
  - [ ] Name the Harm
  - [ ] Reveal the Truth
  - [ ] Reclaim Your Truth
  - [ ] Build Community
  - [ ] Art as Activism
  - [ ] Empower Through Creation

### Contact Section
- [ ] **Email link** → Can be clicked to open email client
- [ ] **Social media reference** displays
- [ ] **Location** displays

### Persistent Cart Bar
- [ ] **🛒 "Cart"** button → Opens cart modal

### Footer
- [ ] **All footer links** navigate correctly

---

## 🛒 STRIPE CHECKOUT FLOW

**Triggered by:** Clicking "Proceed to Checkout" with user logged in

### Checkout Requirements
- [ ] **User must be logged in** (email or Google)
- [ ] **Cart must have items** (validation check)
- [ ] **Stripe public key** is set in script.js
  - [ ] Current: `pk_live_YOUR_STRIPE_KEY_HERE`
  - [ ] TODO: Replace with actual live key

### Expected Checkout Flow
- [ ] Stripe checkout page loads
- [ ] User enters payment info
- [ ] User completes purchase
- [ ] Order confirmation page displays
- [ ] Cart clears on success

---

## 🔄 CART & LOCAL STORAGE

### Cart Persistence
- [ ] **Items persist** after page refresh
- [ ] **Cart loads from localStorage** on page load
- [ ] **Cart updates localStorage** when items added/removed

### User Persistence
- [ ] **User info persists** after page refresh
- [ ] **User loads from localStorage** on page load
- [ ] **Logout** clears user from localStorage

---

## 📱 RESPONSIVE DESIGN TESTING

### Mobile (480px and below)
- [ ] Navigation collapses appropriately
- [ ] Cards stack into single column
- [ ] Flip cards work on tap
- [ ] Cart bar displays correctly
- [ ] Modals fit on screen with padding

### Tablet (768px and below)
- [ ] All elements visible and readable
- [ ] Touch targets are at least 44x44px
- [ ] Forms are easy to fill out
- [ ] Images scale appropriately

### Desktop (1200px+)
- [ ] Multi-column layouts display
- [ ] Hover effects work smoothly
- [ ] Persistent cart bar visible
- [ ] All spacing is balanced

---

## ⚠️ CRITICAL FUNCTIONALITY CHECKLIST

- [ ] **Navigation consistency** - All pages have same nav bar with correct active states
- [ ] **Cart persistence** - Items remain in cart across page navigation
- [ ] **Flip card animations** - Smooth 3D transitions on all confession cards
- [ ] **Responsive design** - Works on mobile, tablet, desktop
- [ ] **Form validation** - Customization form validates all selections
- [ ] **Modal closing** - All modals close via X button, backdrop click, or Escape key
- [ ] **Price calculations** - Cart total updates correctly with qty changes
- [ ] **Image loading** - Images show or gracefully degrade with CSS fallbacks
- [ ] **Keyboard navigation** - Tab through all interactive elements
- [ ] **Accessibility** - Links and buttons have descriptive text

---

## 🐛 KNOWN ISSUES & TODO

- [ ] **Stripe integration** - Replace public key with live key before launch
- [ ] **Google OAuth** - Implement full Google authentication flow
- [ ] **Backend API** - Set up /create-checkout-session endpoint
- [ ] **Product images** - Add actual images to /images/ directory
- [ ] **Artist image** - Replace 🎭 placeholder with Ansel James photo
- [ ] **Form submission** - Implement backend for confession submissions
- [ ] **Email verification** - Implement email verification for user login
- [ ] **Order fulfillment** - Set up merchandise printing partner integration

---

## 📊 LAUNCH CHECKLIST

Before going live:
- [ ] All buttons tested and working
- [ ] All links navigate correctly
- [ ] Cart system fully functional
- [ ] Login system implemented
- [ ] Stripe integration complete with live keys
- [ ] All images optimized and in place
- [ ] Mobile responsiveness tested on real devices
- [ ] SSL certificate installed (HTTPS)
- [ ] Domain configured correctly
- [ ] Analytics/tracking set up
- [ ] Backup strategy in place
- [ ] Support email monitored
- [ ] Legal/privacy policy pages added (if needed)

---

## 📝 TEST NOTES

Use this section to record your testing results:

```
Date: _______________
Tester: ______________
Status: PASS / FAIL

Issues Found:
1. ___________________________________________________
2. ___________________________________________________
3. ___________________________________________________

Fixed:
1. ___________________________________________________
2. ___________________________________________________
```

---

**Last Updated:** 2026-06-26
**Created For:** Sacred Wounds - Harlots, Heathens & Heretic Apothecary
**Author:** Scott Charles Olson / Ansel James
