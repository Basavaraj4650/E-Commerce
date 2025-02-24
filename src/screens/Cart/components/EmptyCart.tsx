import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DynamicIcon from '../../../components/DynamicIcon';
import {
  CommonActions,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const EmptyCart = ({navigation}: Props) => {
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
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Dashboard'}],
            }),
          );
        }}>
        <Text style={styles.shopNowText}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
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
    marginBottom: 20,
  },
  shopNowButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  shopNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EmptyCart;
