import React, { useEffect, useContext } from 'react';
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

const AddBookLink = ({ navigation }) => {
  const {
    theme: { styles, COLORS },
  } = useTheme();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Scanner');
      }}
      style={styles.navHeaderLink}>
      <AntIcon name="plus" size={20} color={COLORS.buttonAction} />
    </Pressable>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const books = useContext(DataContext);
  const {
    mode,
    theme: { styles, COLORS },
  } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <SettingsHeaderLink navigation={navigation} />,
      headerRight: () => <AddBookLink navigation={navigation} />,
    });
  }, [navigation]);

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
