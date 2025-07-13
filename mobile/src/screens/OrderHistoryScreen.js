import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const OrderHistoryScreen = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // You would typically get the userId from your auth context or navigation params
    const id = "some_user_id";
    axios.get(`http://localhost:5000/orders/${id}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text>Order ID: {item._id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item._id}
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
  orderContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default OrderHistoryScreen;
