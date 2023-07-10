import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  TextInput,
  Text,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import AntIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTheme } from '../ThemeManager';
import CameraOverlay from '../components/CameraOverlay';

const getAuthors = async (authors) => {
  console.log('FETCH AUTHORS!!!!!!', authors);
  if (!authors) {
    return [];
  }
  const authorNames = await Promise.all(
    authors.map(async (author) => {
      const url = `https://openlibrary.org${author.key}.json`;
      // console.log('FETCH AUTHOR!!!!!!', url);
      const response = await fetch(url);
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.name;
      }
    }),
  );
  return authorNames;
};

const EnterISBNLink = ({
  styles,
  COLORS,
  showManualISBN,
  setShowManualISBN,
}) => {
  return (
    <Pressable
      onPress={() => {
        setShowManualISBN(!showManualISBN);
      }}
      style={styles.navHeaderLink}>
      {showManualISBN ? (
        <AntIcon name="minus" size={20} color={COLORS.buttonAction} />
      ) : (
        <AntIcon name="plus" size={20} color={COLORS.buttonAction} />
      )}
    </Pressable>
  );
};

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isbn, setISBN] = useState();
  const [bookData, setBookData] = useState();
  const [authors, setAuthors] = useState([]);
  const [manualISBN, setManualISBN] = useState();
  const [showManualISBN, setShowManualISBN] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const navigation = useNavigation();

  const {
    theme: { styles, COLORS },
  } = useTheme();

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13], {
    checkInverted: true,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <EnterISBNLink
          showManualISBN={showManualISBN}
          setShowManualISBN={setShowManualISBN}
          styles={styles}
          COLORS={COLORS}
        />
      ),
    });
  }, [navigation, showManualISBN]);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    async function fetchData(url) {
      console.log('FETCH!!!!!!');
      const response = await fetch(url);
      if (response.status === 200) {
        // console.log('RESULT', response);
        const jsonData = await response.json();
        console.log('JSON', jsonData);
        // console.log('fetchData!!', jsonData);
        // console.log('fetchData!!', jsonData.full_title);
        const authorNames = await getAuthors(jsonData.authors);
        // console.log('AUTHOR NAMES', authorNames);
        setAuthors(authorNames);
        setBookData(jsonData);
      } else {
        setAuthors([]);
        setBookData({ error: 'Book not found', isbn_13: [''] });
      }
    }
    if (isbn) {
      const url = `https://openlibrary.org/isbn/${isbn}.json`;
      fetchData(url);
    }
  }, [isbn]);

  useEffect(() => {
    if (barcodes.length > 0) {
      setISBN(barcodes[0].displayValue);
    }
  }, [barcodes]);

  const addManualISBN = () => {
    Keyboard.dismiss();
    setISBN(manualISBN);
  };
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {showManualISBN && (
          <View style={styles.manualISBNContainer}>
            <TextInput
              placeholder="Enter ISBN"
              keyboardType="numeric"
              placeholderTextColor={COLORS.placeholderText}
              style={{
                ...styles.smallInput,
                ...styles.border,
                ...{ flexGrow: 1 },
              }}
              onChangeText={(value) => setManualISBN(value)}
              value={manualISBN}
            />
            <Pressable onPress={addManualISBN} style={styles.manualISBNButton}>
              <Text style={styles.manualISBNButtonText}>Add</Text>
            </Pressable>
          </View>
        )}
        <CameraOverlay {...bookData} authors={authors} />
      </>
    )
  );
}
