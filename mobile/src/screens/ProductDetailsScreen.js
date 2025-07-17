import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { useAuth } from '../firebase/AuthContext';
import Reviews from '../components/Reviews';

const ProductDetailsScreen = ({ route }) => {
  const { user } = useAuth();
  const [product, setProduct] = useState({
    images: []
  });
  const { productId } = route.params;

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${productId}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [productId]);

  const addToCart = () => {
    if (user) {
      axios.post('http://localhost:5000/cart/add', { userId: user.uid, productId, quantity: 1 })
        .then(response => {
          alert('Product added to cart!');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please login to add items to your cart.');
    }
  };

  const addToWishlist = () => {
    if (user) {
      axios.post('http://localhost:5000/wishlist/add', { userId: user.uid, productId })
        .then(response => {
          alert('Product added to wishlist!');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please login to add items to your wishlist.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
      <Button title="Add to Wishlist" onPress={addToWishlist} />
      <Reviews productId={productId} userId={user ? user.uid : null} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;
