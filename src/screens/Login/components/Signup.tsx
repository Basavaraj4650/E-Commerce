import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {COLORS} from '../../../constants/theme';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import {signup} from '../service/login.services';
import {validateEmail, validatePassword} from '../../../shared/validation';
import {CustomButton} from '../../../components/Button';
import DynamicIcon from '../../../components/DynamicIcon';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

type ErrorMessagesType = {
  username: string;
  email: string;
  password: string;
  city: string;
  phone: string;
  street: string;
};

const Signup = ({navigation}: Props) => {
  const {width, height} = useWindowDimensions();
  const [isLandscapeMode, setIsLandscapeMode] = useState(isLandscape());
  const styles = useMemo(
    () => style(width, height, isLandscapeMode),
    [width, height, isLandscapeMode],
  );

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    street: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    password: '',
    city: '',
    phone: '',
    street: '',
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

  const handleSignup = async () => {
    let updatedErrorMessages = {...errorMessages};
    const isValidPhone = /^\d{10}$/.test(formData.phone);

    const requiredFields: (keyof typeof formData)[] = [
      'username',
      'email',
      'phone',
      'password',
      'city',
      'street',
    ];

    const newErrors: ErrorMessagesType = {
      username: '',
      email: '',
      password: '',
      city: '',
      phone: '',
      street: '',
    };

    let validationFailed = false;

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        validationFailed = true;
      }
    });

    if (!isValidPhone) {
      newErrors.phone = 'Phone number must be 10 digits';
      validationFailed = true;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be between 8 and 16 characters long and contain alphanumeric and special characters.';
      validationFailed = true;
    }

    if (!validateEmail(formData.email)) {
      updatedErrorMessages.email = 'Invalid email address';
    }

    setErrorMessages(newErrors);

    if (validationFailed) {
      return;
    }

    setErrorMessages(updatedErrorMessages);

    const payload = {
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: formData.password.trim(),
      name: {
        firstname: formData.username.trim(),
        lastname: '',
      },
      address: {
        city: formData.city.trim(),
        street: formData.street.trim(),
        number: '',
        zipcode: '',
        geolocation: {
          lat: '',
          long: '',
        },
      },
      phone: formData.phone.trim(),
    };

    try {
      const res = await signup(payload);
      if (res) {
        ToastAndroid.show('User Created Successfully', ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('error---->', JSON.stringify(error));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text
        style={[
          styles.loginText,
          {marginBottom: isLandscapeMode ? height * 0.06 : height * 0.03},
        ]}>
        SignUp !
      </Text>
      <>
        <Text style={styles.subtitle}>User Name</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          placeholder="Enter Name"
          placeholderTextColor="#666"
          onChangeText={handleChange('username')}
        />
        {errorMessages.username ? (
          <Text style={styles.errorText}>{errorMessages.username}</Text>
        ) : null}
      </>
      <>
        <Text style={styles.subtitle}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          placeholder="Enter Email"
          placeholderTextColor="#666"
          onChangeText={handleChange('email')}
        />
        {errorMessages.email ? (
          <Text style={styles.errorText}>{errorMessages.email}</Text>
        ) : null}
      </>
      <>
        <Text style={styles.subtitle}>Phone</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          placeholder="Enter phone Number"
          placeholderTextColor="#666"
          onChangeText={handleChange('phone')}
          keyboardType="numeric"
        />
        {errorMessages.phone ? (
          <Text style={styles.errorText}>{errorMessages.phone}</Text>
        ) : null}
      </>
      <>
        <Text style={styles.subtitle}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          placeholder="Enter city"
          placeholderTextColor="#666"
          onChangeText={handleChange('city')}
        />
        {errorMessages.city ? (
          <Text style={styles.errorText}>{errorMessages.city}</Text>
        ) : null}
      </>
      <>
        <Text style={styles.subtitle}>Address</Text>
        <TextInput
          style={styles.input}
          value={formData.street}
          placeholder="Enter Address"
          placeholderTextColor="#666"
          onChangeText={handleChange('street')}
        />
        {errorMessages.street ? (
          <Text style={styles.errorText}>{errorMessages.street}</Text>
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
            <DynamicIcon
              library="Entypo"
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
      <View style={{marginTop: 20}}>
        <CustomButton title="Sign up" onPress={handleSignup} />
      </View>

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
      <View style={[styles.signUpContainer, {marginBottom: 20}]}>
        <Text style={[styles.socialText, {color: COLORS.darkGrey}]}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{marginLeft: width * 0.01}}>
          <Text style={[styles.socialText]}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;
