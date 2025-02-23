import {StyleSheet} from 'react-native';

export const style = (
  width: number,
  height: number,
  isLandscapeMode: boolean,
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 230,
    },
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
      marginBottom: isLandscapeMode ? height * 0.05 : height * 0.025,
      alignItems: 'center',
    },
    productImage: {
      width: isLandscapeMode ? 200 : 120,
      height: isLandscapeMode ? 300 : 180,
      borderRadius: 10,
    },
    productDetails: {
      flex: 1,
      marginLeft: 10,
    },
    productTitle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    productDescription: {
      color: '#888',
      fontSize: 14,
      marginTop: isLandscapeMode ? height * 0.02 : height * 0.01,
    },
    productPrice: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: isLandscapeMode ? height * 0.04 : height * 0.02,
    },
    ratingContainer: {
      marginTop: isLandscapeMode ? height * 0.008 : height * 0.004,
    },
    ratingText: {
      color: '#FFD700',
      fontSize: 14,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: isLandscapeMode ? height * 0.02 : height * 0.01,
    },
    quantityButton: {
      backgroundColor: '#222',
      padding: 10,
      borderRadius: 8,
      minWidth: 40,
      alignItems: 'center',
    },
    quantityButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantityText: {
      color: '#fff',
      fontSize: 18,
      marginHorizontal: isLandscapeMode ? width * 0.08 : width * 0.04,
    },
    removeButton: {
      marginTop: isLandscapeMode ? height * 0.04 : height * 0.02,
      padding: 8,
      backgroundColor: '#B22222',
      borderRadius: 8,
    },
    removeButtonText: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'center',
    },
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
      marginBottom: isLandscapeMode ? height * 0.016 : height * 0.008,
    },
    totalContainer: {
      borderTopWidth: 1,
      borderTopColor: '#444',
      marginBottom: isLandscapeMode ? height * 0.06 : height * 0.03,
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
};
