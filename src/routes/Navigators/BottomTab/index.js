import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GalleryStackScreen from '../NativeStack/GalleryStackScreen';
import OtherStackScreen from '../NativeStack/OtherStackScreen';
import { navigatorBottomStyle, tabBottomStyle } from './styles'

const Tab = createMaterialTopTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName='HomeStackScreen'
            screenOptions={navigatorBottomStyle}>
            <Tab.Screen name='GalleryScreen' component={GalleryStackScreen} options={tabBottomStyle.Gallery} />
            <Tab.Screen name='OtherScreen' component={OtherStackScreen} options={tabBottomStyle.Others} />
        </Tab.Navigator>
    )
}
