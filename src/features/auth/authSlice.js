// /* eslint-disable no-unused-vars */
// import { createSlice } from '@reduxjs/toolkit';

// const userData = JSON.parse(localStorage.getItem('userData')) || null;
// const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

// const initialState = {
//   userData,
//   userToken,
//   isAuthenticated: !!userData,
//   isLoading: false,
// };

// const authSlice = createSlice({
//   name: 'authSlice',
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     login: (state, action) => {
//       const { token, refreshToken, ...rest } = action.payload;
//       state.userToken = {
//         token,
//         refreshToken,
//       };
//       state.userData = rest;
//       state.isAuthenticated = true;
//       localStorage.setItem('userData', JSON.stringify(rest));
//       localStorage.setItem(
//         'userToken',
//         JSON.stringify({
//           token,
//           refreshToken,
//         })
//       );
//     },
//     logout: (state, action) => {
//       state.userData = null;
//       state.userToken = null;
//       state.isAuthenticated = false;
//       localStorage.setItem('userData', null);
//       localStorage.setItem('userToken', null);
//     },
//     refreshToken: (state, action) => {
//       state.userToken.token = action.payload;
//       localStorage.setItem('userData', JSON.stringify(state.userData));
//       localStorage.setItem(
//         'userToken',
//         JSON.stringify({
//           token: state.userToken.token,
//           refreshToken: state.userToken.refreshToken,
//         })
//       );
//     },
//   },
// });

// export const { login, logout, refreshToken, setLoading } = authSlice.actions;
// export default authSlice.reducer;


/* eslint-disable no-unused-vars */
// import { createSlice } from '@reduxjs/toolkit';

// const userData = JSON.parse(localStorage.getItem('userData')) || null;
// const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

// const initialState = {
//   userData,
//   userToken,
//   isAuthenticated: !!userData,
//   isLoading: false,
// };

// const authSlice = createSlice({
//   name: 'authSlice',
//   initialState,
//   reducers: {
//     setLoading: (state, action) => {
//       state.isLoading = action.payload;
//     },
//     login: (state, action) => {
//       const { token, refreshToken, ...rest } = action.payload;
//       state.userToken = 
//         rest.data
//       ;
//       state.userData = rest;
//       state.isAuthenticated = true;
//       localStorage.setItem('userData', JSON.stringify(rest));
//       localStorage.setItem(
//         'userToken',
//         JSON.stringify({
//           token,
//           refreshToken,
//         })
//       );
//     },
//     logout: (state, action) => {
//       state.userData = null;
//       state.userToken = null;
//       state.isAuthenticated = false;
//       localStorage.setItem('userData', null);
//       localStorage.setItem('userToken', null);
//     },
//     refreshToken: (state, action) => {
//       state.userToken.token = action.payload;
//       localStorage.setItem('userData', JSON.stringify(state.userData));
//       localStorage.setItem(
//         'userToken',
//         JSON.stringify({
//           token: state.userToken.token,
//           refreshToken: state.userToken.refreshToken,
//         })
//       );
//     },
//   },
// });

// export const { login, logout, refreshToken, setLoading } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

const userData = JSON.parse(localStorage.getItem('userData')) || null;
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

const initialState = {
  userData,
  userToken,
  isAuthenticated: !!userData,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    login: (state, action) => {
      const { token, refreshToken } = action.payload;
      const decodedToken = jwtDecode(token);  // Decode the token to get user data

      // Save the decoded data as userData
      state.userData = {
        email: decodedToken.sub,
        id: decodedToken.id,
        role: decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        name: decodedToken.name,
        avatar: decodedToken.avatar,
      };
      
      state.userToken = { token, refreshToken };
      state.isAuthenticated = true;
      
      // Save the userData and token to localStorage
      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem('userToken', JSON.stringify({ token, refreshToken }));
    },
    logout: (state, action) => {
      state.userData = null;
      state.userToken = null;
      state.isAuthenticated = false;
      localStorage.setItem('userData', null);
      localStorage.setItem('userToken', null);
    },
    refreshToken: (state, action) => {
      state.userToken.token = action.payload;
      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem(
        'userToken',
        JSON.stringify({
          token: state.userToken.token,
          refreshToken: state.userToken.refreshToken,
        })
      );
    },
  },
});

export const { login, logout, refreshToken, setLoading } = authSlice.actions;
export default authSlice.reducer;
