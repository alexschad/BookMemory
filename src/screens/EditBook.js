import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tags from 'react-native-tags';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import { DataContext, DispatchContext } from '../Context';
import { ACTIONS } from '../Reducer';
import { useTheme } from '../ThemeManager';

const DelHeaderLink = ({ navigation, book }) => {
  const dispatch = useContext(DispatchContext);
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const deleteBook = () => {
    Alert.alert(
      'Delete the book?',
      'You will lose all book data...',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            navigation.navigate('Home');
            dispatch({
              type: ACTIONS.DELETE_BOOK,
              payload: { id: book.id },
            });
          },
        },
      ],
      { cancelable: false },
    );
  };
  return (
    <Pressable onPress={deleteBook} style={styles.navHeaderLink}>
      <AntIcon name="delete" size={20} color={COLORS.buttonAction} />
    </Pressable>
  );
};

const EditBook = ({ route }) => {
  const { bookId } = route.params;
  const dispatch = useContext(DispatchContext);
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const books = useContext(DataContext);
  const book = books.find((e) => e.id === bookId);

  const [title, setTitle] = useState(book ? book.title : '');
  const onChangeTitle = (textValue) => setTitle(textValue.substr(0, 100));

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        let header;
        if (book) {
          header = <Text>{book.title}</Text>;
        }
        return header;
      },
      headerRight: () => <DelHeaderLink navigation={navigation} book={book} />,
    });
  }, [navigation, book, styles]);

  const editBook = () => {
    if (!title) {
      Alert.alert(
        'No title',
        'Every book must have a title.',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      dispatch({
        type: ACTIONS.EDIT_BOOK_DATA,
        payload: {
          bookId,
          title,
        },
      });
    }
  };

  const editTags = (tags) => {
    dispatch({
      type: ACTIONS.EDIT_BOOK_TAGS,
      payload: { bookId, tags },
    });
  };

  if (!book) {
    return null;
  }

  return (
    <SafeAreaView style={styles.body} forceInset="top">
      <KeyboardAwareContainer>
        <ScrollView>
          <Text style={styles.formLabel}>Title:</Text>
          <View style={styles.container}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={COLORS.placeholderText}
              style={{ ...styles.smallInput, ...styles.border }}
              onChangeText={onChangeTitle}
              onBlur={editBook}
              value={title}
            />
          </View>
          <Text style={styles.formLabel}>Tags</Text>
          <Tags
            textInputProps={{
              placeholder: 'Tag title',
              selectionColor: COLORS.text,
            }}
            initialTags={book.tags}
            createTagOnReturn
            createTagOnString={[',']}
            onChangeTags={editTags}
            inputStyle={styles.tagInputStyle}
            inputContainerStyle={styles.tagInputContainerStyle}
            style={{ minHeight: hp('4%') }}
            renderTag={({ tag, index, onPress }) => (
              <TouchableOpacity
                key={`${tag}-${index}`}
                style={styles.tagItemContainer}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.tagDelete}>X</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </KeyboardAwareContainer>
    </SafeAreaView>
  );
};

export default EditBook;
