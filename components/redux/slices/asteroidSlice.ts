// slices/asteroidSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'V3Slzrs13kKnbl3WmcbXo5qEJskQbOsVxS4GkbhP'; // Replace with your NASA API key

interface AsteroidState {
  asteroidInfo: {
    name: string;
    nasa_jpl_url: string;
    is_potentially_hazardous_asteroid: boolean;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AsteroidState = {
  asteroidInfo: null,
  loading: false,
  error: null,
};

// Thunks for async calls
export const fetchAsteroid = createAsyncThunk(
  'asteroid/fetchAsteroid',
  async (asteroidId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Invalid Asteroid ID');
    }
  }
);

export const fetchRandomAsteroid = createAsyncThunk(
  'asteroid/fetchRandomAsteroid',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`
      );
      const randomAsteroid =
        response.data.near_earth_objects[
          Math.floor(Math.random() * response.data.near_earth_objects.length)
        ];
      const randomAsteroidId = randomAsteroid.id;
      const asteroidResponse = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/neo/${randomAsteroidId}?api_key=${API_KEY}`
      );
      return asteroidResponse.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch random asteroid');
    }
  }
);

const asteroidSlice = createSlice({
  name: 'asteroid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsteroid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsteroid.fulfilled, (state, action: PayloadAction<any>) => {
        state.asteroidInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsteroid.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(fetchRandomAsteroid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomAsteroid.fulfilled, (state, action: PayloadAction<any>) => {
        state.asteroidInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchRandomAsteroid.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default asteroidSlice.reducer;
