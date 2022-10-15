import React from 'react';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import BottomTab from './Navigators/BottomTab';

import { useDispatch } from 'react-redux';

export const navigationRef = createNavigationContainerRef();

export default function Route() {
    const [routeName, setRouteName] = React.useState();
    const dispatch = useDispatch();
    return (
        <NavigationContainer ref={ navigationRef }
            onReady={() => {
                const routeName = navigationRef.getCurrentRoute().name;
                setRouteName(routeName);
            }}
            onStateChange={async () => {
                const previousRouteName = routeName;
                const currentRouteName = navigationRef.getCurrentRoute().name;
                console.log("route", currentRouteName);
                setRouteName(currentRouteName);
        }}>
            <BottomTab/>
        </NavigationContainer>
    );
}