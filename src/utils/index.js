import DocumentPicker from 'react-native-document-picker';

export const openDocumentFile = async () => {
  try {
    const res = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
    });

    ///save redux tasks
    console.log(res);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log(err);
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};
