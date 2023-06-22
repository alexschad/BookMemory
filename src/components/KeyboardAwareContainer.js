import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, Dimensions, Keyboard, TextInput } from 'react-native';
import { useTheme } from '../ThemeManager';

const { State: TextInputState } = TextInput;

export default function KeyboardAwareContainer({ children }) {
  const {
    theme: { styles },
  } = useTheme();
  const shift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardDidShow',
      _handleKeyboardDidShow,
    );
    const keyboardWillHide = Keyboard.addListener(
      'keyboardDidHide',
      _handleKeyboardDidHide,
    );

    return () => {
      keyboardWillShow?.remove();
      keyboardWillHide?.remove();
    };
  }, [_handleKeyboardDidShow, _handleKeyboardDidHide]);

  const _handleKeyboardDidShow = useCallback(
    (event) => {
      const { height: windowHeight } = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedField = TextInputState.currentlyFocusedInput();
      if (!currentlyFocusedField) {
        return;
      }
      currentlyFocusedField.measure(
        (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(shift, {
            toValue: gap,
            duration: 200,
            useNativeDriver: true,
          }).start();
        },
      );
    },
    [shift],
  );

  const _handleKeyboardDidHide = useCallback(() => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [shift]);

  return (
    <Animated.View
      style={[styles.KAContainer, { transform: [{ translateY: shift }] }]}>
      {children}
    </Animated.View>
  );
}
