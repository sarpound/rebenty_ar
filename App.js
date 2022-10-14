import { View, Text } from 'react-native';
import React from 'react';
import Routes from './src/routes';
import { createStore } from "redux";
import rootReducer from "./src/redux/reducer";
import { Provider } from "react-redux";

import { appStyles } from './src/styles';

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider 
      store={ store } 
    >
      <View style={[appStyles.flex1, appStyles.bluePearl]}>
        {/* <Header/> */}
        <Routes/>
      </View>
    </Provider>
  );
}
