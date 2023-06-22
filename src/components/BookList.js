import React, { useState, useContext } from 'react';
import {
  TouchableHighlight,
  FlatList,
  View,
  TouchableOpacity,
  Pressable,
  Text,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DataContext, DispatchContext } from '../Context';
import { ACTIONS } from '../Reducer';
import BookItem from './BookItem';
import NoItems from './NoItems';
import { useTheme } from '../ThemeManager';

const BookList = () => {
  const books = useContext(DataContext);
  const dispatch = useContext(DispatchContext);
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const [tagFilter, setTagFilter] = useState();
  const [sortOrder, setSortOrder] = useState('created');
  const [sortDir, setSortDir] = useState('desc');
  const [activeBook, setActiveBook] = useState();

  const filterBooks = () => {
    const filterdBooks = tagFilter
      ? books.filter((l) => {
          return l.tags?.findIndex((t) => t === tagFilter) > -1;
        })
      : books;
    if (sortOrder === 'created') {
      if (sortDir === 'asc') {
        return filterdBooks.sort((a, b) =>
          a.created > b.created ? 1 : b.created > a.created ? -1 : 0,
        );
      }
      return filterdBooks.sort((a, b) =>
        a.created > b.created ? -1 : b.created > a.created ? 1 : 0,
      );
    }

    if (sortDir === 'asc') {
      return filterdBooks.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0,
      );
    }
    return filterdBooks.sort((a, b) =>
      a.title > b.title ? -1 : b.title > a.title ? 1 : 0,
    );
  };

  const addBook = () => {
    dispatch({
      type: ACTIONS.ADD_BOOK,
      payload: {},
    });
    return;
  };

  const setOrderCreated = () => {
    if (sortOrder === 'created') {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDir('desc');
    }
    setSortOrder('created');
  };

  const setOrderTitle = () => {
    if (sortOrder === 'title') {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortDir('asc');
    }
    setSortOrder('title');
  };

  return (
    <View style={styles.body}>
      <View style={styles.tagFilterContainer}>
        <View>
          {tagFilter && (
            <TouchableOpacity
              style={styles.tagItemContainer}
              onPress={() => setTagFilter(null)}>
              <Text style={styles.tagText}>{tagFilter}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bookSortIconContainer}>
          <FontAwesomeIcon
            name={
              sortOrder === 'created' && sortDir === 'asc'
                ? 'sort-numeric-asc'
                : 'sort-numeric-desc'
            }
            size={25}
            color={
              sortOrder === 'created'
                ? COLORS.filterButtonActive
                : COLORS.filterButton
            }
            style={styles.bookSortIcon}
            onPress={setOrderCreated}
          />
          <FontAwesomeIcon
            name={
              sortOrder === 'title' && sortDir === 'desc'
                ? 'sort-alpha-desc'
                : 'sort-alpha-asc'
            }
            size={25}
            color={
              sortOrder === 'title'
                ? COLORS.filterButtonActive
                : COLORS.filterButton
            }
            style={styles.bookSortIcon}
            onPress={setOrderTitle}
          />
        </View>
      </View>
      <View style={styles.bookListContainer}>
        {!books || books?.length === 0 ? (
          <NoItems items={books} />
        ) : (
          <TouchableHighlight
            underlayColor={COLORS.background}
            activeOpacity={1}>
            <FlatList
              keyExtractor={(item) => `item-${item.id}`}
              data={filterBooks()}
              renderItem={({ item, index }) => {
                return (
                  <BookItem
                    book={item}
                    key={item.id}
                    last={index === books.length - 1}
                    setTagFilter={setTagFilter}
                    setActiveBook={setActiveBook}
                    active={activeBook === item.id}
                  />
                );
              }}
            />
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.bookListFooterContainer}>
        <Pressable onPress={addBook} style={styles.transparent}>
          <MaterialCommunityIcons name="record" size={70} color="red" />
        </Pressable>
      </View>
    </View>
  );
};
export default BookList;
