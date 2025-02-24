import {StyleSheet} from 'react-native';

export const style = (
  width: number,
  height: number,
  isLandscapeMode: boolean,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a1a',
    },
    productList: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    productItem: {
      backgroundColor: '#333',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      margin: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    productImage: {
      width: '100%',
      height: isLandscapeMode ? height * 0.42 : height * 0.2,
      borderRadius: 10,
    },
    productTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
      color: '#fff',
    },
    productPrice: {
      fontSize: 14,
      color: '#FF8C00',
      fontWeight: 'bold',
    },
    discountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      alignItems: 'center',
    },
    discountBadge: {
      backgroundColor: 'red',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 5,
    },
    productDiscount: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold',
    },
    horizontalCard: {
      width: isLandscapeMode ? width * 0.35 : width * 0.5,
      height: isLandscapeMode ? height * 0.45 : height * 0.15,
      marginRight: 15,
      borderRadius: 10,
      overflow: 'hidden',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    categoryNameContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 5,
      alignItems: 'center',
    },
    categoryName: {
      fontSize: 14,
      color: '#fff',
      fontWeight: 'bold',
    },
    section: {
      marginVertical: 10,
      paddingHorizontal: 15,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    seeAllText: {
      fontSize: 14,
      color: '#FF8C00',
      fontWeight: 'bold',
    },
    categaryProductCard: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      margin: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      flexDirection: 'row',
    },
    categaryProductImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },
    categaryProductDetails: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center',
    },
    categaryProductTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },

    productDescription: {
      fontSize: 12,
      color: '#555',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      paddingHorizontal: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: '#fff',
    },
    searchIcon: {
      marginLeft: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 10,
      fontSize: 16,
      color: '#000',
    },
  });
};
