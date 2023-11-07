import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
  isInitialState: false,
  isAuthenticated: false,
  user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const LOGIN_GOOGLE_SUCCESS = "AUTH.LOGIN_GOOGLE_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const ADD_FAVORITE_POST_SUCCESS = "AUTH.ADD_FAVORITE_POST_SUCCESS";
const REMOVE_POST_FROM_FAVORITE_LIST_SUCCESS =
  "AUTH.REMOVE_POST_FROM_FAVORITE_LIST_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_GOOGLE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case ADD_FAVORITE_POST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REMOVE_POST_FROM_FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case UPDATE_PROFILE:
      const { name, phoneNumber, email, role } = action.payload;

      return {
        ...state,
        user: { ...state.user, name, phoneNumber, email, role },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updatedProfile = useSelector((state) => state.user.updatedProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
              accessToken,
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (updatedProfile)
      dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
  }, [updatedProfile]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", {
      email,
      password,
    });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user, accessToken },
    });
    toast.success("Login success");
    callback();
  };

  const loginWithGoogle = async ({ email, name, picture }, callback) => {
    const response = await apiService.post("/oauth/login", {
      email,
      name,
      picture,
    });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: LOGIN_GOOGLE_SUCCESS,
      payload: { user, accessToken },
    });
    toast.success("Login success");
    callback();
  };

  const register = async ({ name, phoneNumber, email, password }, callback) => {
    const response = await apiService.post("/users", {
      name,
      email,
      phoneNumber,
      password,
    });

    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user, accessToken },
    });
    toast.success("Create new Account success");
    callback();
  };

  const addPostToFavoriteList = async ({ postId }, callback) => {
    try {
      const response = await apiService.post(`/users/me/${postId}`);
      const user = response.data.data;
      dispatch({
        type: ADD_FAVORITE_POST_SUCCESS,
        payload: { user },
      });

      toast.success("Add to your favorite list success");
      callback();
    } catch (error) {
      console.error(error);
    }
  };
  const removePostFromFavoriteList = async ({ postId }, callback) => {
    try {
      const response = await apiService.delete(`/users/me/${postId}`);
      const user = response.data.data;
      dispatch({
        type: REMOVE_POST_FROM_FAVORITE_LIST_SUCCESS,
        payload: { user },
      });
      toast.success("Remove to your favorite list success");
      callback();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    toast.success("Logout success");
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        loginWithGoogle,
        addPostToFavoriteList,
        removePostFromFavoriteList,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
