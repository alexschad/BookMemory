import React, { useContext } from 'react';
// import { format } from 'date-fns';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';

import { ACTIONS } from '../Reducer';
import {
  RectButton,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useTheme } from '../ThemeManager';
import { DispatchContext } from '../Context';

const BookItem = ({ setTagFilter, book }) => {
  const dispatch = useContext(DispatchContext);
  const navigation = useNavigation();
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const renderRightActions = () => {
    return (
      <View
        style={{
          width: 50,
          flexDirection: 'row',
        }}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'red',
            justifyContent: 'center',
            transform: [{ translateX: 0 }],
          }}>
          <RectButton
            style={[
              styles.rightAction,
              { backgroundColor: 'red', alignItems: 'center' },
            ]}
            onPress={deleteBook}>
            <AntIcon name="delete" size={25} color={COLORS.text} />
          </RectButton>
        </Animated.View>
      </View>
    );
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

  const doubleTap = Gesture.Tap()
    .runOnJS(true)
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        onEdit();
      }
    });

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <GestureDetector gesture={doubleTap}>
        <View style={styles.bookItemContainer}>
          <View style={styles.bookItemImageContainer}>
            <FontAwesome5
              style={styles.mediumLogoIcon}
              name="book"
              size={60}
              color={COLORS.buttonAction}
            />
            <Image
              style={styles.mediumLogo}
              source={{
                uri: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
              }}
            />
          </View>
          <View style={styles.bookItemTextContainer}>
            <Text style={styles.bookItemText}>{book.title}</Text>
            <Text style={styles.bookItemTextSmall}>{book.description}</Text>
            {/* <Text style={styles.bookItemTextSmall}>
              {book.created &&
                `${format(new Date(book.created), 'MM/dd/yyyy k:mm')}`}
            </Text> */}
            {book.tags.length > 0 && (
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
            )}
          </View>
        </View>
      </GestureDetector>
    </Swipeable>
  );
};

export default BookItem;
