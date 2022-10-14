import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GalleryScreen from '../../../views/GalleryScreen';
import { tabStyle, navigatorStyle } from './styles';
const Tab = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <Tab.Navigator
      screenOptions={navigatorStyle}>
      <Tab.Screen name='Gallery' component={GalleryScreen} options={tabStyle.Gallery}/>
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </Tab.Navigator>
  );
}
