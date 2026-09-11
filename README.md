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
- Listener cleanup
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

---

Start Checkout App:

```bash
npm run dev --workspace=checkout-app
```

---

Start Demo Site:

```bash
npm run dev --workspace=demo-site
```

---

Build Checkout App:

```bash
npm run build --workspace=checkout-app
```

---

Build Demo Site:

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

### Successful Payment

```text
4242 4242 4242 4242
```

### Failed Payment

```text
4000 0000 0000 0002
```

### Retry Scenario

```text
4000 0000 0000 9995
```

---

# Design Decisions

### Why SDK?

To allow third-party applications to integrate checkout without embedding checkout logic directly.

### Why postMessage?

The checkout runs inside an iframe and communicates securely with the parent application.

### Why TypeScript?

Provides type safety, maintainability, and better developer experience.

### Why Centralized Events?

To avoid magic strings and keep communication consistent across applications.

---

# Future Improvements

- Real payment gateway integration
- Backend session validation
- Automated testing
- CI/CD pipeline
- Analytics tracking
- Error monitoring
- SDK package publishing
- Accessibility audit

---

# Author

**Abhishek Tiwari**

Frontend Developer

React • TypeScript • Next.js