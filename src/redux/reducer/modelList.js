import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialState = [
    {
        id: 0,
        name: 'pokemon!',
        objName: 'pikachu.png',
        objUri: require('../../assests/images/pikachu.png'),
        size: '3.80 MB',
        isFavorite: false,
        isSelected: false
    }
];

const addModel = async (model) => {
    try {
        const modelfromLocal = await AsyncStorage.getItem('model');

        if (modelfromLocal) {
            let modelResObj = JSON.parse(modelfromLocal);
            model.id = model.id + modelResObj.length;
            modelResObj.push(model);
            initialState = modelResObj;
            modelResObj = JSON.stringify(modelResObj);
            await AsyncStorage.setItem('model', modelResObj);

            return { status: 'OK', data: initialState};
        } else {
            return { status: 'ERROR', error: 'Cannot get model from local storage!' };
        }
    } catch (error) {

        return { status: 'ERROR', error: error };
    }
};

const loadModel = async () => {
    try {
        await AsyncStorage.setItem('model', '');
        const modelfromLocal = await AsyncStorage.getItem('model');
        if (modelfromLocal) {
            initialState = JSON.parse(modelfromLocal);

            return { status: 'OK', data: initialState};
        } else {
            const initialStateString = JSON.stringify(initialState);
            await AsyncStorage.setItem('model', initialStateString);

            return { status: 'OK', data: initialState};
        }
    } catch (error) {
        return { status: 'ERROR', error: error };
    }
}

const updateModel = async (type, index, isFavorite) => {
    try {
        let isUpdated = false;

        if (
            initialState &&
            initialState[index]
        ) {
            if (type === 'UPDATE_FAVORITE') {
                initialState[index].isFavorite = isFavorite;
                initialState.forEach(item => item.isSelected = false);
                isUpdated = true;
            }

            if (isUpdated) {
                const initialStateString = JSON.stringify(initialState);
                console.log(initialState);
                await AsyncStorage.setItem('model', initialStateString);
            }
        } else {

            return { status: 'WARN', message: 'Cannot find model by index.' };
        }

        return { status: 'OK', data: initialState};
    } catch (error) {

        return { status: 'ERROR', type: type, error: error };
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_MODEL':
            return addModel(action.payload);
        case 'DELETE_MODEL':
            return 0;
        case 'UPDATE_FAVORITE':
            return updateModel('UPDATE_FAVORITE', action.payload.index, action.payload.isFavorite);
        default:
            return loadModel();
    }
}