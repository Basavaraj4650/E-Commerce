import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  useWindowDimensions,
  Image,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {useQuery} from 'react-query';
import {AlertType} from '../../../constants/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../../../components/Loader';
import CustomAlert from '../../../components/CustomAlert';
import {
  getProductDetails,
  getProductsByCategory,
} from '../service/product.services';
import {style} from '../style';
import {CustomButton} from '../../../components/Button';
import DynamicIcon from '../../../components/DynamicIcon';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../shared/localStore';
import {useFocusEffect} from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';

const ProductDetails = (props: any) => {
  const productId = props?.route?.params?.productId;

  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('error');
  const alertRef = useRef<{show: () => void; hide: () => void}>(null);
  const [isInCart, setIsInCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  useEffect(() => {
    const handleOrientationChange = () => setIsLandscapeMode(isLandscape());
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  const {data: product, refetch} = useQuery<any>(
    ['product', productId],
    async () => {
      setIsLoading(true);
      try {
        const data = await getProductDetails(productId);
        const res = await getProductsByCategory(data.category);
        setSimilarProducts(res);
        return data;
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    {
      onSuccess: () => setIsLoading(false),
      onError: (error: any) => {
        setAlertMessage(error?.response?.data || 'Something Went Wrong');
        setAlertType('error');
        alertRef.current?.show();
        setIsLoading(false);
      },
    },
  );

  useFocusEffect(
    useCallback(() => {
      const checkIfProductInCartAndLiked = async () => {
        const likedProducts =
          (await getFromLocalStorage('likedProducts')) || {};
        setIsLiked(likedProducts[productId] || false);

        const existingCart = (await getFromLocalStorage('cart')) || [];
        const productInCart = existingCart.find(
          (item: {id: any}) => item.id === productId,
        );
        setIsInCart(!!productInCart);
      };

      checkIfProductInCartAndLiked();
      refetch();
    }, [productId, refetch]),
  );

  const toggleLike = async () => {
    try {
      const likedProducts = (await getFromLocalStorage('likedProducts')) || {};
      likedProducts[productId] = !isLiked;

      await setToLocalStorage('likedProducts', likedProducts);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const addToCart = async () => {
    if (isInCart) {
      props.navigation.navigate('Cart');
    } else {
      try {
        const existingCart = (await getFromLocalStorage('cart')) || [];
        const updatedCart = [...existingCart];

        updatedCart.push({
          ...product,
          quantity: 1,
          liked: false,
        });

        await setToLocalStorage('cart', updatedCart).then(() => {
          ToastAndroid.show(
            'Product added to cart Successfully',
            ToastAndroid.SHORT,
          );
          setIsInCart(true);
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {product && (
          <>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={styles.backButton}>
                <DynamicIcon
                  library="AntDesign"
                  name="arrowleft"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLike} style={styles.backButton}>
                <DynamicIcon
                  library="AntDesign"
                  name={isLiked ? 'heart' : 'hearto'}
                  size={24}
                  color={isLiked ? 'red' : 'white'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.imageSection}>
              <View style={styles.thumbnailContainer}>
                {[product.image, product.image, product.image].map(
                  (img, index) => (
                    <Image
                      key={index}
                      source={{uri: img}}
                      style={styles.thumbnail}
                    />
                  ),
                )}
              </View>
              <ImageViewer
                imageUrls={[{url: product.image}]}
                enableImageZoom={true}
                enableSwipeDown={true}
                onSwipeDown={() => {
                  console.log('onSwipeDown');
                }}
                renderIndicator={() => <></>}
                style={styles.productDetailImage}
              />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {product.title}
              </Text>
              <View style={styles.priceRatingContainer}>
                <View>
                  <Text style={styles.price}>${product.price}</Text>
                  <Text style={styles.note}>All prices include VAT</Text>
                </View>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <DynamicIcon
                      library="AntDesign"
                      key={index}
                      name="star"
                      size={20}
                      color={index < product.rating.rate ? '#FFD700' : '#555'}
                    />
                  ))}
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Description :</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>
            </View>
            <View style={styles.similarProductsContainer}>
              <Text style={styles.similarProductsTitle}>Similar Products</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {similarProducts.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.similarProductItem}
                    onPress={() =>
                      props.navigation.navigate('ProductDetails', {
                        productId: item.id,
                      })
                    }>
                    <Image
                      source={{uri: item.image}}
                      style={styles.similarProductImage}
                    />
                    <Text style={styles.similarProductTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.similarProductPrice}>
                      ${item.price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <CustomButton
              title={isInCart ? 'Go To Cart' : 'Add To Cart'}
              onPress={addToCart}
            />
          </>
        )}
      </ScrollView>
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

export default ProductDetails;
