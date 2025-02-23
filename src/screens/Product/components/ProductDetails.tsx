import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ScrollView,
  Text,
  useWindowDimensions,
  Image,
  View,
  TouchableOpacity,
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
import {getProductDetails} from '../service/product.services';
import {style} from '../style';
import {CustomButton} from '../../../components/Button';
import DynamicIcon from '../../../components/DynamicIcon';
import {Products} from '../service/product.interface';

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

  useEffect(() => {
    const handleOrientationChange = () => setIsLandscapeMode(isLandscape());
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  const {data: product} = useQuery<Products>(
    ['product'],
    () => {
      setIsLoading(true);
      return getProductDetails(productId);
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
              <TouchableOpacity style={styles.backButton}>
                <DynamicIcon
                  library="AntDesign"
                  name="hearto"
                  size={24}
                  color="white"
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
              <Image
                source={{uri: product.image}}
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
            <CustomButton
              title="Add To Cart"
              onPress={() => props.navigation.navigate('Cart')}
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
