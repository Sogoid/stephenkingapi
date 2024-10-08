import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import BookList from '../app/components/BookList';
import Details from '../app/pages/Details';
import Dashboard from '../app/pages/Home'; // Certifique-se de importar a tela Dashboard
import Login from '../app/pages/Login';
import Splash from '../app/pages/Splash';
import { Data } from '../model/books';

export type RootStackParamList = {
  Splash: undefined;
  Dashboard: undefined;
  Details: {name: string};
  Login: undefined;
  BookList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BookListScreen: React.FC = () => {
  const [books] = React.useState<Data[]>([]);
  const [loading] = React.useState<boolean>(false);

  const loadMoreBooks = () => {
    // Lógica para carregar mais livros
  };

  return (
    <BookList books={books} loading={loading} loadMoreBooks={loadMoreBooks} />
  );
};

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerTransparent: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookList"
        component={BookListScreen}
        options={{title: 'BookList'}}
      />
    </Stack.Navigator>
  );
}
