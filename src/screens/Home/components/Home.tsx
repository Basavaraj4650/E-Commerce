import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  useWindowDimensions,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
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
import {Products} from '../../Product/service/product.interface';
import {
  getCatagaryList,
  getProductList,
} from '../../Product/service/product.services';
import {style} from '../style';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Home = ({navigation}: Props) => {
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

  const {data: productList} = useQuery<Products>(
    ['productList'],
    async () => {
      setIsLoading(true);
      const data = await getProductList();
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
  const dealsOfTheDay = safeProductList.filter(item => item.price > 100);
  const recommendedProducts = safeProductList.filter(item => item.price <= 100);

  const numColumns = isLandscapeMode ? 3 : 2;
  const cardWidth = (width - 40) / numColumns - 10;

  const handleProductPress = (id: number) => {
    navigation.navigate('ProductDetails', {productId: id});
  };

  const handleCategaryPress = (category: string) => {
    navigation.navigate('CategoryProducts', {categoryName: category});
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

  const renderCatagaryCard = ({item}: any) => (
    <TouchableOpacity
      style={styles.horizontalCard}
      onPress={() => handleCategaryPress(item.category)}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.imageBackground}
        resizeMode="cover">
        <View style={styles.categoryNameContainer}>
          <Text style={styles.categoryName}>{item.category.toUpperCase()}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderCatagarySection = (data: any[]) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderCatagaryCard}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderDealsOfTheDay = (data: any[]) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Deals of the Day</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView>
        {catagaryList && renderCatagarySection(catagaryList)}
        {renderDealsOfTheDay(dealsOfTheDay)}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
          </View>
          <FlatList
            key={numColumns}
            data={recommendedProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            numColumns={numColumns}
            contentContainerStyle={styles.productList}
          />
        </View>
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

export default Home;
