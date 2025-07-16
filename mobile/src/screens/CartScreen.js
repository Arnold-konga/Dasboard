import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const CartScreen = ({ userId }) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // You would typically get the userId from your auth context or navigation params
    const id = "some_user_id";
    axios.get(`http://localhost:5000/cart/${id}`)
      .then(response => {
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.product.name}</Text>
      <Text>${item.product.price} x {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart && cart.products.length > 0 ? (
        <>
          <FlatList
            data={cart.products}
            renderItem={renderItem}
            keyExtractor={item => item.product._id}
          />
          <Button title="Checkout" onPress={() => navigation.navigate('Checkout', { cart })} />
        </>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default CartScreen;
