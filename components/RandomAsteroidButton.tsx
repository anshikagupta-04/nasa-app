// components/RandomAsteroidButton.tsx
import React from 'react';
import { Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomAsteroid } from './redux/slices/asteroidSlice';
import { AppDispatch, RootState } from './redux/store';

interface Props {
  navigation: any;
}

const RandomAsteroidButton: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.asteroid.loading);

  const handlePress = async () => {
    await dispatch(fetchRandomAsteroid());
    navigation.navigate('AsteroidDetails');
  };

  return (
    <Button
      title="Random Asteroid"
      onPress={handlePress}
      disabled={loading}
    />
  );
};

export default RandomAsteroidButton;
