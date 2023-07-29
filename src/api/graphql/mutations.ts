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
        role
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
        authUrl
        availableAccounts {
          name
          id
        }
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

export const UPDATE_ALERT = gql`
  mutation UpdateAlert($input: UpdateAlertInput!) {
    updateAlert(input: $input) {
      clientMutationId
      alert {
        _id
      }
    }
  }
`;

export const INVITE_MEMBERS = gql`
  mutation InviteMembers($input: InviteMembersInput!) {
    inviteMembers(input: $input) {
      members {
        name
        email
        role
      }
      clientMutationId
    }
  }
`;

export const SYNC_CONNECTION = gql`
  mutation SyncConnection($input: SyncConnectionInput!) {
    syncConnection(input: $input) {
      connection {
        source
        status
        client {
          name
          email
          _id
        }
        _id
      }
      clientMutationId
    }
  }
`;

export const UPDATE_CONNECTION = gql`
  mutation UpdateConnection($input: UpdateConnectionInput!) {
    updateConnection(input: $input) {
      connection {
        _id
        authUrl
      }
    }
  }
`;

export const UPDATE_AGENCY = gql`
  mutation UpdateAgency($input: UpdateAgencyInput!) {
    updateAgency(input: $input) {
      agency {
        _id
      }
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness($input: UpdateBusinessInput!) {
    updateBusiness(input: $input) {
      business {
        _id
      }
    }
  }
`;

export const ARCHIVE_ALERT = gql`
  mutation ArchiveAlert($input: ArchiveAlertInput!) {
    archiveAlert(input: $input) {
      clientMutationId
    }
  }
`;
