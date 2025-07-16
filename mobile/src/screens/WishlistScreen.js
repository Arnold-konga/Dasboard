import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const WishlistScreen = ({ userId }) => {
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    // You would typically get the userId from your auth context or navigation params
    const id = "some_user_id";
    axios.get(`http://localhost:5000/wishlist/${id}`)
      .then(response => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist ? (
        <FlatList
          data={wishlist.products}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text>Your wishlist is empty</Text>
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

export default WishlistScreen;
