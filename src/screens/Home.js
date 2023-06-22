import React, { useEffect, useContext, useRef } from 'react';
import { StatusBar, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';

import { useTheme } from '../ThemeManager';
import { DataContext } from '../Context';
import BookList from '../components/BookList';

const SettingsHeaderLink = ({ navigation }) => {
  const {
    theme: { styles, COLORS },
  } = useTheme();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Settings');
      }}
      style={styles.navHeaderLink}>
      <AntIcon name="setting" size={20} color={COLORS.buttonAction} />
    </Pressable>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const books = useContext(DataContext);
  const prevBooksLen = useRef(books?.length);
  const {
    mode,
    theme: { styles, COLORS },
  } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <SettingsHeaderLink navigation={navigation} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (prevBooksLen.current < books?.length) {
      // a book got added so we redirect to the Edit Page
      const newBookId = books.sort((a, b) => a.created < b.created)[0].id;
      navigation.navigate('EditBook', {
        bookId: newBookId,
      });
    }
    prevBooksLen.current = books?.length;
  }, [navigation, books]);

  let view = null;
  if (books === null) {
    view = <View />;
  } else {
    view = <BookList />;
  }

  return (
    <View style={styles.body}>
      <StatusBar
        barStyle={mode === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={COLORS.backgroundHeader}
      />
      {view}
    </View>
  );
};
export default Home;
