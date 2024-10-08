import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Button,
  Easing,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import {RootStackParamList} from '../../router/routes';
import {login} from './../../service/AuthService';

const Login: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [password, setPassWord] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false);
  const animatedUsernameIsFocused = useRef(new Animated.Value(0)).current;
  const animatedPasswordIsFocused = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const clearInputs = (): void => {
    setUserName('');
    setPassWord('');
  };

  const handleLogin = async (): Promise<void> => {
    try {
      console.log(
        `Tentando login com usuário: ${username} e senha: ${password}`,
      );
      const user = await login(username, password);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      clearInputs(); // Limpa os inputs
      navigation.navigate('Dashboard');
    } catch (e) {
      console.log(`Erro ao fazer login: ${e}`);
      setError('Usuário ou senha inválido.');
      setModalVisible(true); // Abre o modal em caso de erro
    }
  };

  useEffect(() => {
    Animated.timing(animatedUsernameIsFocused, {
      toValue: isUsernameFocused || username !== '' ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedUsernameIsFocused, isUsernameFocused, username]);

  useEffect(() => {
    Animated.timing(animatedPasswordIsFocused, {
      toValue: isPasswordFocused || password !== '' ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [animatedPasswordIsFocused, isPasswordFocused, password]);

  const usernameLabelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute',
    left: 0,
    top: animatedUsernameIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedUsernameIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedUsernameIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
    backgroundColor: 'white',
    zIndex: 1,
    paddingHorizontal: 2,
    marginLeft: 5,
    textTransform: 'uppercase',
  };

  const passwordLabelStyle: Animated.WithAnimatedObject<TextStyle> = {
    position: 'absolute',
    left: 0,
    top: animatedPasswordIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedPasswordIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedPasswordIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
    backgroundColor: 'white',
    zIndex: 1,
    paddingHorizontal: 2,
    marginLeft: 5,
    textTransform: 'uppercase',
  };

  return (
    <ImageBackground
      source={require('./../assets/img/fundologin.jpeg')}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.form}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <Pressable
                  style={styles.closeButton}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <View style={styles.inputContainer}>
            <Animated.Text style={usernameLabelStyle}>Usuário</Animated.Text>
            <TextInput
              style={[styles.input, isUsernameFocused && styles.focus]}
              value={username}
              onChangeText={setUserName}
              onFocus={() => setIsUsernameFocused(true)}
              onBlur={() => setIsUsernameFocused(false)}
              blurOnSubmit
            />
          </View>

          <View style={styles.inputContainer}>
            <Animated.Text style={passwordLabelStyle}>Password</Animated.Text>
            <TextInput
              style={[styles.input, isPasswordFocused && styles.focus]}
              value={password}
              onChangeText={setPassWord}
              placeholderTextColor="#8b8c8f"
              secureTextEntry
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              blurOnSubmit
            />
          </View>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="red" />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
  form: {
    width: 384, // w-96
    backgroundColor: 'white',
    padding: 24, // p-6
    borderRadius: 8, // rounded-lg
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 36,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: '#dc2626', // text-red-600
  },
  closeButton: {
    backgroundColor: '#ef4444', // bg-red-500
    padding: 8, // p-2
    borderRadius: 8, // rounded
    marginTop: 16, // mt-4
  },
  closeButtonText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  input: {
    width: '100%', // w-full
    borderRadius: 8, // rounded-md
    borderWidth: 3, // ring-1
    borderColor: '#d1d5db', // ring-gray-300
    color: '#1f2937', // text-gray-900
    fontSize: 14, // sm:text-sm
  },
  focus: {
    borderColor: '#4f46e5', // focus:ring-indigo-600
    borderWidth: 2, // focus:ring-2
  },
  buttonContainer: {
    marginTop: 12, // mt-3
    padding: 8,
  },
  forgotPassword: {
    fontWeight: '600',
    color: '#4f46e5', // text-indigo-600
    marginLeft: 196,
  },
});

export default Login;
