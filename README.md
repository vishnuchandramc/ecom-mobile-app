# BLUME - Ecommerce App

BLUME is a cross-platform ecommerce application using React Native.

APK Link: https://expo.dev/artifacts/eas/kB5n5VV9uW5BuRzFq4QaAT.apk


Design (figma) : https://www.figma.com/design/vsllpYgskBZgDTf4aZ7Kw1/BLUME---Ecommerce-app?node-id=0-1&t=l5USqife51UeaEQe-1

[App flow starting from auth screen to Checkout]

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
  <img src="https://github.com/user-attachments/assets/72da8fb8-154b-43e4-b2be-165bb935099d" alt="WhatsApp Image Feb 24 2025" width="200"/>
  <img src="https://github.com/user-attachments/assets/4e4f9fc6-5298-4278-bd45-faadc005927b" alt="WhatsApp Image Feb 24 2025 (1)" width="200"/>
  <img src="https://github.com/user-attachments/assets/e10e347d-5cc7-4110-a0ba-6c22ea481d1b" alt="WhatsApp Image Feb 24 2025 (2)" width="200"/>
</div>

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
  <img src="https://github.com/user-attachments/assets/26e617f8-9174-475e-878c-228ce4a49346" alt="WhatsApp Image Feb 24 2025 (5)" width="200"/>
  <img src="https://github.com/user-attachments/assets/b76e4bbd-c630-4f63-bb9f-478248948f63" alt="WhatsApp Image Feb 24 2025 (3)" width="200"/>
  <img src="https://github.com/user-attachments/assets/55d62baf-718f-44be-87c5-8335c8151f06" alt="WhatsApp Image Feb 24 2025 (6)" width="200"/>
</div>

## Video

For a video demonstration, please [click here](https://github.com/user-attachments/assets/a3d4e993-d872-4415-8886-b56955448915).

## Features

- **Dark / Light Mode Support**: Switch between dark and light themes to suit your preference.
- **Cross-Platform**: Available on both Android and iOS devices.
- **OAuth**: Secure authentication using OAuth.
- **Search**: Easily find products with the integrated search feature.
- **Filter**: Refine your search results with advanced filtering options.
- **Cart**: Add items to your cart and manage your purchases effortlessly.
- **Animations**: Enjoy smooth and engaging animations throughout the app.

## 🏗️ Architecture Overview
This project follows Clean architecture with state management, ensuring separation of concerns and maintainable codebase.

```
Action (User Interaction)
   ↓
Store (Zustand Store)
   ↓
View (React Components)
   ↓
Action (Repeat)
```

#### 1. Domain Layer (Models)
- Location: `src/models/`
- Purpose: Contains business models and interfaces
- Example: `ProductModel`, `AuthModels`
- Independent of other layers

#### 2. Business Logic Layer (Hooks)
- Location: `src/hooks/`
- Purpose: Custom hooks encapsulating business logic
- Examples:
  - `useProductListing`: Handles product fetching and filtering
  - `useLogin`: Manages authentication logic
- Implements use cases and business rules

#### 3. Data Layer (Services)
- Location: `src/services/`
- Purpose: Handles external data sources and API communication
- Examples:
  - `fetchWrapper`: HTTP client wrapper
  - `AuthService`: Authentication service

#### 4. Presentation Layer (Components)
- Location: `src/components/`
- Organization: Follows Atomic Design principles
  - `atoms/`: Basic building blocks
  - `molecules/`: Combinations of atoms
  - `organisms/`: Complex UI components
- Pure UI components separated from business logic

#### 5. State Management Layer (Store)
- Location: `src/store/`
- Technology: Zustand
- Purpose: Centralized state management
- Examples:
  - `cartStore`: Shopping cart state
  - `authStore`: Authentication state
  - `filterStore`: Product filtering state

## Expo Build

BLUME is built using Expo, which simplifies the development process and allows for easy deployment across multiple platforms.


Mock API: https://fakeapi.platzi.com/

## Technologies Used

- **Expo**: A framework for building native apps using React.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Expo Router**: A file-based router for Expo apps.
- **AsyncStorage**: An unencrypted, asynchronous, persistent, key-value storage system for React Native.
- **React Native Reanimated**: A library for creating complex animations in React Native.
- **Zustand**: A small, fast, and scalable state management solution.
