import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      accountType
      agency {
        _id
      }
    }
  }
`;

export const VIEWER = gql`
  query Viewer {
    viewer {
      _id
      accountType
      email
    }
  }
`;

export const ALERT = gql`
  query Alert($alertId: String!) {
    alert(id: $alertId) {
      _id
      name
      value
    }
  }
`;

export const CONNECTION = gql`
  query Connection($connectionId: String!) {
    connection(id: $connectionId) {
      client {
        _id
        name
        email
        accountType
      }
      _id
    }
  }
`;
