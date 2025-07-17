import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Button
        title="Manage Products"
        onPress={() => navigation.navigate('ManageProducts')}
      />
      <Button
        title="Manage Orders"
        onPress={() => navigation.navigate('ManageOrders')}
      />
      <Button
        title="Manage Users"
        onPress={() => navigation.navigate('ManageUsers')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default AdminScreen;
