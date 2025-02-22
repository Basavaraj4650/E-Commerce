import React, {useEffect, useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import {COLORS} from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomButton} from '../../../components/Button';
import {useQuery} from 'react-query';
import {getUserData} from '../service/services';
import DynamicIcon from '../../../components/DynamicIcon';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Profile = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscapeMode(isLandscape());
    };
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  const {data: user} = useQuery<any>(
    ['user'],
    () => {
      return getUserData();
    },
    {
      onSuccess: () => {
        console.log('Sucess--->');
      },
      onError: error => {
        console.log('error--->', JSON.stringify(error));
      },
    },
  );

  const handleLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://avatar.iran.liara.run/public/boy?username=Ash',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName} numberOfLines={2}>
            {user?.name?.firstname ? user.name.firstname : ''}
          </Text>
          <Text style={[styles.profileName, {fontSize: 14}]} numberOfLines={2}>
            {user?.email ? user.email : ''}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.appSettingTitle}>App settings</Text>
      </View>
      <View
        style={[
          styles.settingContainer,
          {
            marginTop: 20,
          },
        ]}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('Profile', {from: 'Settings'})}>
          <DynamicIcon
            library="FontAwesome"
            name="user-o"
            size={24}
            color="black"
          />
          <Text style={styles.settingText}>Profile</Text>
          <DynamicIcon
            library="Ionicons"
            name="chevron-forward"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.settingContainer,
          {
            marginBottom: 40,
            marginTop: 15,
          },
        ]}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate('ChangePassword')}>
          <DynamicIcon library="Feather" name="lock" size={24} color="black" />
          <Text style={styles.settingText}>Change password</Text>
          <DynamicIcon
            library="Ionicons"
            name="chevron-forward"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
      <CustomButton title="Logout" onPress={() => handleLogout()} />
    </ScrollView>
  );
};

export default Profile;
