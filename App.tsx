import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootLayout from './src/router/routes';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}
export default App;
