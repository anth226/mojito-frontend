import { gql } from '@apollo/client';

export const LOGIN = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      reason
      success
      user {
        _id
        email
        name
        accountType
      }
    }
  }
`;

export const REGISTER_BUSINESS = `
  mutation RegisterBusiness($input: RegisterBusinessInput!) {
    registerBusiness(input: $input) {
      user {
        name
        email
        accountType
      }
    }
  }
`;

export const REGISTER_AGENCY = `
  mutation RegisterAgency($input: RegisterAgencyInput!) {
    registerAgency(input: $input) {
      user {
        email
        name
        accountType
        
      }
    }
  }
`;

export const INVITE_CLIENTS = gql`
  mutation InviteClients($input: InviteClientsInput!) {
    inviteClients(input: $input) {
      clientMutationId
      clients {
        _id
        name
        email
      }
    }
  }
`;

export const CREATE_CONNECTION = gql`
  mutation CreateConnection($input: CreateConnectionInput!) {
    createConnection(input: $input) {
      clientMutationId
      connection {
        _id
      }
    }
  }
`;

export const DELETE_CONNECTION = gql`
  mutation DeleteConnection($input: DeleteConnectionInput!) {
    deleteConnection(input: $input) {
      clientMutationId
    }
  }
`;

export const CREATE_ALERTS = gql`
  mutation CreateAlerts($input: CreateAlertsInput!) {
    createAlerts(input: $input) {
      clientMutationId
      alerts {
        name
        value
      }
    }
  }
`;
