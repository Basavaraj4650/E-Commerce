import React, {useRef, useState, useCallback, useMemo, useEffect} from 'react';
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import {AlertType} from '../../../constants/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../../../components/Loader';
import CustomAlert from '../../../components/CustomAlert';
import {CustomButton} from '../../../components/Button';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  clearLocalStorage,
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../shared/localStore';
import {useFocusEffect} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import DeleteCustomAlert from '../../../components/CustomDeleteAlert';
import EmptyCart from './EmptyCart';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Cart = ({navigation}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('error');
  const alertRef = useRef<{show: () => void; hide: () => void}>(null);
  const [cart, setCart] = useState<any[]>([]);
  const deleteAlertRef = useRef<{show: () => void; hide: () => void}>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [exitAttempted, setExitAttempted] = useState(false);

  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscapeMode(isLandscape());
    };
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (exitAttempted) {
          BackHandler.exitApp(); // Close the app if back was pressed twice
        } else {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          setExitAttempted(true);
          setTimeout(() => setExitAttempted(false), 2000);
          return true;
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => {
        backHandler.remove();
      };
    }, [exitAttempted]),
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
    deleteAlertRef.current?.hide();
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

  const handleCheckout = async () => {
    setIsLoading(true);

    // Checkout API

    await clearLocalStorage().then(() => {
      setCart([]);
      ToastAndroid.show(
        'Your order was successfully placed. You will receive it shortly.',
        ToastAndroid.SHORT,
      );
      setIsLoading(false);
      navigation.navigate('Dashboard');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {cart.length === 0 ? (
          <EmptyCart navigation={navigation} />
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
                  onPress={() => {
                    setSelectedItemId(item.id);
                    deleteAlertRef.current?.show();
                  }}>
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

          <CustomButton title="Proceed to Checkout" onPress={handleCheckout} />
        </View>
      )}
      <DeleteCustomAlert
        ref={deleteAlertRef}
        onDelete={() => {
          if (selectedItemId !== null) {
            handleRemoveFromCart(selectedItemId);
          }
        }}
        onCancel={() => {
          deleteAlertRef.current?.hide();
        }}
      />
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

export default Cart;
