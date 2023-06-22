import React, { useContext } from 'react';
import { format } from 'date-fns';
import { View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import { ACTIONS } from '../Reducer';

import { useTheme } from '../ThemeManager';
import { DispatchContext } from '../Context';

const BookItem = ({ setTagFilter, setActiveBook, active, book }) => {
  const dispatch = useContext(DispatchContext);
  const navigation = useNavigation();
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const clickItem = async () => {
    setActiveBook(book.id);
  };

  const onTagPress = (tag) => {
    return () => {
      setTagFilter(tag);
    };
  };

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

  const onEdit = () => {
    navigation.navigate('EditBook', {
      bookId: book.id,
    });
  };

  return (
    <TouchableOpacity
      style={active ? styles.activeBookItem : styles.bookItem}
      onPress={() => {
        clickItem();
      }}>
      <View>
        <View style={styles.bookListItemTags}>
          {book.tags.map((tag, index) => (
            <TouchableOpacity
              key={`${tag}-${index}`}
              style={styles.tagItemContainer}
              onPress={onTagPress(tag)}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bookItemContainer}>
          <Text style={styles.bookItemText}>{book.title}</Text>
        </View>
        <View style={styles.bookItemContainer}>
          <Text style={styles.bookItemTextSmall}>
            {book.created &&
              `${format(new Date(book.created), 'MM/dd/yyyy k:mm')}`}
          </Text>
          <Text style={styles.bookItemTextSmall}></Text>
        </View>
        {active && (
          <View style={styles.bookItemActionContainer}>
            <Pressable onPress={onEdit}>
              <FontAwesomeIcon name="edit" size={25} color={COLORS.text} />
            </Pressable>
            <Pressable onPress={deleteBook}>
              <AntIcon name="delete" size={25} color={COLORS.text} />
            </Pressable>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;
