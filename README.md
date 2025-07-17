# Fashion App

This is a full-featured e-commerce mobile app for Android and iOS that allows users to browse and purchase fashion-related products.

## Features

*   **User Authentication:** Sign up/Login with Email/Password and Google/Facebook.
*   **Product Catalog:** Browse products with search and filtering.
*   **Shopping Cart and Wishlist:** Add products to your cart and wishlist.
*   **Checkout:** Secure checkout with Stripe.
*   **Order History and Tracking:** View your order history and track the status of your orders.
*   **Ratings and Reviews:** Rate and review products.
*   **Push Notifications:** Receive push notifications for order updates and promotions.
*   **Admin Panel:** Manage products, orders, and users.

## Tech Stack

*   **Mobile Framework:** React Native
*   **Backend:** Node.js + Express
*   **Database:** MongoDB Atlas
*   **Authentication:** Firebase Auth
*   **Payments:** Stripe
*   **Notifications:** Firebase Cloud Messaging

## Deployment

To build the app, you'll need to have the Expo CLI installed on your local machine. You can install it by running the following command in your terminal:

```
npm install -g expo-cli
```

Once the Expo CLI is installed, you can build the app by running the following commands in the `mobile` directory:

### Android

```
expo build:android
```

### iOS

```
expo build:ios
```

These commands will generate the `.apk` and `.ipa` files, which you can then upload to the Google Play Store and Apple App Store, respectively.
