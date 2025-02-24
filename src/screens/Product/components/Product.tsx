import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  useWindowDimensions,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {useQuery} from 'react-query';
import {AlertType} from '../../../constants/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Loader} from '../../../components/Loader';
import CustomAlert from '../../../components/CustomAlert';
import {getCatagaryList, getProductList} from '../service/product.services';
import {style} from '../style';
import SortModal from './SortModal';
import DynamicIcon from '../../../components/DynamicIcon';
import {Products} from '../service/product.interface';
import FilterModal from './FilterModal';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Product = ({navigation}: Props) => {
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
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  const [sortedProductList, setSortedProductList] = useState<Products>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const handleOrientationChange = () => setIsLandscapeMode(isLandscape());
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  const {data: productList} = useQuery<Products>(
    ['productList'],
    async (): Promise<Products> => {
      setIsLoading(true);
      const data = await getProductList();
      setIsLoading(false);
      return data as unknown as Products;
    },
    {
      onError: (error: any) => {
        setAlertMessage(error?.response?.data || 'Something Went Wrong');
        setAlertType('error');
        alertRef.current?.show();
        setIsLoading(false);
      },
    },
  );

  const {data: catagaryList} = useQuery<any>(
    ['catagaryList'],
    async () => {
      setIsLoading(true);
      const data = await getCatagaryList();
      setIsLoading(false);
      return data;
    },
    {
      onError: (error: any) => {
        setAlertMessage(error?.response?.data || 'Something Went Wrong');
        setAlertType('error');
        alertRef.current?.show();
        setIsLoading(false);
      },
    },
  );

  const safeProductList = Array.isArray(productList) ? productList : [];
  const displayedProductList = useMemo(() => {
    let list =
      sortOption && sortedProductList.length
        ? sortedProductList
        : safeProductList;
    if (selectedCategories.length > 0) {
      list = list.filter(product =>
        selectedCategories.includes(product.category),
      );
    }
    return list;
  }, [sortOption, sortedProductList, safeProductList, selectedCategories]);
  const numColumns = isLandscapeMode ? 3 : 2;
  const cardWidth = (width - 40) / numColumns - 10;

  const handleProductPress = (id: number) => {
    navigation.navigate('ProductDetails', {productId: id});
  };

  const renderProductItem = ({item}: {item: any}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleProductPress(item.id)}
      style={[styles.productItem, {width: cardWidth}]}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.productTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={styles.discountContainer}>
        <Text style={styles.productPrice}>${item.price}</Text>
        {item.price > 100 && (
          <View style={[styles.discountBadge, {marginLeft: 8}]}>
            <Text style={styles.productDiscount}>10% OFF</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const toggleSortModal = () => {
    setIsSortModalVisible(!isSortModalVisible);
  };

  const handleSortOptionSelect = (option: string) => {
    if (option === 'none') {
      setSortOption(null);
      setSortedProductList([]);
    } else {
      setSortOption(option);
      sortProductList(option);
    }
    toggleSortModal();
  };

  const sortProductList = (option: string) => {
    let sortedList = [...safeProductList];

    switch (option) {
      case 'price_low_to_high':
        sortedList.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_to_low':
        sortedList.sort((a, b) => b.price - a.price);
        break;
      case 'top_rated':
        sortedList.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'low_rated':
        sortedList.sort((a, b) => a.rating.rate - b.rating.rate);
        break;
      default:
        break;
    }
    setSortedProductList(sortedList);
  };

  return (
    <SafeAreaView style={[styles.container, {padding: 10}]}>
      {isLoading && <Loader />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle} onPress={toggleSortModal}>
          <DynamicIcon
            library="MaterialIcons"
            name="sort"
            size={20}
            color="#FFF"
          />
          <Text style={styles.buttonText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setIsFilterModalVisible(true)}>
          <DynamicIcon
            library="MaterialIcons"
            name="filter-list"
            size={20}
            color="#FFF"
          />
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <SortModal
        isVisible={isSortModalVisible}
        onClose={toggleSortModal}
        onSelectOption={handleSortOptionSelect}
      />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onSelectCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        categories={catagaryList?.map((item: any) => item.category) || []}
      />
      <FlatList
        key={numColumns}
        data={displayedProductList}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.productList}
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

export default Product;
