export const LOGIN = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      reason
      success
      user {
        email
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
