import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { DataContext } from '../Context';
import BookItem from './BookItem';
import NoItems from './NoItems';
import { useTheme } from '../ThemeManager';

const BookList = () => {
  const books = useContext(DataContext);
  const {
    theme: { styles, COLORS },
  } = useTheme();

  const [tagFilter, setTagFilter] = useState();
  const [sortOrder, setSortOrder] = useState('created');
  const [sortDir, setSortDir] = useState('desc');

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
          <FlatList
            keyExtractor={(item) => `item-${item.id}`}
            ItemSeparatorComponent={ItemSeparator}
            data={filterBooks()}
            renderItem={({ item, index }) => {
              return (
                <BookItem
                  book={item}
                  key={item.id}
                  last={index === books.length - 1}
                  setTagFilter={setTagFilter}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
export default BookList;

const ItemSeparator = () => (
  <View style={{ height: 1, backgroundColor: '#DBDBE0' }} />
);
