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
    },
    appSettingTitle: {
      marginTop: height * 0.036,
      color: COLORS.white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 16,
      borderRadius: 8,
      marginTop: height * 0.03,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    profileDetailsContainer: {
      alignItems: 'center',
      padding: 16,
    },
    profileDetailsImage: {
      width: 100,
      height: 100,
    },
    profileTextContainer: {
      flex: 1,
      marginLeft: width * 0.039,
    },
    profileName: {
      flex: 1,
      fontSize: 19,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    settingContainer: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 8,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderRadius: 8,
    },
    settingText: {
      flex: 1,
      marginLeft: width * 0.039,
      fontSize: 16,
      color: COLORS.black,
      fontWeight: '600',
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.024,
      position: 'relative',
      marginBottom: height * 0.036,
    },
    backIcon: {
      position: 'absolute',
      left: 0,
    },
    title: {
      fontSize: 21,
      fontWeight: '700',
      color: COLORS.white,
    },
  });
};
