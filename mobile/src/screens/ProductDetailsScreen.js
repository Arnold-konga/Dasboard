import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductDetailsScreen = ({ route }) => {
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

  const userId = "some_user_id"; // You would typically get this from your auth context

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => { /* Add to cart logic */ }} />
      <Button title="Add to Wishlist" onPress={() => { /* Add to wishlist logic */ }} />
      <Reviews productId={productId} userId={userId} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
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
