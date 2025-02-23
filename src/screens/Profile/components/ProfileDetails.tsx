import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  useWindowDimensions,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {
  isLandscape,
  subscribeToOrientationChanges,
} from '../../../shared/orientation';
import {style} from '../style';
import {validateEmail} from '../../../shared/validation';
import {CustomButton} from '../../../components/Button';
import {AlertType} from '../../../constants/config';
import CustomAlert from '../../../components/CustomAlert';
import {Loader} from '../../../components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserSignupData} from '../../Login/service/login.interface';
import {getUserData, upadteProfile} from '../service/profile.services';
import DynamicIcon from '../../../components/DynamicIcon';
import {COLORS} from '../../../constants/theme';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

type ErrorMessagesType = {
  username: string;
  email: string;
  city: string;
  phone: string;
  street: string;
};

const ProfileDetails = ({navigation}: Props) => {
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
    city: '',
    street: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    username: '',
    email: '',
    city: '',
    phone: '',
    street: '',
  });

  const [isLoading, setIsLoading] = useState<boolean | false>(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertType>('error');
  const alertRef = useRef<{show: () => void; hide: () => void}>(null);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscapeMode(isLandscape());
    };
    const unsubscribe = subscribeToOrientationChanges(handleOrientationChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserData();
        if (userData) {
          setFormData({
            username: userData.username || '',
            email: userData.email || '',
            phone: '9900144699',
            city: userData.address.city || '',
            street: userData.address.street || '',
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setAlertMessage('Something Went Wrong');
          setAlertType('error');
          alertRef.current?.show();
        }
      } catch (error: any) {
        setIsLoading(false);
        setAlertMessage(error?.response?.data || 'Something Went Wrong');
        setAlertType('error');
        alertRef.current?.show();
      }
    };
    fetchData();
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
      'city',
      'street',
    ];

    const newErrors: ErrorMessagesType = {
      username: '',
      email: '',
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

    if (!validateEmail(formData.email)) {
      updatedErrorMessages.email = 'Invalid email address';
    }

    setErrorMessages(newErrors);

    if (validationFailed) {
      return;
    }

    setErrorMessages(updatedErrorMessages);

    const payload: UserSignupData = {
      email: formData.email.trim(),
      username: formData.username.trim(),
      password: '',
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
      setIsLoading(true);
      const res = await upadteProfile(payload);

      if (res) {
        setIsLoading(false);
        ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        setIsLoading(false);
        setAlertMessage('Something Went Wrong');
        setAlertType('error');
        alertRef.current?.show();
      }
    } catch (error: any) {
      setIsLoading(false);
      setAlertMessage(error?.response?.data || 'Something Went Wrong');
      setAlertType('error');
      alertRef.current?.show();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading && <Loader />}
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcon}>
            <DynamicIcon
              library="MaterialIcons"
              name="arrow-back-ios"
              size={24}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
        </View>
        <View style={styles.profileDetailsContainer}>
          <Image
            source={require('../../../assets/User.png')}
            style={styles.profileDetailsImage}
          />
        </View>
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
        <View style={{marginTop: 20}}>
          <CustomButton title="Update Profile" onPress={handleSignup} />
        </View>
      </ScrollView>
      <CustomAlert
        ref={alertRef}
        type={alertType}
        message={alertMessage}
        saveLabel="Okay"
        cancelLabel="Cancel"
        onSave={() => {
          alertRef.current?.hide();
        }}
        onCancel={() => {
          alertRef.current?.hide();
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileDetails;
