import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/constants/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Cart} from './src/screens/Cart';
import {Profile, ProfileDetails} from './src/screens/Profile';
import {CategoryProducts, Home} from './src/screens/Home';
import {
  ChangePassword,
  ForgotPassword,
  Login,
  Signup,
} from './src/screens/Login';
import DynamicIcon from './src/components/DynamicIcon';
import {Product, ProductDetails} from './src/screens/Product';
import {useEffect, useState} from 'react';
import {getFromLocalStorage} from './src/shared/localStore';
import {Favorites} from './src/screens/Favorites';
import {NetworkProvider} from './src/components/NetworkContext';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const queryClient = new QueryClient();
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = await getFromLocalStorage('isLoggedIn');
      if (isLoggedIn) {
        setInitialRoute('Dashboard');
      } else {
        setInitialRoute('Login');
      }
    };
    checkLoginStatus();
  }, []);

  if (!initialRoute) {
    return null;
  }

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.black,
        }}>
        <Tab.Screen
          name="MainHome"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <DynamicIcon
                library="FontAwesome"
                name="home"
                color={color}
                size={size}
              />
            ),
            headerTitle: 'Home',
          }}
        />
        <Tab.Screen
          name="Products"
          component={Product}
          options={{
            tabBarIcon: ({color, size}) => (
              <DynamicIcon
                library="FontAwesome"
                name="shopping-bag"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({color, size}) => (
              <DynamicIcon
                library="AntDesign"
                name="heart"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color, size}) => (
              <DynamicIcon
                library="FontAwesome"
                name="shopping-cart"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <DynamicIcon
                library="FontAwesome"
                name="user"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NetworkProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={initialRoute}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen
              name="CategoryProducts"
              component={CategoryProducts}
            />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Dashboard" component={HomeTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </NetworkProvider>
    </QueryClientProvider>
  );
};

export default App;
