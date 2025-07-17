import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../firebase/AuthContext';

const OrderHistoryScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/orders/${user.uid}`)
        .then(response => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [user]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderContainer} onPress={() => navigation.navigate('OrderDetails', { orderId: item._id })}>
      <Text>Order ID: {item._id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Total: ${item.total}</Text>
    </TouchableOpacity>
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
