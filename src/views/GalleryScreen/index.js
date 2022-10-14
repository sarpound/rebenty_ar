import { View, Text } from 'react-native';
import React, { useState } from 'react';
import ModelList from '../../components/ModelList';
import CircularNavigation from '../../components/CircularNavigation'
import { useSelector } from "react-redux";
import { appStyles } from '../../styles';

export default function GalleryScreen() {
  const [model, setModel] = useState(null);
  const ModelListRedux = useSelector(state => state.modelList);
  
  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      getModelFromRedux();
    }

    return () => {
      isMounted = false;
    };
  }, [ModelListRedux]);

  const getModelFromRedux = async () => {
    try {
      const res = await ModelListRedux;
      if (res && res.status === "OK") {
        setModel(res.data);
      } else if (res && res.error) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={ [appStyles.flex1, appStyles.bluePearl] }>
      <ModelList data={ model } />
      <CircularNavigation />
    </View>
  )
}