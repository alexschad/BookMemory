import React, { useState, useEffect } from 'react';

import { StyleSheet } from 'react-native';
import { useCameraDevices } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import CameraOverlay from '../components/CameraOverlay';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isbn, setISBN] = useState();
  const [bookData, setBookData] = useState();
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.EAN_13], {
    checkInverted: true,
  });

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
        // console.log('JSON', jsonData);
        // console.log('fetchData!!', jsonData);
        // console.log('fetchData!!', jsonData.full_title);
        setBookData(jsonData);
      } else {
        setBookData({ title: 'Book not found', isbn_13: [''] });
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
        <CameraOverlay {...bookData} />
      </>
    )
  );
}