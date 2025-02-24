import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getFromLocalStorage,
  setToLocalStorage,
} from '../../../shared/localStore';
import {useFocusEffect} from '@react-navigation/native';
import {getProductDetails} from '../../Product/service/product.services';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Loader} from '../../../components/Loader';

const Favorites = () => {
  const [likedProducts, setLikedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchLikedProducts = async () => {
    try {
      setIsLoading(true);
      const likedProductsObj =
        (await getFromLocalStorage('likedProducts')) || {};
      const likedProductIds = Object.keys(likedProductsObj).filter(
        productId => likedProductsObj[productId],
      );

      const likedProductsDetails = await Promise.all(
        likedProductIds.map(async productId => {
          const productDetails = await getProductDetails(Number(productId));
          return {...productDetails, isLiked: true};
        }),
      );

      setLikedProducts(likedProductsDetails);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching liked products:', error);
    }
  };

  const handleLikeToggle = async (productId: number) => {
    try {
      const updatedLikedProducts = likedProducts.filter(
        product => product.id !== productId,
      );
      setLikedProducts(updatedLikedProducts);

      const likedProductsObj =
        (await getFromLocalStorage('likedProducts')) || {};
      likedProductsObj[productId] = !likedProductsObj[productId];
      await setToLocalStorage('likedProducts', likedProductsObj);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLikedProducts();
    }, []),
  );

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.productItem}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating?.rate || '4.5'}</Text>
        </View>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => handleLikeToggle(item.id)}>
        <Icon name="favorite" size={28} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      {likedProducts.length > 0 ? (
        <FlatList
          data={likedProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="favorite-border" size={50} color="#888" />
          <Text style={styles.emptyText}>No Favorites found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdf9f9',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C00',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#f7bb07',
    marginLeft: 5,
  },
  heartIcon: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    marginTop: 10,
  },
});

export default Favorites;
