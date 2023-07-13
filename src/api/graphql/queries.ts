import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query User($userId: String!) {
    user(id: $userId) {
      _id
      accountType
      agency {
        _id
        alerts {
          totalCount
          hasMore
          nodes {
            value
            parameter
            operation
            name
            createdAt
          }
        }
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

export const ALERT_INFO = gql`
  query Alert($alertId: String!) {
    alert(id: $alertId) {
      _id
      name
      value
    }
  }
`;

export const GET_LIST_ALERTS = gql`
  query Alerts($take: Int, $skip: Int, $orderBy: AlertOrder) {
    alerts(take: $take, skip: $skip, orderBy: $orderBy) {
      totalCount
      nodes {
        _id
        name
        connection {
          source
          _id
        }
        parameter
        value
        operation
        archived
        fires
      }
      hasMore
    }
  }
`;

export const CONNECTION_INFO = gql`
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

export const GET_LIST_CONNECTIONS = gql`
  query Connections($take: Int, $skip: Int, $orderBy: ConnectionOrder) {
    connections(take: $take, skip: $skip, orderBy: $orderBy) {
      totalCount
      nodes {
        _id
        client {
          name
          email
          _id
        }
        source
      }
      hasMore
    }
  }
`;

export const GET_LIST_CLIENTS = gql`
  query Clients(
    $nameOrEmail: String
    $take: Int
    $skip: Int
    $orderBy: UserOrder
  ) {
    clients(
      nameOrEmail: $nameOrEmail
      take: $take
      skip: $skip
      orderBy: $orderBy
    ) {
      totalCount
      nodes {
        _id
        email
        name
      }
      hasMore
    }
  }
`;

export const GET_LIST_MEMBERS = gql`
  query Members(
    $nameOrEmail: String
    $take: Int
    $skip: Int
    $orderBy: UserOrder
  ) {
    members(
      nameOrEmail: $nameOrEmail
      take: $take
      skip: $skip
      orderBy: $orderBy
    ) {
      totalCount
      nodes {
        _id
        name
        email
      }
      hasMore
    }
  }
`;
