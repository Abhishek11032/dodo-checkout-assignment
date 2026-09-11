# Dodo Checkout Assignment

A production-inspired checkout system built using React, TypeScript, Tailwind CSS, and a reusable Checkout SDK.

The project is organized as a monorepo and consists of:

- Checkout Application
- Demo Store Application
- Reusable Checkout SDK

---

# Live Demo

### Checkout App

https://dodo-checkout-assignment-checkout-a-opal.vercel.app/

### Demo Store

https://dodo-checkout-assignment-demo-site-indol.vercel.app/

---

# Features

## Checkout SDK

- Reusable checkout SDK
- Opens checkout inside an iframe modal
- Success, error, and close callbacks
- Duplicate checkout prevention
- Event listener cleanup
- Secure postMessage communication
- Scroll locking while checkout is open
- Origin validation for incoming messages

---

## Checkout Application

### Product Checkout

- Dynamic product loading using URL parameters
- Product-based checkout flow
- Reusable UI components

### Payment Form

- Email validation
- Card number validation
- Expiry date validation
- CVV validation
- Input formatting
- Loading states

### Payment Status Handling

- Processing state
- Success state
- Failure state
- Retry payment scenario support

### User Experience

- Escape key support
- Close button support
- Responsive design
- Hidden scrollbar with scroll support
- Accessible form controls

---

## Demo Store

- Product purchase flow
- SDK integration
- Payment activity history
- Success and failure tracking
- Session tracking

---

# Monorepo Structure

```text
dodo-checkout-assignment
│
├── apps
│   ├── checkout-app
│   └── demo-site
│
├── packages
│   └── sdk
│
├── package.json
└── README.md
```

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

## SDK

- TypeScript
- postMessage API

---

# Architecture

## Checkout SDK Responsibilities

The SDK is responsible for:

- Opening checkout modal
- Creating and managing iframe
- Managing overlay lifecycle
- Handling checkout events
- Scroll locking
- Security validation
- Cleanup

### Flow

```text
Demo Site
    ↓
DodoCheckout.open()
    ↓
Checkout App (Iframe)
    ↓
Payment Result
    ↓
postMessage
    ↓
SDK Callback
```

---

# Event Communication

Communication between the SDK and Checkout App is handled using centralized events:

```text
PAYMENT_SUCCESS
PAYMENT_FAILED
CHECKOUT_CLOSED
```

---

# Security Considerations

Implemented:

- Origin validation
- Duplicate modal prevention
- Event listener cleanup
- Scroll restoration
- Encoded query parameters

Example:

```ts
if (event.origin !== allowedOrigin) {
  return;
}
```

---

# Running The Project

Install dependencies:

```bash
npm install
```

### Start Checkout App

```bash
npm run dev --workspace=checkout-app
```

### Start Demo Site

```bash
npm run dev --workspace=demo-site
```

### Build Checkout App

```bash
npm run build --workspace=checkout-app
```

### Build Demo Site

```bash
npm run build --workspace=demo-site
```

---

# SDK Usage

```ts
import { DodoCheckout } from "@dodo/sdk";

DodoCheckout.open({
  productId: "prod_123",

  onSuccess(data) {
    console.log(data.sessionId);
  },

  onError(error) {
    console.log(error.message);
  },

  onClose(data) {
    console.log(data.reason);
  },
});
```

---

# Test Cards

| Card Number | Scenario |
|------------|----------|
| 4242 4242 4242 4242 | Successful Payment |
| 4000 0000 0000 0002 | Declined Payment |
| 4000 0000 0000 0341 | Fails Once, Then Succeeds On Retry |

---

# Design Decisions

### Why SDK?

The assignment required the checkout experience to be reusable across applications. Creating a dedicated SDK allows external applications to integrate checkout functionality without embedding checkout logic directly.

### Why postMessage?

The checkout runs inside an iframe and needs a safe communication mechanism with the parent application. The browser's postMessage API provides a clean and secure way to exchange events between isolated applications.

### Why TypeScript?

TypeScript provides compile-time type safety, improves maintainability, and creates a better developer experience when consuming the SDK.

### Why Centralized Events?

Using centralized event names avoids magic strings and ensures consistent communication between the Checkout App, SDK, and Demo Site.

---

# Decisions I Went Back And Forth On

### 1. Popup Window vs Iframe Modal

Initially I considered opening the checkout in a separate popup window. I ultimately chose an iframe modal because it provides a smoother user experience, keeps users on the host application, and more closely resembles modern embedded checkout systems.

### 2. Direct SDK Communication vs postMessage

I considered exposing direct communication methods between the checkout and the host application. I chose postMessage because the checkout runs in an isolated iframe, making event-based communication more secure, scalable, and browser-friendly.

---

# What I Would Explore Next

- Real payment gateway integration
- Backend checkout session validation
- Automated testing (Unit + Integration)
- CI/CD pipeline setup
- Analytics and event tracking
- Error monitoring and reporting
- Publishing the SDK as an npm package
- Accessibility audit and improvements
- Session persistence and recovery
- Multi-product checkout support

---

# Author

**Abhishek Tiwari**

Frontend Developer

React • TypeScript • Next.js