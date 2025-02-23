import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

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
      justifyContent: 'center',
    },
    loginText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: isLandscapeMode ? height * 0.2 : height * 0.12,
      color: '#fff',
    },
    errorText: {
      color: 'red',
    },
    subtitle: {
      fontSize: 15,
      color: COLORS.lightGray,
      fontWeight: '600',
      marginBottom: isLandscapeMode ? height * 0.02 : height * 0.01,
      marginTop: isLandscapeMode ? height * 0.04 : height * 0.02,
    },
    input: {
      width: '100%',
      height: isLandscapeMode ? height * 0.13 : height * 0.065,
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 15,
      fontSize: 16,
      color: '#fff',
      backgroundColor: '#333',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#333',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#333',
    },
    passwordInput: {
      flex: 1,
      height: isLandscapeMode ? height * 0.13 : height * 0.065,
      paddingHorizontal: 15,
      fontSize: 16,
      color: '#fff',
    },
    eyeIcon: {
      padding: 10,
    },
    socialButton: {
      width: '100%',
      height: isLandscapeMode ? height * 0.13 : height * 0.065,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderColor: '#333',
      borderWidth: 1,
      marginBottom: isLandscapeMode ? height * 0.06 : height * 0.03,
      backgroundColor: '#333',
    },
    socialIcon: {
      width: 24,
      height: 24,
      marginRight: isLandscapeMode ? width * 0.02 : width * 0.03,
    },
    socialButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    lineContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: isLandscapeMode ? height * 0.06 : height * 0.03,
    },
    subLineContainer: {
      flex: 1,
      height: 1.5,
      backgroundColor: COLORS.lightGray,
    },
    lineContainerText: {
      marginHorizontal: isLandscapeMode ? height * 0.02 : height * 0.01,
      color: COLORS.darkGrey,
      fontWeight: 'bold',
      fontSize: 14,
    },
    forgotPassword: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignSelf: 'center',
      marginLeft: isLandscapeMode ? width * 0.18 : width * 0.14,
      marginVertical: isLandscapeMode ? height * 0.04 : height * 0.02,
    },
    forgotPasswordText: {
      fontWeight: 'bold',
    },
    socialText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    signUpContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
