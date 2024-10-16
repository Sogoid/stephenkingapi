import {Picker} from '@react-native-picker/picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {Daum} from '../../model/books';
import {RootStackParamList} from '../../router/routes';
import {fetchBooksList} from '../../service/StephenKingService'; // Certifique-se de ajustar o caminho conforme necessário
import BookList from '../components/BookList';

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

type Props = {
  navigation: HomeNavigationProp;
};

export default function Home({}: Props) {
  const animatedSearchIsFocused = useRef(new Animated.Value(0)).current;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [bookList, setBookList] = useState<Daum[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Daum[]>([]);
  const [loading, setLoading] = useState(true); // Correção aqui
  const [searchType, setSearchType] = useState<'title' | 'publisher'>('title');

  const Separator = () => <View style={styles.separator} />;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data: Daum[] = await fetchBooksList(); // fetchBooksList retorna diretamente um array de Daum[]
        setBookList(data); // Atribua diretamente o array de livros
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const filtered = bookList.filter((book: Daum) => {
      if (searchType === 'title') {
        return (
          book.Title &&
          book.Title.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else if (searchType === 'publisher') {
        return (
          book.Publisher &&
          book.Publisher.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      return false;
    });

    setFilteredBooks(filtered);
  }, [searchValue, searchType, bookList]);

  useEffect(() => {
    Animated.timing(animatedSearchIsFocused, {
      toValue: isSearchFocused || searchValue ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedSearchIsFocused, isSearchFocused, searchValue]);

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

  const loadMoreBooks = () => {
    setLoading(true);
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
            onValueChange={(itemValue: 'title' | 'publisher') =>
              setSearchType(itemValue)
            }>
            <Picker.Item
              label="TITULO"
              value="title"
              style={styles.pickerItem}
            />

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
            books={filteredBooks}
            loading={loading}
            loadMoreBooks={loadMoreBooks}
          />
        </View>
      </View>
    </View>
  );
}

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
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'WendyOne-Regular',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
