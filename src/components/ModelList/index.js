import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { updateFavorite, updateSelect, resetSelected } from '../../redux/actions';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../Header';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const ITEM_WIDTH = SCREEN_WIDTH < 340 ? 125 : 150;
const ITEM_HEIGHT = SCREEN_WIDTH < 340 ? 125 : 150;

const ModelList = ({ data }) => {
  const [getNumColumn, setNumColumn] = React.useState(null);
  const [getMargin, setMargin] = React.useState(null);
  const [model, setModel] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState([]);
  const [isSelectDisplay, setIsSelectDisplay] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {

      calNumColumn().then(res => {
        if (res !== getNumColumn) {
          console.log(res);
          setNumColumn(res);
        }
      });

      const dimensions = Dimensions;
      dimensions.addEventListener('change', ({ window: { width, height } }) => {
        calNumColumn().then(res => {
          if (res !== getNumColumn) {
            console.log(res);
            setNumColumn(res);
          }
        });
      });

      const getPropModel = async () => {
        try {
          if (data) {
            setModel(data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getPropModel();
    }

    return () => {
      isMounted = false;
    };
  }, [data]);

  const calNumColumn = () => {
    const screenWidth = Dimensions.get('window').width;

    setMargin(Math.floor(((screenWidth / ITEM_WIDTH) % 1) * 10));

    return Promise.resolve(Math.floor(screenWidth / ITEM_WIDTH));
  };

  const onFavoriteClick = index => {
    if (isSelectDisplay) {
      setIsSelectDisplay(false);
      resetModelSelected();
    }

    let updateModel = model;
    if (updateModel && updateModel[index]) {
      const isFavorite = updateModel[index].isFavorite ? false : true;
      updateModel[index].isFavorite = isFavorite;
      setModel([...updateModel]);

      dispatch(updateFavorite(index, isFavorite));
    }
  };

  const onSelectedClick = index => {
    let updateModel = model;

    if (updateModel && updateModel[index]) {
      const isSelected = updateModel[index].isSelected ? false : true;
      updateModel[index].isSelected = isSelected;
      setModel([...updateModel]);

       dispatch(updateSelect(index, isSelected));
    }
  };

  const resetModelSelected = () => {
    let updateModel = model;
    if (updateModel.length > 0) {
      updateModel.forEach(item => (item.isSelected = false));
    }

    setModel([...updateModel]);
    dispatch(resetSelected());
  };

  const onPressClick = index => {
    if (isSelectDisplay) {
      onSelectedClick(index);

      return;
    }
  };

  const onLongPressClick = index => {
    if (isSelectDisplay) {
      setIsSelectDisplay(false);
      resetModelSelected();

      return;
    }

    setIsSelectDisplay(true);
    onSelectedClick(index);
  };

  const ItemsElement = ({ item, index }) => {
    return (
      <View style={[styles.container, { margin: getMargin }]}>
        <TouchableOpacity
          style={styles.items.wrap}
          onPress={() => onPressClick(index)}
          onLongPress={() => onLongPressClick(index)}
          delayLongPress={400}>
          <View style={styles.items.wrap.menu}>
            {isSelectDisplay ? (
              <TouchableOpacity onPress={() => onSelectedClick(index)}>
                {item.isSelected ? (
                  <MaterialIcons
                    name="check-circle"
                    size={ITEM_WIDTH === 150 ? 20 : 14}
                    color={'#1877F2'}
                  />
                ) : (
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={ITEM_WIDTH === 150 ? 20 : 14}
                    color={'#c6c6c6'}
                  />
                )}
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
          <View style={ styles.items.wrap.content }>
            <View style={ styles.items.logo }>
              <Image
                style={ styles.items.img }
                resizeMode="contain"
                source={ item.objUri }
              />
            </View>
          </View>
          <View style={ styles.items.wrap.details }>
            <View style={ styles.items.wrap.details.header }>
              <View style={ styles.items.name }>
                <Text style={ styles.items.name.text }>{ item.name }</Text>
              </View>
              <View style={ styles.items.size }>
                <Text style={ styles.items.size.text }>{ item.size }</Text>
              </View>
            </View>
            <View style={ styles.items.wrap.details.favorite }>
              <TouchableOpacity onPress={() => onFavoriteClick(index)}>
                <AntDesign
                  name="heart"
                  size={ ITEM_WIDTH === 150 ? 18 : 14 }
                  color={ item.isFavorite ? '#ff0000' : '#e8e8e8' }
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
    <Header routeName='Gallery'/>
    <SafeAreaView
      style={
        model.length >= getNumColumn
          ? { alignItems: 'center'}
          : { alignItems: 'flex-start'}
      }>
      <FlatList
        key={ getNumColumn }
        numColumns={ getNumColumn }
        data={ model }
        renderItem={ ItemsElement }
        keyExtractor={ (item, index) => item.id + index }
      >
      </FlatList>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  items: {
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 25,
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      padding: 8,
      backgroundColor: '#FFFFFF',
      shadowColor: '#8B8B8B',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

      menu: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      content: {
        flex: 4,
      },
      details: {
        flex: 2,
        flexDirection: 'row',
        // paddingLeft: 10,
        // paddingRight: 10,

        header: {
          flex: 3,
        },
        favorite: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
    logo: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      justifyContent: 'flex-start',
      text: {
        fontSize: ITEM_WIDTH === 150 ? 14 : 12,
        fontWeight: 'bold',
        color: '#000',
      },
    },
    size: {
      justifyContent: 'flex-start',
      text: {
        fontSize: ITEM_WIDTH === 150 ? 10 : 8,
        color: '#000',
      },
    },
    img: {
      width: '100%',
      height: '100%',
      aspectRatio: 1.5,
    },
  },
});

export default ModelList;
