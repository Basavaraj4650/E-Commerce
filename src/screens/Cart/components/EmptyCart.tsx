import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DynamicIcon from '../../../components/DynamicIcon';

const EmptyCart = () => {
  return (
    <View style={styles.emptyCartContainer}>
      <DynamicIcon
        library="FontAwesome"
        name="shopping-cart"
        size={100}
        color="#fff"
      />
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
      <Text style={styles.emptyCartsSubText}>Add items to get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyCartsSubText: {
    color: '#aaa',
    fontSize: 16,
  },
});

export default EmptyCart;
