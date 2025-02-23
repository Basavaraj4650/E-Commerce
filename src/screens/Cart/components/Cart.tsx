import React, {useRef, useState, useCallback} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {AlertType} from '../../../constants/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../../../components/Loader';
import CustomAlert from '../../../components/CustomAlert';
import {CustomButton} from '../../../components/Button';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../shared/localStore';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Cart = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('error');
  const alertRef = useRef<{show: () => void; hide: () => void}>(null);
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = async () => {
    setIsLoading(true);
    const storedCart = await getFromLocalStorage('cart');
    if (storedCart) {
      setCart(storedCart);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      calculateTotal();
      loadCart();
    }, []),
  );

  const handleQuantityChange = async (
    id: number,
    type: 'increase' | 'decrease',
  ) => {
    const updatedCart = (cart ?? []).map(item =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === 'increase'
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
          }
        : item,
    );

    setCart(updatedCart);
    await setToLocalStorage('cart', updatedCart);
  };

  const handleRemoveFromCart = async (id: number) => {
    const updatedCart = (cart ?? []).filter(item => item.id !== id);
    setCart(updatedCart);
    await setToLocalStorage('cart', updatedCart);
  };

  const calculateTotal = () => {
    if (cart.length === 0) return '0.00';
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.1;
    const deliveryCharges = 5.0;
    return (subtotal + tax + deliveryCharges).toFixed(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cart.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        ) : (
          cart.map(item => (
            <View key={item.id} style={styles.productContainer}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.productDescription} numberOfLines={3}>
                  {item.description}
                </Text>
                <Text style={styles.productPrice}>
                  ${item.price.toFixed(2)}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>
                    ⭐ {item.rating.rate} ({item.rating.count})
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 'decrease')}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 'increase')}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFromCart(item.id)}>
                  <Text style={styles.removeButtonText}>Remove from Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.bottomCard}>
          <Text style={styles.summaryText}>
            <Text style={styles.labelText}>Subtotal:</Text>
            <Text style={styles.valueText}>
              {' '}
              $
              {cart
                .reduce((sum, item) => sum + item.price * item.quantity, 0)
                .toFixed(2)}
            </Text>
          </Text>

          <Text style={styles.summaryText}>
            <Text style={styles.labelText}>Tax (10%):</Text>
            <Text style={styles.valueText}>
              {' '}
              $
              {(
                cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0,
                ) * 0.1
              ).toFixed(2)}
            </Text>
          </Text>

          <Text style={[styles.summaryText]}>
            <Text style={styles.labelText}>Delivery:</Text>
            <Text style={styles.valueText}> $5.00</Text>
          </Text>

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          </View>

          <CustomButton
            title="Proceed to Checkout"
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      )}

      <CustomAlert
        ref={alertRef}
        type={alertType}
        message={alertMessage}
        saveLabel="Okay"
        cancelLabel="Cancel"
        onSave={() => alertRef.current?.hide()}
        onCancel={() => alertRef.current?.hide()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#000'},
  scrollViewContent: {flexGrow: 1, paddingHorizontal: 20, paddingBottom: 230},
  emptyCartText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {width: 120, height: 170, borderRadius: 10},
  productDetails: {flex: 1, marginLeft: 10},
  productTitle: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  productDescription: {color: '#888', fontSize: 14, marginTop: 5},
  productPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ratingContainer: {marginTop: 5},
  ratingText: {color: '#FFD700', fontSize: 14},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  quantityButtonText: {color: '#fff', fontSize: 20, fontWeight: 'bold'},
  quantityText: {color: '#fff', fontSize: 18, marginHorizontal: 15},
  removeButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#B22222',
    borderRadius: 8,
  },
  removeButtonText: {color: '#fff', fontSize: 14, textAlign: 'center'},
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    padding: 20,
  },
  summaryText: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 8,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    marginBottom: 15,
  },
  labelText: {
    color: '#bbb',
    fontSize: 16,
  },
  valueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    right: 10,
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default Cart;
