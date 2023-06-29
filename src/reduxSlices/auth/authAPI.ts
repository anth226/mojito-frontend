import axios from 'axios';
import { LoginCredentials, SignupAgency, SignupBusiness } from './auth';
import { APP_API_URL } from '../../configs/env';
import {
  LOGIN,
  REGISTER_AGENCY,
  REGISTER_BUSINESS,
} from 'api/graphql/mutations';
import { toast } from 'react-toastify';
import { setAccessToken, setAccountInfo } from 'utils/helpers';

// A mock function to mimic making an async request for data

export const login = async (credentials: LoginCredentials): Promise<any> => {
  return await axios
    .post(APP_API_URL, {
      query: LOGIN,
      variables: { input: credentials },
    })
    .then((response) => {
      const data = response?.data?.data?.login;
      if (data?.success === false) {
        toast.error(data?.reason);
      }
      setAccessToken(data?.accessToken);
      const user = data?.user;
      const { accountType, ...rest } = user;
      setAccountInfo({ ...rest });
      return data;
    })
    .catch((err) => {
      toast.error(err.message);
      throw err;
    });
};

export const signupByBusiness = async (
  signupByBusiness: Omit<SignupBusiness, 'account'>
): Promise<any> => {
  return await axios
    .post(APP_API_URL, {
      query: REGISTER_BUSINESS,
      variables: { input: signupByBusiness },
    })
    .then((response) => {
      if (response.data?.errors?.length > 0) {
        throw response.data.errors[0];
      }
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
      throw err;
    });
};

export const signupByAgency = async (
  signupByAgency: Omit<SignupAgency, 'account'>
): Promise<any> => {
  return await axios
    .post(APP_API_URL, {
      query: REGISTER_AGENCY,
      variables: { input: signupByAgency },
    })
    .then((response) => {
      if (response.data?.errors?.length > 0) {
        throw response.data.errors[0];
      }
      return response.data;
    })
    .catch((err) => {
      toast.error(err.message);
      throw err;
    });
};
