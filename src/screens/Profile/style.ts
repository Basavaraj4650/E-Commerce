import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

export const style = (
  width: number,
  height: number,
  isLandscapeMode: boolean,
) => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
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
  });
};
