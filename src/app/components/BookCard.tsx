import React from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Villain} from '../../model/books';

interface BookCardProps {
  title: string;
  publisher: string;
  isbn: string;
  pages: number;
  notes: string[];
  villains: Villain[];
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  publisher,
  isbn,
  pages,
  notes,
  villains,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.publisher}>Publisher: {publisher}</Text>
      <Text style={styles.isbn}>ISBN: {isbn}</Text>
      <Text style={styles.pages}>Pages: {pages}</Text>
      <Text style={styles.notes}>Notes: {notes.join(', ')}</Text>
      <Text style={styles.villains}>
        Villains: {villains.map(v => v.name).join(', ')}
      </Text>
      <Button
        title="Info"
        color="#999999"
        onPress={() => Alert.alert(`More info about ${title}`)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 193,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 8,
    marginVertical: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontFamily: 'WendyOne-Regular',
    fontSize: 24,
    color: 'black',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  publisher: {
    fontSize: 16,
    color: 'gray',
  },
  isbn: {
    fontSize: 16,
    color: 'gray',
  },
  pages: {
    fontSize: 16,
    color: 'gray',
  },
  notes: {
    fontSize: 16,
    color: 'gray',
  },
  villains: {
    fontSize: 16,
    color: 'gray',
  },
});

export default BookCard;
