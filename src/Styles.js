import { StyleSheet, PixelRatio } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const COLORS = {
  text: {
    light: '#0d231f',
    dark: '#fff',
  },
  reverseText: {
    light: '#fff',
    dark: '#fff',
  },
  textHeader: {
    light: '#0d231f',
    dark: '#fff',
  },
  backgroundHeader: {
    light: '#fff',
    dark: '#13332d',
  },
  background: {
    light: '#fff',
    dark: '#13332d',
  },
  backgroundActive: {
    light: '#46bbff',
    dark: '#4644ff',
  },
  border: {
    light: '#46bbff',
    dark: '#46bbff',
  },
  borderDark: {
    light: '#13332d',
    dark: '#000',
  },
  buttonAction: {
    light: '#46bbff',
    dark: '#46bbff',
  },
  buttonText: {
    light: '#fff',
    dark: '#fff',
  },
  placeholderText: {
    light: '#0d231f',
    dark: '#fff',
  },
  tagItemBackground: {
    light: '#23A837',
    dark: '#23A837',
  },
  inputEdit: {
    light: '#fff',
    dark: '#0d231f',
  },
  filterButton: {
    light: '#000000',
    dark: '#fff',
  },
  filterButtonActive: {
    light: '#46bbff',
    dark: '#44d85c',
  },
};

const getStyle = (mode) => {
  const pr = PixelRatio.get();
  return StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: COLORS.background[mode],
      fontSize: 16,
    },
    bookItem: {
      backgroundColor: COLORS.background[mode],
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'lightblue',
    },
    activeBookItem: {
      backgroundColor: COLORS.backgroundActive[mode],
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'lightblue',
    },
    bookItemContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    bookItemTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: 0,
      flexGrow: 1,
      flex: 1,
      paddingRight: 3,
    },
    bookItemTextSmall: {
      color: COLORS.text[mode],
      fontSize: 12,
    },
    bookItemActionContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
      paddingHorizontal: 10,
    },
    bookItemPlayContainer: {
      display: 'flex',
      flexDirection: 'row',
      width: '30%',
      paddingHorizontal: 5,
      justifyContent: 'space-around',
    },
    bookItemTimeContainer: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 5,
    },
    bookItemText: {
      margin: 0,
      padding: 0,
      fontSize: 17,
      fontWeight: 'bold',
      color: COLORS.text[mode],
      // height: 25,
      alignContent: 'flex-start',
      textAlign: 'left',
      includeFontPadding: false,
      fontVariant: ['tabular-nums'],
      width: wp('70%'),
      flexShrink: 1,
    },
    headerItemText: {
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
      color: COLORS.text[mode],
    },
    buttonWrapper: {
      padding: 20,
      backgroundColor: COLORS.buttonAction[mode],
      borderRadius: 100,
      marginHorizontal: 40,
      marginVertical: 10,
    },
    buttonWrapperSmall: {
      padding: 20,
      backgroundColor: COLORS.buttonAction[mode],
      borderRadius: 100,
      marginVertical: 10,
    },
    button: {
      flexDirection: 'row',
      backgroundColor: COLORS.buttonAction[mode],
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: 10,
      paddingTop: 5,
      paddingBottom: 5,
      marginTop: 15,
      marginHorizontal: 2,
    },
    buttonText: {
      color: COLORS.text[mode],
      fontSize: 17,
    },
    textButtonText: {
      color: COLORS.buttonText[mode],
      textAlign: 'center',
      fontSize: 20,
    },
    emptyListContainer: {
      alignContent: 'center',
      paddingVertical: 15,
      backgroundColor: COLORS.backgroundHeader[mode],
      display: 'flex',
      justifyContent: 'center',
      flexGrow: 1,
      top: hp('-5%'),
    },
    border: {
      borderColor: COLORS.border[mode],
      borderWidth: 0.5,
    },
    smallInput: {
      height: 42,
      padding: 10,
      marginHorizontal: 5,
      color: COLORS.text[mode],
      fontSize: 18,
    },
    textAreaContainer: {
      padding: 5,
      marginHorizontal: 5,
    },
    textArea: {
      height: 100,
      padding: 5,
      justifyContent: 'flex-start',
      color: COLORS.text[mode],
      fontSize: 18,
      lineHeight: 22,
    },
    formLabel: {
      fontSize: 15,
      letterSpacing: 1,
      padding: 5,
      color: COLORS.text[mode],
      marginTop: 10,
    },
    fGrow: {
      flexGrow: 1,
    },
    emptyStartView: {
      height: '100%',
      backgroundColor: '#13332d',
    },
    settingsContainer: {
      marginTop: '10%',
      padding: 15,
    },
    tagInputStyle: {
      backgroundColor: COLORS.inputEdit[mode],
      color: COLORS.text[mode],
      borderRadius: 4,
      shadowColor: '#333',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    tagItemContainer: {
      paddingVertical: 3,
      paddingHorizontal: 7,
      margin: 2,
      backgroundColor: COLORS.tagItemBackground[mode],
      borderRadius: 100,
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'space-between',
    },
    tagText: {
      color: COLORS.reverseText[mode],
      fontSize: 10,
      fontWeight: 'bold',
    },
    tagDelete: {
      color: COLORS.text[mode],
      fontSize: 14,
      marginLeft: 2,
    },
    tagTextSmall: {
      color: COLORS.reverseText[mode],
      fontSize: 10,
    },
    bookListItemTagsSmall: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '95%',
      flexDirection: 'row',
      marginBottom: 10,
      paddingLeft: 10,
    },
    bookListItemTags: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '95%',
      flexDirection: 'row',
      // marginTop: 5,
    },
    settingsRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
    },
    settingsText: {
      paddingLeft: 15,
      fontSize: 20,
      color: COLORS.text[mode],
    },
    settingsModeContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tagFilterContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderColor: COLORS.border[mode],
    },
    onboardImage: {
      flex: 1,
      resizeMode: 'contain',
      maxWidth: '80%',
    },
    bookListContainer: {
      flex: 1,
    },
    tabListContainer: {
      flexGrow: 1,
    },
    photoContainer: {
      paddingVertical: 0,
      // backgroundColor: '#112f29',
    },
    bookPhotoInfoContainer: {
      position: 'absolute',
      width: '100%',
      bottom: 0,
      left: 0,
      padding: 15,
    },
    photoImage: {
      height: 250,
      flex: 1,
      left: 0,
      right: 0,
    },
    photoDeleteIconContainer: {
      width: 40,
      height: 40,
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255, 0.95)',
    },
    KAContainer: {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    tabNavBarStyle: {
      backgroundColor: COLORS.background[mode],
    },
    navHeaderLink: {
      paddingHorizontal: 10,
    },
    actionButtonIcon: {
      fontSize: 33,
      height: 30,
      color: 'white',
    },
    actionButtonTextStyle: {
      fontSize: 40,
    },
    mapOverlay: {
      maxHeight: hp('50%'),
      width: wp('100%'),
      backgroundColor: COLORS.background[mode],
      paddingVertical: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    mapOverlayImageListContainer: {
      alignContent: 'center',
      alignItems: 'center',
      height: hp('15%'),
    },
    mapOverlayImageContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      minWidth: 200,
      marginHorizontal: 5,
    },
    mapOverlayBookImage: {
      height: 250,
      flex: 1,
      left: 0,
      right: 0,
    },
    mapContainer: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    book: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255, 0.8)',
    },
    movableMarkerIcon: {
      zIndex: 3,
      position: 'absolute',
      marginTop: pr === 2 ? -20 : -37,
      marginLeft: -20,
      left: '50%',
      top: '50%',
    },
    mapFitMarkersIcon: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 15,
      right: 73,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255, 0.6)',
    },
    mapMoveToUserIcon: {
      width: 50,
      height: 50,
      position: 'absolute',
      bottom: 15,
      right: 15,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255, 0.6)',
    },
    permissionContainer: {
      height: hp('80%'),
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    permissionText: {
      width: wp('90%'),
      color: COLORS.text[mode],
      fontSize: 27,
      lineHeight: 35,
      letterSpacing: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    bookSortIconContainer: {
      flexDirection: 'row',
    },
    bookSortIcon: {
      padding: 5,
    },
    overlayTitleText: {
      color: COLORS.text[mode],
      fontWeight: 'bold',
      fontSize: 25,
      paddingLeft: 15,
      paddingBottom: 5,
    },
    overlayAddressText: {
      color: COLORS.text[mode],
      fontSize: 15,
      paddingLeft: 15,
      paddingBottom: 10,
    },
    playerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    timeContainer: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    time: {
      fontSize: 80,
      letterSpacing: 1,
      padding: 5,
      color: COLORS.text[mode],
      margin: 10,
      fontVariant: ['tabular-nums'],
    },
    bookListFooterContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingBottom: 10,
      borderTopColor: 'lightgrey',
      borderTopWidth: 1,
    },
    transparent: 'transparent',
    bookDataContainer: {
      display: 'flex',
      height: hp('40%'),
      alignSelf: 'stretch',
    },
    playerButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: hp('20%'),
    },
    addBookOnBoard: { display: 'flex', alignSelf: 'flex-end' },
    headerText: { fontSize: 20 },
    headerTextTime: { fontSize: 15 },
    bookItemImageContainer: {
      width: 60,
      height: 90,
      margin: 5,
    },
    mediumLogo: {
      position: 'absolute',
      width: 60,
      height: 90,
    },
    mediumLogoIcon: {
      position: 'absolute',
      top: 15,
      width: 60,
      height: 90,
    },
    manualISBNContainer: {
      display: 'flex',
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    manualISBNButton: {
      backgroundColor: COLORS.buttonAction[mode],
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingHorizontal: 10,
      paddingTop: 5,
      paddingBottom: 5,
      marginLeft: 2,
      marginRight: 5,
    },
    manualISBNButtonText: {
      color: COLORS.text[mode],
      fontSize: 17,
    },
  });
};
export const getTheme = (mode) => {
  const themeColors = {};
  for (let key in COLORS) {
    themeColors[key] = COLORS[key][mode];
  }
  return { COLORS: themeColors, styles: getStyle(mode) };
};

const NCOLORS = getTheme('dark').COLORS;
const NStyles = getStyle('dark');

export { NCOLORS as COLORS };
export { NStyles as styles };
