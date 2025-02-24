import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  useWindowDimensions,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
import {Products} from '../../Product/service/product.interface';
import {getProductsByCategory} from '../../Product/service/product.services';
import {style} from '../style';
import DynamicIcon from '../../../components/DynamicIcon';

const CategoryProducts = (props: any) => {
  const categoryName = props?.route?.params?.categoryName;

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const handleOrientationChange = () => setIsLandscapeMode(isLandscape());
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const {data: ProductsByCategoryList = [], refetch} = useQuery<Products>(
    ['product', categoryName],
    () => {
      setIsLoading(true);
      return getProductsByCategory(categoryName);
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

  const safeProductList = Array.isArray(ProductsByCategoryList)
    ? ProductsByCategoryList
    : [];

  const filteredProducts = safeProductList.filter(product =>
    product.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
  );

  const handleProductPress = (id: number) => {
    props.navigation.navigate('ProductDetails', {productId: id});
  };

  const renderProductCard = ({item}: {item: any}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleProductPress(item.id)}>
      <View style={styles.categaryProductCard}>
        <Image source={{uri: item.image}} style={styles.categaryProductImage} />
        <View style={styles.categaryProductDetails}>
          <Text style={styles.categaryProductTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.productPrice, {marginBottom: 5}]}>
            ${item.price}
          </Text>
          <Text style={styles.productDescription} numberOfLines={3}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, {padding: 10}]}>
      {isLoading && <Loader />}
      <View style={styles.searchContainer}>
        <DynamicIcon
          library="MaterialIcons"
          name="search"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingVertical: 10}}
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

export default CategoryProducts;
