import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector } from "react-redux";

import { openDocumentFile } from '../../utils';

const CircularNavigation = () => {
  const [model, setModel] = React.useState([]);
  const [isSelected, setIsSelected] = React.useState(false);
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
        isSelectedDisplay(res.data);
      } else if (res && res.error) {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isSelectedDisplay = (model) => {
    const modelSelected = model.filter(item => item.isSelected);
    console.log(modelSelected);
    if (modelSelected.length > 0) {
      setIsSelected(true);
      return;
    }
    setIsSelected(false);
  }

  return (
    <View style={styles.container}>
      {
        isSelected ?
          <>
            <View style={ [styles.circle.wrap, styles.shadow] }>
              <Material name='delete' size={ 30 } color={ '#ffff' } />
            </View>
            <View style={ [styles.circle.wrap, styles.shadow] }>
              <Material name='cancel' size={ 30 } color={ '#ffff' } />
            </View>
          </>
          :
          <>
            <View style={ [styles.circle.wrap, styles.shadow] }>
              <Material name='video-3d' size={ 30 } color={ '#ffff' } />
            </View>
            <View style={ [styles.circle.wrap, styles.shadow] }>
              <TouchableOpacity onPress={() => openDocumentFile() }>
                <FeatherIcon name='plus' size={ 30 } color={ '#ffff' } />
              </TouchableOpacity>
            </View>
          </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  circle: {
    wrap: {
      width: 50,
      height: 50,
      borderRadius: 50,
      marginBottom: 10,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
    }
  }
});

export default CircularNavigation;