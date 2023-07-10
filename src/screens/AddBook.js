import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tags from 'react-native-tags';
import KeyboardAwareContainer from '../components/KeyboardAwareContainer';
import { DispatchContext } from '../Context';
import { ACTIONS } from '../Reducer';
import { useTheme } from '../ThemeManager';

const AddBook = () => {
  const dispatch = useContext(DispatchContext);
  const {
    theme: { styles, COLORS },
  } = useTheme();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const onChangeTitle = (textValue) => setTitle(textValue.substr(0, 100));

  const [description, setDescription] = useState('');
  const onChangeDescription = (textValue) =>
    setDescription(textValue.substr(0, 250));

  const [isbn, setIsbn] = useState('');
  const [tags, setTags] = useState([]);

  const addBook = () => {
    if (!title) {
      Alert.alert(
        'No title',
        'Every book must have a title.',
        [
          {
            text: 'Understood',
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } else {
      dispatch({
        type: ACTIONS.ADD_BOOK,
        payload: {
          title: title,
          isbn: isbn,
          description: description,
          tags: tags,
        },
      });
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.body} forceInset="top">
      <KeyboardAwareContainer>
        <ScrollView>
          <Text style={styles.formLabel}>Title:</Text>
          <View style={styles.container}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={COLORS.placeholderText}
              style={{ ...styles.smallInput, ...styles.border }}
              onChangeText={onChangeTitle}
              value={title}
            />
          </View>
          <Text style={styles.formLabel}>ISBN:</Text>
          <View style={styles.container}>
            <TextInput
              placeholder="ISBN"
              placeholderTextColor={COLORS.placeholderText}
              style={{ ...styles.smallInput, ...styles.border }}
              onChangeText={(value) => {
                setIsbn(value);
              }}
              value={isbn}
            />
          </View>
          <Text style={styles.formLabel}>
            Description ({250 - description.length} Chars left):
          </Text>
          <View style={{ ...styles.textAreaContainer, ...styles.border }}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Description"
              placeholderTextColor={COLORS.placeholderText}
              numberOfLines={10}
              multiline={true}
              onChangeText={onChangeDescription}
              value={description}
            />
          </View>
          <Text style={styles.formLabel}>Tags</Text>
          <Tags
            textInputProps={{
              placeholder: 'Tag title',
              selectionColor: COLORS.text,
            }}
            initialTags={tags}
            createTagOnReturn
            createTagOnString={[',']}
            onChangeTags={(tags) => {
              setTags(tags);
            }}
            inputStyle={styles.tagInputStyle}
            inputContainerStyle={styles.tagInputContainerStyle}
            style={{ minHeight: hp('4%') }}
            renderTag={({ tag, index, onPress }) => (
              <TouchableOpacity
                key={`${tag}-${index}`}
                style={styles.tagItemContainer}>
                <Text style={styles.tagText}>{tag}</Text>
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.tagDelete}>X</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
          <Pressable onPress={addBook} style={styles.button}>
            <Text style={styles.buttonText}>Add it yourself</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAwareContainer>
    </SafeAreaView>
  );
};

export default AddBook;
