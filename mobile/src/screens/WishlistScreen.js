import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useAuth } from '../firebase/AuthContext';

const WishlistScreen = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/wishlist/${user.uid}`)
        .then(response => {
          setWishlist(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [user]);

  const removeFromWishlist = (productId) => {
    axios.post('http://localhost:5000/wishlist/remove', { userId: user.uid, productId })
      .then(response => {
        axios.get(`http://localhost:5000/wishlist/${user.uid}`)
          .then(response => {
            setWishlist(response.data);
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
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
      <Button title="Remove" onPress={() => removeFromWishlist(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist && wishlist.products.length > 0 ? (
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
