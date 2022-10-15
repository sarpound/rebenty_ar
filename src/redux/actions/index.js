const addModel = ( model ) => {
    return {
        type: 'ADD_MODEL',
        payload: model
    }
}

const updateSelect = ( index, isSelected ) => {
    return {
        type: 'UPDATE_SELECT',
        payload: {
            index: index,
            isSelected: isSelected
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

const resetSelected = () => {
        return {
        type: 'RESET_SELECT',
    }
}


export { addModel, updateFavorite, updateSelect, resetSelected };

