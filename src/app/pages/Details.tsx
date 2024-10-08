import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Details: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default Details;
