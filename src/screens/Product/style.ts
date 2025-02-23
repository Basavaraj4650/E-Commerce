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
    productImage: {
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
      fontSize: 24,
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
  });
};
