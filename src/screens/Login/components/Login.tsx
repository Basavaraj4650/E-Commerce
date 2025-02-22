import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../constants/theme';
import Icon from 'react-native-vector-icons/Entypo';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import {LoginUser} from '../service/login.services';
import {validateEmail, validatePassword} from '../../../shared/validation';
import {CustomButton} from '../../../components/Button';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const Login = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    password: '',
  });
  const [pwdVisible, setPwdVisible] = useState(false);

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

  const handleLogin = async () => {
    let updatedErrorMessages = {...errorMessages};

    const userData = {
      username: formData.username.trim(),
      password: formData.password.trim(),
    };

    // if (!validateEmail(userData.username)) {
    //   updatedErrorMessages.username = 'Invalid email address';
    // }

    // if (!validatePassword(userData.password)) {
    //   updatedErrorMessages.password =
    //     'Password must be between 8 and 16 characters long and contain alphanumeric and special characters.';
    // }

    if (userData.username === '') {
      updatedErrorMessages.username = 'Invalid User Name';
    }

    if (userData.password === '') {
      updatedErrorMessages.password = 'Invalid Password.';
    }

    setErrorMessages(updatedErrorMessages);

    if (!updatedErrorMessages.username && !updatedErrorMessages.password) {
      try {
        const res = await LoginUser(userData);
        if (res?.token) {
          ToastAndroid.show('Loged in Successfully', ToastAndroid.SHORT);
          navigation.navigate('Dashboard');
        }
      } catch (error) {
        console.log('error---->', JSON.stringify(error));
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.loginText}>Login !</Text>
      <>
        <Text style={styles.subtitle}>User Name</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          placeholder="Enter Your Email"
          placeholderTextColor="#666"
          onChangeText={handleChange('username')}
        />
        {errorMessages.username ? (
          <Text style={styles.errorText}>{errorMessages.username}</Text>
        ) : null}
      </>
      <>
        <Text style={styles.subtitle}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={formData.password}
            secureTextEntry={!pwdVisible}
            placeholder="Enter Your Password"
            placeholderTextColor="#666"
            onChangeText={handleChange('password')}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => {
              setPwdVisible(!pwdVisible);
            }}>
            <Icon
              name={pwdVisible ? 'eye' : 'eye-with-line'}
              size={25}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {errorMessages.password ? (
          <Text style={styles.errorText}>{errorMessages.password}</Text>
        ) : null}
      </>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}>
        <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
      </TouchableOpacity>

      <CustomButton title="Log in" onPress={handleLogin} />

      <View style={styles.lineContainer}>
        <View style={styles.subLineContainer} />
        <Text style={styles.lineContainerText}>OR</Text>
        <View style={styles.subLineContainer} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('../../../assets/google_icon.png')}
          style={styles.socialIcon}
        />
        <Text style={styles.socialButtonText}>Continue with Google</Text>
      </TouchableOpacity>
      <View style={[styles.signUpContainer, {marginTop: height * 0.05}]}>
        <Text style={[styles.socialText, {color: COLORS.darkGrey}]}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}
          style={{marginLeft: width * 0.01}}>
          <Text style={[styles.socialText]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
