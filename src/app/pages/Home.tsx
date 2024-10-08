import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import {Books} from '../../model/books';
import {
  fetchBooksDetail,
  fetchBooksList,
} from '../../service/StephenKingService'; // Certifique-se de ajustar o caminho conforme necessário
import BookList from '../components/BookList';

const Home: React.FC = () => {
  const animatedSearchIsFocused = useRef(new Animated.Value(0)).current;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [bookList, setBookList] = useState<Books[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Books[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(100);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState<'name' | 'publisher'>('name');

  const Separator = () => <View style={styles.separator} />;

  useEffect(() => {
    Animated.timing(animatedSearchIsFocused, {
      toValue: isSearchFocused || searchValue ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedSearchIsFocused, isSearchFocused, searchValue]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksList(offset, limit);
        const detailedBookList = await Promise.all(
          data.map(async book => {
            const details = await fetchBooksDetail(book.id.toString());
            return {
              data: {
                id: details.id,
                Year: details.Year,
                title: details.title,
                handle: details.handle,
                publisher: details.publisher,
                isbn: details.isbn,
                pages: details.pages,
                notes: details.notes,
                villains: details.villains,
              },
            };
          }),
        );
        setBookList(prevList => [...prevList, ...detailedBookList]);
        setOffset(prevOffset => prevOffset + limit);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [offset, limit]);

  useEffect(() => {
    const filtered = bookList.filter((book: Books) => {
      if (searchType === 'name') {
        return book.data.title
          ?.toLowerCase()
          .includes(searchValue?.toLowerCase() || '');
      } else if (searchType === 'publisher') {
        return book.data.publisher
          ?.toLowerCase()
          .includes(searchValue?.toLowerCase() || '');
      }
      return false;
    });
    setFilteredBooks(filtered);
  }, [searchValue, searchType, bookList]);

  const loadMoreBooks = () => {
    setLoading(true);
    setOffset(prevOffset => prevOffset + limit);
  };

  const usersearchLabelStyle: Animated.WithAnimatedObject<TextStyle> = {
    fontFamily: 'WendyOne-Regular',
    position: 'absolute',
    left: 10, // Ajuste conforme necessário
    top: animatedSearchIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -9],
    }),
    fontSize: animatedSearchIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [26, 16],
    }),
    color: animatedSearchIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#000', '#000'],
    }),
    backgroundColor: animatedSearchIsFocused.interpolate({
      inputRange: [0, 0],
      outputRange: ['#D9D9D9', '#F2F2F2'],
    }),
    zIndex: animatedSearchIsFocused.interpolate({
      inputRange: [0, 0],
      outputRange: [1, 0],
    }),
    paddingHorizontal: 2,
    marginLeft: animatedSearchIsFocused.interpolate({
      inputRange: [0, 0],
      outputRange: [0, 8],
    }),
    textTransform: 'uppercase',
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.text}>Coleção Stephen King</Text>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/img/desenholivro.png')}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <Animated.Text style={usersearchLabelStyle}>Search...</Animated.Text>
          <TextInput
            style={[
              styles.input,
              (isSearchFocused || searchValue) && styles.focus,
            ]}
            value={searchValue}
            onChangeText={setSearchValue}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            blurOnSubmit
          />
          <Picker
            selectedValue={searchType}
            style={styles.picker}
            onValueChange={(itemValue: 'name' | 'publisher') =>
              setSearchType(itemValue)
            }>
            <Picker.Item label="NOME" value="name" style={styles.pickerItem} />
            <Picker.Item
              label="EDITORA"
              value="publisher"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
        <Separator />
        <View>
          <BookList
            books={filteredBooks.map(book => book.data)}
            loading={loading}
            loadMoreBooks={loadMoreBooks}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 16,
    marginBottom: 48,
  },
  text: {
    fontFamily: 'WendyOne-Regular',
    fontSize: 50,
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: '#D9D9D9',
    borderRadius: 30,
    color: 'black',
  },
  focus: {
    borderColor: 'blue',
  },
  picker: {
    width: 130,
    backgroundColor: '#D9D9D9',
    color: 'black',
    fontFamily: 'WendyOne-Regular',
  },
  pickerItem: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Home;
