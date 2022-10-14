import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const FolderLists = ({data}) => {
  const [getNumColumns, setNumColumns] = React.useState(0);
  const [getMargin, setMargin] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;

    calNumColumns().then(res => {
      if (res && isMounted && res !== getNumColumns) {
        console.log(res);
        setNumColumns(res);
      }
    });

    const dimensions = Dimensions;
    dimensions.addEventListener('change', ({window: {width, height}}) => {
      calNumColumns().then(res => {
        if (res && isMounted && res !== getNumColumns) {
          console.log(res);
          setNumColumns(res);
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const calNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;

    setMargin(Math.floor(((screenWidth / 150) % 1) * 10));

    return Promise.resolve(Math.floor(screenWidth / 150));
  };

  const ItemsElement = ({item}) => {
    return (
      <View style={[styles.container, {margin: getMargin}]}>
        <View style={styles.items.wrap}>
          <View style={styles.items.logo}>
            <Image
              style={styles.items.img}
              resizeMode="contain"
              source={require('../../assests/images/pikachu.png')}
            />
          </View>
          <View style={styles.items.name}>
            <Text style={styles.items.name.text}>{item.name}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={
        data.length > getNumColumns
          ? {alignItems: 'center', padding: 20}
          : {alignItems: 'flex-start', padding: 20}
      }>
      <FlatList
        key={getNumColumns}
        numColumns={getNumColumns}
        data={data}
        renderItem={ItemsElement}
        keyExtractor={(item, index) => item.id + index}></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  items: {
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 30,
      width: 150,
      height: 150,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    wrapEmpty: {
      width: 150,
      height: 150,
    },
    logo: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      flex: 0.2,
      justifyContent: 'flex-start',
      marginLeft: 20,
      text: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    img: {
      width: '100%',
      height: undefined,
      aspectRatio: 1.5,
    },
  },
});

export default FolderLists;
