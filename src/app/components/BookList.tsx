import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Books} from '../../model/books'; // Importando a interface Books
import BookCard from './BookCard'; // Assuming you have a BookCard component

interface BookListProps {
  books: Books['data'][];
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
              title={item.title}
              publisher={item.publisher}
              isbn={item.isbn}
              pages={item.pages}
              notes={item.notes}
              villains={item.villains}
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
