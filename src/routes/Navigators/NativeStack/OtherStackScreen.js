import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtherScreen from '../../../views/OtherScreen';
import { tabStyle, navigatorStyle } from './styles';
const Tab = createNativeStackNavigator();

export default function OtherStackScreen() {
  return (
    <Tab.Navigator
    screenOptions={navigatorStyle}
    >
      <Tab.Screen name='Others' component={OtherScreen} options={tabStyle.Others}/>
      {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
    </Tab.Navigator>
  );
}