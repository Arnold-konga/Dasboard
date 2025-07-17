import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const OrderDetailsScreen = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/orders/details/${orderId}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [orderId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.product.name}</Text>
      <Text>${item.product.price} x {item.quantity}</Text>
    </View>
  );

  if (!order) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      <Text>Order ID: {order._id}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Total: ${order.total}</Text>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={order.products}
        renderItem={renderItem}
        keyExtractor={item => item.product._id}
      />
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

export default OrderDetailsScreen;
