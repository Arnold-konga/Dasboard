import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const CheckoutScreen = ({ route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { cart } = route.params;

  const handleCheckout = () => {
    const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    axios.post('http://localhost:5000/mpesa/stkpush', { phoneNumber, amount: total })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Button title="Pay with M-Pesa" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
});

export default CheckoutScreen;
