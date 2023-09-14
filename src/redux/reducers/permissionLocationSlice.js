import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import { PERMISSIONS, check, request } from "react-native-permissions";


/* import getProductsFiltered from "../../Controllers/utils"; */
const initialState = {
  permissionState: 'unavailable',
};


export const  askLocationPermission = createAsyncThunk (
  "permissionRequest/permissionRequest",
  async()=>{
    let permissionStatus;
    if(Platform.OS === 'ios'){
     permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);//para saber la precision de la localizacion 
    } else { 
      permissionStatus= await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
    return permissionStatus; 
  }

)

export const  checkLocationPermission = createAsyncThunk (
  "permissionCheck/permissionCheck",
  async()=>{
    let permissionStatus;
    if(Platform.OS === 'ios'){
     permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);//para saber la precision de la localizacion 
    } else { 
      permissionStatus= await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
    return permissionStatus; 
  }

)

const permissionLocationSlice = createSlice({
  
  name: "permissionLocation",
  initialState,
  extraReducers: (builder) => {
    
    builder.addCase(askLocationPermission.fulfilled, (state, action) => {
      state.permissionState = action.payload;
    });
    builder.addCase(checkLocationPermission.fulfilled, (state, action) => {
      state.permissionState = action.payload;
    });

  },
});

export default permissionLocationSlice.reducer;
