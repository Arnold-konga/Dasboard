import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CartScreen from './src/screens/CartScreen';
import WishlistScreen from './src/screens/WishlistScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import AdminScreen from './src/screens/AdminScreen';
import { requestUserPermission, getFCMToken, notificationListener } from './src/services/NotificationService';
import auth from '@react-native-firebase/auth';
import { AuthProvider, useAuth } from './src/firebase/AuthContext';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import OrderDetailsScreen from './src/screens/OrderDetailsScreen';

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
}

const CartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  const { user, initializing } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const setupNotifications = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        const token = await getFCMToken();
        // Send the token to your server to store it for sending notifications later.
      }
      notificationListener();
    };
    if (user) {
      // In a real app, you would get the user's role from your server
      // and set the isAdmin state based on that.
      // For now, we'll just check if the user's UID matches a specific value.
      if (user.uid === 'your-admin-uid') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
    setupNotifications();
  }, [user]);

  if (initializing) {
    return null; // or a loading spinner
  }

  return (
    <StripeProvider
      publishableKey="your-stripe-publishable-key"
      merchantIdentifier="merchant.com.fashionapp"
    >
      <NavigationContainer>
        {user ? (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Cart" component={CartStack} />
            <Tab.Screen name="Orders" component={OrderHistoryScreen} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            {isAdmin && <Tab.Screen name="Admin" component={AdminScreen} />}
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </StripeProvider>
  );
};

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
