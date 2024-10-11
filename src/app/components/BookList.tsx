import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Daum} from '../../model/books';
import BookCard from './BookCard';

interface BookListProps {
  books: Daum[]; // Use a interface Daum aqui
  loading: boolean;
  loadMoreBooks: () => void;
}

const BookList: React.FC<BookListProps> = ({books, loading, loadMoreBooks}) => {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="red" />}
      {books.length === 0 ? (
        <Text style={styles.noResults}>Nenhum livro encontrado</Text>
      ) : (
        <FlatList
          data={books}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <BookCard
              title={item.Title}
              publisher={item.Publisher}
              isbn={item.ISBN}
              pages={item.Pages}
            />
          )}
          numColumns={2} // Define o número de colunas
          columnWrapperStyle={styles.row} // Estilo para as linhas
          onEndReached={loadMoreBooks}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  noResults: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookList;
