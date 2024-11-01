// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import AsteroidInput from './components/AsteroidInput';
import RandomAsteroidButton from './components/RandomAsteroidButton';
import AsteroidInfo from './components/AsteroidInfo';
import { View } from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AsteroidDetails" component={AsteroidInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const HomeScreen: React.FC = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <AsteroidInput />
      <RandomAsteroidButton navigation={navigation} />
    </View>
  );
};

export default App;
