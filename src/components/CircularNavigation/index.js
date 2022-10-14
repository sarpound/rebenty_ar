import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { openDocumentFile } from '../../utils';

const CircularNavigation = () => {

  return (
    <View style={ styles.container }>
      <View style={ [styles.circle.wrap, styles.shadow] }>
        <Material name='video-3d' size={ 30 } color={ '#ffff' } />
      </View>
      <View style={ [styles.circle.wrap, styles.shadow] }>
        <TouchableOpacity onPress={() => openDocumentFile() }>
          <FeatherIcon name='plus' size={ 30 } color={ '#ffff' } />
        </TouchableOpacity>
      </View>
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