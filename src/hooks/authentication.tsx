import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAuthFromStore,
  loginAsync,
  LoginCredentials,
} from "../reduxSlices/auth/auth";

const useAuthentication = () => {
  const authObject = useAppSelector(getAuthFromStore);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (authObject.authenticated === false) {
      navigate("/auth/login");
    }
  }, [authObject.authenticated, navigate]);

  const authenticate = useCallback(
    (credentials: LoginCredentials) => {
      dispatch(loginAsync(credentials));
    },
    [dispatch]
  );

  return {
    authenticate,
  };
};

export default useAuthentication;
