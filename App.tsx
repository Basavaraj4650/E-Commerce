import {NavigationContainer} from '@react-navigation/native';
import {COLORS} from './src/constants/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from 'react-query';

import {Cart} from './src/screens/Cart';
import {Profile, ProfileDetails} from './src/screens/Profile';
import {Home} from './src/screens/Home';
import {ForgotPassword, Login, Signup} from './src/screens/Login';
import ChangePassword from './src/screens/Login/components/ChangePassword';
import DynamicIcon from './src/components/DynamicIcon';
import {ProductDetails} from './src/screens/Product';
import Product from './src/screens/Product/components/Product';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const queryClient = new QueryClient();

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
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
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
          <Stack.Screen name="Dashboard" component={HomeTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
