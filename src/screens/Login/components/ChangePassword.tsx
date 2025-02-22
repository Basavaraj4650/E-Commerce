import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import {CustomButton} from '../../../components/Button';
import {validatePassword} from '../../../shared/validation';
import {COLORS} from '../../../constants/theme';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const ChangePassword = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [newPwdVisible, setNewPwdVisible] = useState(false);
  const [confirmPwdVisible, setConfirmPwdVisible] = useState(false);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscapeMode(isLandscape());
    };
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  const handleChange = (name: string) => (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessages(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleChangePassword = () => {
    let updatedErrorMessages = {...errorMessages};

    const userData = {
      newPassword: formData.newPassword.trim(),
      confirmPassword: formData.confirmPassword.trim(),
    };

    if (!validatePassword(userData.newPassword)) {
      updatedErrorMessages.newPassword =
        'Password must be 8-16 characters and contain alphanumeric & special characters.';
    }

    if (
      !validatePassword(userData.confirmPassword) ||
      userData.newPassword !== userData.confirmPassword
    ) {
      updatedErrorMessages.confirmPassword =
        'Password does not match or is invalid. Please enter correctly.';
    }

    setErrorMessages(updatedErrorMessages);

    if (
      userData.newPassword &&
      userData.confirmPassword &&
      !updatedErrorMessages.newPassword &&
      !updatedErrorMessages.confirmPassword
    ) {
      //API CALL

      ToastAndroid.show('Password Changed successfully!', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={[styles.loginText, {marginBottom: 0}]}>
        Change Password?
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: COLORS.lightGray,
          fontWeight: '600',
          marginBottom: isLandscapeMode ? height * 0.06 : height * 0.1,
          marginTop: isLandscapeMode ? height * 0.02 : height * 0.01,
        }}>
        Your new password must be different from the previous used password
      </Text>
      <Text style={styles.subtitle}>New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={formData.newPassword}
          secureTextEntry={!newPwdVisible}
          placeholder="Enter New Password"
          placeholderTextColor="#666"
          onChangeText={handleChange('newPassword')}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            setNewPwdVisible(!newPwdVisible);
          }}>
          <Icon
            name={newPwdVisible ? 'eye' : 'eye-with-line'}
            size={25}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errorMessages.newPassword ? (
        <Text style={styles.errorText}>{errorMessages.newPassword}</Text>
      ) : null}

      <Text style={styles.subtitle}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          value={formData.confirmPassword}
          secureTextEntry={!confirmPwdVisible}
          placeholder="Confirm Password"
          placeholderTextColor="#666"
          onChangeText={handleChange('confirmPassword')}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => {
            setConfirmPwdVisible(!confirmPwdVisible);
          }}>
          <Icon
            name={confirmPwdVisible ? 'eye' : 'eye-with-line'}
            size={25}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errorMessages.confirmPassword ? (
        <Text style={styles.errorText}>{errorMessages.confirmPassword}</Text>
      ) : null}

      <View
        style={{
          marginTop: isLandscapeMode ? height * 0.08 : height * 0.04,
        }}>
        <CustomButton title="Change Password" onPress={handleChangePassword} />
      </View>
    </ScrollView>
  );
};

export default ChangePassword;
