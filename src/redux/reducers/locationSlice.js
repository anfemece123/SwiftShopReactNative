import Geolocation from "@react-native-community/geolocation";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationState: {},
  loading: true,
  userLocation:{},
  watchId: null,

};

export const getLocation = createAsyncThunk(
  "location/getLocation",
  () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          const locationContainer = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
          resolve(locationContainer);
        },
        (err) => {
          console.log({ err });
          reject(err);
        },
        { enableHighAccuracy: true }
      );
    });
  }
);

export const followUserLocation = createAsyncThunk(
  "followUserLocation/followUserLocation",
  () => {
    return new Promise((resolve, reject) => {
      const watchId = Geolocation.watchPosition(
        ({ coords }) => { 
          console.log(coords)
          const userLocationstate = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          };
          console.log(watchId,'WATCHID');
          resolve({userLocationstate,watchId });
        },
        (err) => {
          console.log({ err });
          reject(err);
        },
        { enableHighAccuracy: true, 
          distanceFilter:200 }
      );
    });
  }
);

export const stopFollowUserLocation = createAsyncThunk(
  "stopFollowUserLocation/stopFollowUserLocation",
  (clearWatchId) => {
    if (clearWatchId) {
      Geolocation.clearWatch(clearWatchId);
    }
  }
);


const locationSlice = createSlice({
  name: "location",
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(getLocation.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.locationState = action.payload;
      state.userLocation= action.payload;
    });

//*  FOLLOW USER LOCATION FUNCION

    builder.addCase(followUserLocation.fulfilled, (state, action) => {
      state.userLocation= action.payload.userLocationstate;
      state.watchId= action.payload.watchId;

    });
  },
});

export default locationSlice.reducer;
