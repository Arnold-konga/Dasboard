import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import axios from 'axios';

const CheckoutScreen = ({ route }) => {
  const { cart } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const response = await axios.post('http://localhost:5000/payment/intent', { amount: total * 100 });
    const { paymentIntent, ephemeralKey, customer } = response.data;
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: 'Fashion App, Inc.',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  return (
    <View style={styles.container}>
      <Button
        variant="primary"
        disabled={loading}
        title="Checkout"
        onPress={openPaymentSheet}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default CheckoutScreen;
