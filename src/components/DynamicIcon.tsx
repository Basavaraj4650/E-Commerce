import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type IconLibrary =
  | 'Ionicons'
  | 'Feather'
  | 'FontAwesome'
  | 'Entypo'
  | 'AntDesign'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons';

type DynamicIconProps = {
  library: IconLibrary;
  name: string;
  size: number;
  color: string;
};

const DynamicIcon = ({library, name, size, color}: DynamicIconProps) => {
  switch (library) {
    case 'Ionicons':
      return <Icon name={name} size={size} color={color} />;
    case 'Feather':
      return <Feather name={name} size={size} color={color} />;
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} />;
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'MaterialIcons':
      return <MaterialIcons name={name} size={size} color={color} />;
    default:
      return null;
  }
};

export default DynamicIcon;
