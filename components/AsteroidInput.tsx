// components/AsteroidInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchAsteroid } from './redux/slices/asteroidSlice';
import { AppDispatch } from './redux/store';

const AsteroidInput: React.FC = () => {
  const [asteroidId, setAsteroidId] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (asteroidId) {
      dispatch(fetchAsteroid(asteroidId));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Here"
        value={asteroidId}
        onChangeText={setAsteroidId}
      />
      {/* <Button title="Submit" onPress={handleSearch} disabled={!asteroidId} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AsteroidInput;
