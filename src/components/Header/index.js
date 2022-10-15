import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { appStyles } from '../../styles';

export default function Header( { routeName } ) {
  const [getRouteName, setRouteName] = React.useState('N/A');

  React.useEffect(() => {
    setRouteName(routeName);
  },[routeName])

  return (
    <View style={[styles.container, appStyles.bluePearl]}>
      <Text style={ styles.container.header }>Rebenty AR.</Text>
      <Text style={ styles.container.text }>{ getRouteName }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative' ,
        width: '100%',
        padding: 20,

        header: {
            fontSize: 50,
            fontFamily: 'RobotoCondensed-Bold',
            color: '#000'
        },
        text: {
            fontSize: 50,
            fontFamily: 'RobotoCondensed-Bold',
            color: '#000'
        }
    }
});