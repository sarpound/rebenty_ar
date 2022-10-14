import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const navigatorBottomStyle = {
    tabBarActiveTintColor: '#000000',
    tabBarInactiveTintColor: '#ABABAB',
    tabBarStyle: [{ backgroundColor: '#FFFFFF'}],
    tabBarShowLabel: false
};

const tabBottomStyle = {
    Gallery: {
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcon name='view-dashboard' size={25} color={color} />
        ),
    },
    Others: {
        tabBarIcon: ({ color, size }) => (
            <FeatherIcon name='more-horizontal' size={25} color={color} />
        ),
    }
};

export {navigatorBottomStyle, tabBottomStyle}