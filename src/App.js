import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DispatchContext, DataContext } from './Context';
import { ThemeManager, useTheme } from './ThemeManager';
import reducer, { ACTIONS } from './Reducer';
import Home from './screens/Home';
import Settings from './screens/Settings';
import AddBook from './screens/AddBook';
import EditBook from './screens/EditBook';
import Scanner from './screens/Scanner';

const Stack = createNativeStackNavigator();

const NavContainer = () => {
  const {
    theme: { styles, COLORS },
    mode,
  } = useTheme();

  if (mode === undefined) {
    return <View style={styles.emptyStartView} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.backgroundHeader,
            borderBottomColor: COLORS.borderDark,
            borderBottomWidth: 0.5,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.textHeader,
          headerTitleStyle: {
            alignSelf: 'center',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Book Memory',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: 'Settings',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBook}
          options={{
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{
            headerTitle: '',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [{ save, books }, dispatch] = React.useReducer(reducer, {
    save: false,
    books: null,
  });

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@bookData');
      let loadedBooks = jsonValue ? JSON.parse(jsonValue) : [];
      // reset to an empty list in case we accidently stored something wrong
      if (!Array.isArray(loadedBooks)) {
        loadedBooks = [];
      }
      dispatch({
        type: ACTIONS.INIT_BOOKS,
        payload: { save: false, books: loadedBooks },
      });
    } catch (e) {
      console.log(e);
    }
  };

  // save stacks to asyncstorage whenever they change
  useEffect(() => {
    if (!save) {
      return;
    }
    const saveData = async () => {
      try {
        const jsonValue = JSON.stringify(books);
        AsyncStorage.setItem('@bookData', jsonValue);
        dispatch({
          type: ACTIONS.DATA_SAVED,
          payload: { save: false },
        });
      } catch (e) {
        console.log(e);
      }
    };
    saveData();
  }, [save, books]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaProvider>
      <DispatchContext.Provider value={dispatch}>
        <DataContext.Provider value={books}>
          <ThemeManager>
            <GestureHandlerRootView style={styles.flex}>
              <NavContainer />
            </GestureHandlerRootView>
          </ThemeManager>
        </DataContext.Provider>
      </DispatchContext.Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default App;
