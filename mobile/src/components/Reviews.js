import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { Rating } from 'react-native-ratings';

const Reviews = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const fetchReviews = () => {
    axios.get(`http://localhost:5000/reviews/${productId}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const submitReview = () => {
    axios.post('http://localhost:5000/reviews/add', { product: productId, user: userId, rating, comment })
      .then(res => {
        console.log(res.data);
        fetchReviews();
      })
      .catch(err => console.log(err));
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text>{item.user.email} - {item.rating}/5</Text>
      <Rating
        imageSize={20}
        readonly
        startingValue={item.rating}
      />
      <Text>{item.comment}</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
      <TextInput
        placeholder="Comment"
        value={comment}
        onChangeText={setComment}
        style={styles.input}
      />
      <Rating
        showRating
        onFinishRating={(rating) => setRating(rating)}
        style={{ paddingVertical: 10 }}
      />
      <Button title="Submit Review" onPress={submitReview} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  reviewContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
  },
});

export default Reviews;
