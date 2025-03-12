import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../config/fireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

// User registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = response;

      await updateProfile(user, {
        displayName: fullName,
      });

      const { uid } = user;

      await sendEmailVerification(user);
      await setDoc(doc(db, "users", uid), {
        email,
        fullName,
        userId: uid,
      });

      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "Account activation email sent",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });

      return;
    } catch (error) {
      console.log(`Error in registerUser:`, error);
      let msg = error.message;
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("email-already-in-use")) msg = "Email already in use";
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " "),
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      return rejectWithValue(
        msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " ")
      );
    }
  }
);

// Password reset
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "Password reset email sent",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    } catch (error) {
      console.log(`Error in resetPassword:`, error);
      let msg = error.message;
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("user-not-found")) msg = "User not found";
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " "),
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      return rejectWithValue(
        msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " ")
      );
    }
  }
);

// User authorization
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified === false) {
        throw Error(`Email not verified`);
      }
      const cleanUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
      };

      return cleanUser;
    } catch (error) {
      console.log(`Error in loginUser:`, error);
      let msg = error.message || "An error occurred";
      if (msg.includes("invalid-email")) msg = "Invalid email";
      if (msg.includes("auth/invalid-credential"))
        msg = "Invalid email or password";
      Toast.show({
        type: "error",
        position: "top",
        text1: "Failed",
        text2: msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " "),
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      return rejectWithValue(
        msg
          .replace("FirebaseError: ", "")
          .replace("Firebase: ", "")
          .replace("auth/", "")
          .replace(/-/g, " ")
      );
    }
  }
);

// User logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(`Error in logoutUser:`, error);
    const msg = error.message || "An error occurred";
    const formattedMessage = msg
      .replace("FirebaseError: ", "")
      .replace("Firebase: ", "")
      .replace("auth/", "")
      .replace(/-/g, " ");
    return rejectWithValue(formattedMessage);
  }
});

// Initialize the authentication listener
// export const initAuthListener = () => dispatch => {
//   dispatch(setIsAuthenticated(undefined)); // Пока не определено
//   return onAuthStateChanged(auth, async user => {
//     console.log(`user`, user);
//     if (user && user?.emailVerified) {
//       const cleanUser = {
//         uid: user?.uid,
//         email: user?.email,
//         displayName: user?.displayName,
//         emailVerified: user?.emailVerified,
//         photoURL: user?.photoURL,
//       };
//       dispatch(setUser(cleanUser));
//       dispatch(setIsAuthenticated(true));
//       dispatch(fetchUserData(cleanUser.uid));
//     } else {
//       dispatch(setUser(null));
//       dispatch(setIsAuthenticated(false));
//     }
//   });
// };

export const initAuthListener = () => dispatch => {
  dispatch(setIsAuthenticated(undefined)); // Пока не определено
  return onAuthStateChanged(auth, async user => {
    try {
      console.log(`user`, user?.displayName);
      if (user && user?.emailVerified) {
        const cleanUser = {
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          emailVerified: user?.emailVerified,
          photoURL: user?.photoURL,
        };
        dispatch(setUser(cleanUser));
        dispatch(setIsAuthenticated(true));
        dispatch(fetchUserData(cleanUser.uid));
      } else {
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
      }
    } catch (error) {
      console.error("Error in auth state listener: ", error);
    }
  });
};

// Get user data from Firestore
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return rejectWithValue("User not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    isAuthenticated: undefined,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
      })
      .addCase(resetPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isLoading = false;
        state.status = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});

export const { setUser, setIsAuthenticated, setIsStatus } = authSlice.actions;
export default authSlice.reducer;
