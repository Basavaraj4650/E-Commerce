import {StyleSheet} from 'react-native';

export const style = (
  width: number,
  height: number,
  isLandscapeMode: boolean,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000',
    },
    scrollViewContent: {
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: isLandscapeMode ? height * 0.05 : height * 0.025,
    },
    backButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      padding: 10,
      borderRadius: 50,
    },
    imageSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    thumbnailContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 10,
    },
    thumbnail: {
      width: isLandscapeMode ? height * 0.14 : height * 0.07,
      height: isLandscapeMode ? height * 0.16 : height * 0.08,
      marginVertical: isLandscapeMode ? height * 0.02 : height * 0.01,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'white',
    },
    productDetailImage: {
      flex: 1,
      height: isLandscapeMode ? height * 0.8 : height * 0.4,
      resizeMode: 'contain',
    },
    detailsContainer: {
      marginTop: isLandscapeMode ? height * 0.06 : height * 0.03,
    },
    priceRatingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: isLandscapeMode ? height * 0.024 : height * 0.012,
    },
    price: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
    note: {
      color: '#aaa',
      fontSize: 14,
      marginBottom: isLandscapeMode ? height * 0.024 : height * 0.012,
    },
    title: {
      color: '#fff',
      fontSize: 22,
      fontWeight: 'bold',
    },
    ratingContainer: {
      flexDirection: 'row',
      marginVertical: isLandscapeMode ? height * 0.024 : height * 0.012,
    },
    descriptionContainer: {
      backgroundColor: '#222F',
      marginTop: isLandscapeMode ? height * 0.028 : height * 0.014,
      marginBottom: isLandscapeMode ? height * 0.04 : height * 0.02,
      padding: 10,
      borderRadius: 10,
    },
    descriptionLabel: {
      color: 'white',
      fontSize: 15,
    },
    description: {
      color: '#aaa',
      fontSize: 16,
      marginTop: 5,
    },

    productList: {
      flexGrow: 1,
    },
    productItem: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      margin: 10,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      transform: [{scale: 1}],
    },
    discountedProduct: {
      borderWidth: 2,
      borderColor: '#FF8C00',
      backgroundColor: '#FFF3E0',
    },
    productImage: {
      width: '100%',
      height: isLandscapeMode ? height * 0.8 : height * 0.2,
      borderRadius: 10,
    },
    productTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: isLandscapeMode ? height * 0.024 : height * 0.012,
      textAlign: 'center',
      color: 'black',
    },
    productPrice: {
      fontSize: 14,
      color: '#FF8C00',
      fontWeight: 'bold',
    },
    discountContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: isLandscapeMode ? height * 0.016 : height * 0.008,
      alignItems: 'center',
    },
    discountBadge: {
      backgroundColor: 'red',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 5,
    },
    productDiscount: {
      fontSize: 14,
      color: 'white',
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    buttonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#6200ee',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      marginLeft: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
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
    noProductsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noProductsText: {
      fontSize: 18,
      color: '#888',
    },

    similarProductsContainer: {
      marginBottom: isLandscapeMode ? height * 0.04 : height * 0.02,
    },
    similarProductsTitle: {
      color: '#18FFFF',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    similarProductItem: {
      width: isLandscapeMode ? width * 0.2 : width * 0.4,
      marginHorizontal: isLandscapeMode ? width * 0.08 : width * 0.14,
      alignItems: 'center',
    },
    similarProductImage: {
      width: isLandscapeMode ? width * 0.3 : width * 0.6,
      height: isLandscapeMode ? height * 0.4 : height * 0.2,
      borderRadius: 10,
    },
    similarProductTitle: {
      color: '#fff',
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
    },
    similarProductPrice: {
      color: '#FFD700',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });
};
