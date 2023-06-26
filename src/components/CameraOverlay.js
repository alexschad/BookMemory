import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useContext, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ACTIONS } from '../Reducer';
import { DataContext, DispatchContext } from '../Context';

const CameraOverlay = ({ title, isbn_13 }) => {
  if (!isbn_13 || isbn_13.length === 0) {
    return;
  }
  // const [data, setData] = useState(JSON.parse(jsonData));

  // console.log('JSON', json);
  // console.log('FULL', full_title);
  // console.log('ISBN13', isbn_13);

  const navigation = useNavigation();
  const dispatch = useContext(DispatchContext);

  const books = useContext(DataContext);
  const prevBooksLen = useRef(books?.length);

  useEffect(() => {
    if (prevBooksLen.current < books?.length) {
      // a book got added so we navigate back to the home view
      navigation.goBack();
    }
    prevBooksLen.current = books?.length;
  }, [navigation, books]);

  const addBook = () => {
    console.log('ADD', isbn_13[0]);
    if (
      !isbn_13[0] ||
      books.find((b) => {
        return b.isbn === isbn_13[0];
      })
    ) {
      navigation.goBack();
      return;
    }

    dispatch({
      type: ACTIONS.ADD_BOOK,
      payload: { title: title, isbn: isbn_13[0] },
    });
  };
  console.log('CXXXXXXXXXX', isbn_13[0]);

  return (
    <View style={styles.cameraContainer}>
      <Pressable onPress={addBook} style={styles.transparent}>
        <View style={styles.overlayContainer}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: `https://covers.openlibrary.org/b/isbn/${isbn_13[0]}-S.jpg`,
            }}
          />
          <Text style={styles.barcodeTextURL}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CameraOverlay;

const styles = StyleSheet.create({
  transparent: 'transparent',
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'red',
  },
  tinyLogo: {
    width: 40,
    height: 60,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    // left: 5,
  },
});
