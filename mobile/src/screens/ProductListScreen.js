import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import Slider from '@react-native-community/slider';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(1000);

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const searchFilter = (text) => {
    setSearch(text);
    if (text) {
      axios.get(`http://localhost:5000/products/search/${text}`)
        .then(response => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.get('http://localhost:5000/products/')
        .then(response => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const filterProducts = () => {
    axios.post('http://localhost:5000/products/filter', { category, price })
      .then(response => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text>{item.name}</Text>
      <Text>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        value={search}
        placeholder="Search"
        onChangeText={(text) => searchFilter(text)}
      />
      <View style={styles.filterContainer}>
        <Text>Category:</Text>
        <TouchableOpacity onPress={() => setCategory('All')}>
          <Text style={category === 'All' ? styles.activeFilter : styles.filter}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Men')}>
          <Text style={category === 'Men' ? styles.activeFilter : styles.filter}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('Women')}>
          <Text style={category === 'Women' ? styles.activeFilter : styles.filter}>Women</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text>Price: ${price}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1000}
          step={10}
          value={price}
          onValueChange={(value) => setPrice(value)}
          onSlidingComplete={filterProducts}
        />
      </View>
      <TouchableOpacity onPress={filterProducts}>
        <Text>Apply Filters</Text>
      </TouchableOpacity>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />
    </View>
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filter: {
    padding: 10,
  },
  activeFilter: {
    padding: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default ProductListScreen;
