import React, { useState, useEffect } from 'react';
// import { Appearance } from 'react-native-appearance';
import { getTheme } from './Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// set default colour scheme from OS
// const osTheme = Appearance.getColorScheme();
// const osTheme = 'dark';

const getSettings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@bookSettings');
    const settingDict =
      jsonValue != null ? JSON.parse(jsonValue) : { mode: 'dark' };
    if (!settingDict.mode) {
      settingDict.mode = 'dark';
    }
    return settingDict;
  } catch (e) {
    // error reading value
  }
};

// initiate context
export const ManageThemeContext = React.createContext({
  mode: null,
  theme: null,
  setMode: () => {},
});

// define useTheme hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

// initiate context provider
export const ThemeManager = ({ children }) => {
  const [mode, setMode] = useState();

  const changeMode = (newMode) => {
    setMode(newMode);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const { mode: storedMode } = await getSettings();
      setMode(storedMode);
    };
    loadSettings();
  }, []);

  return (
    <ManageThemeContext.Provider
      value={{
        mode: mode,
        theme: getTheme(mode),
        changeMode: changeMode,
      }}>
      {children}
    </ManageThemeContext.Provider>
  );
};

export default ThemeManager;
