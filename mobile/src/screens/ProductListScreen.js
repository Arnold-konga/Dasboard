import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default ProductListScreen;
