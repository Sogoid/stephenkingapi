import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../router/routes';

const Splash: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          navigation.navigate('Dashboard');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }, 2000); // Tempo de processamento do splash screen

    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);

  const bounce = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], // Ajuste os valores conforme necessário
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{translateY: bounce}]}}>
        <Image
          source={require('../assets/img/desenholivro.png')}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading</Text>
        <ActivityIndicator color="red" />
      </View>
      <Text style={styles.text}>Coleção Stephen King</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  loadingText: {
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    marginRight: 8,
  },
  text: {
    fontFamily: 'WendyOne-Regular',
    fontSize: 50,
    marginTop: 20,
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center', // Centraliza o texto horizontalmente
  },
});

export default Splash;
