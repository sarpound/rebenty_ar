const addModel = ( model ) => {
    return {
        type: 'ADD_MODEL',
        payload: model
    }
}

const addRouteName = ( routeName ) => {
    return {
        type: 'ADD_ROUTE_NAME',
        payload: {
            routeName: routeName
        }
    }
}

const updateFavorite = ( index, isFavorite ) => {
    return {
        type: 'UPDATE_FAVORITE',
        payload: {
            index: index,
            isFavorite: isFavorite
        }
    }
}

const getRouteName = () => {
    return {
        type: 'GET_ROUTE_NAME'
    }
}

export {addModel, updateFavorite, addRouteName, getRouteName};

