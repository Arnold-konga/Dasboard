import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../firebase/AuthContext';

const CartScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/cart/${user.uid}`)
        .then(response => {
          setCart(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [user]);

  const updateQuantity = (productId, quantity) => {
    axios.post('http://localhost:5000/cart/add', { userId: user.uid, productId, quantity })
      .then(response => {
        axios.get(`http://localhost:5000/cart/${user.uid}`)
          .then(response => {
            setCart(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromCart = (productId) => {
    axios.post('http://localhost:5000/cart/remove', { userId: user.uid, productId })
      .then(response => {
        axios.get(`http://localhost:5000/cart/${user.uid}`)
          .then(response => {
            setCart(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.product.name}</Text>
      <Text>${item.product.price} x {item.quantity}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.product._id, item.quantity - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.product._id, item.quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <Button title="Remove" onPress={() => removeFromCart(item.product._id)} />
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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
  },
});

export default CartScreen;
