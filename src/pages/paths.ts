export enum AuthenticationPaths {
  LOGINPATH = '/auth/login',
  SIGNUP = '/auth/signup',
  AGENCY_OVERBOARDING = '/auth/agency-overboarding',
  BUSINESS_OVERBOARDING = '/auth/business-overboarding',
}

export enum AgencyNavBarPaths {
  HQ = '/agency/overview',
  Metrics = '/agency/metrics',
  Alerts = '/agency/alerts',
  Connections = '/agency/connections',
  Settings = '/agency/settings/:tab',
  AddClient = '/agency/add-client',
}

export enum ClientNavBarPaths {
  OVERVIEW = '/client/overview',
  PERFORMANCE = '/client/performance',
  Connections = '/client/connections',
  Alerts = '/client/alerts',
  Settings = '/client/settings/:tab',
}

export enum ClientSettingsTabsKeys {
  DETAILS = 'my-details',
  USERS = 'users',
  BILLING = 'billing',
  PASSWORD_AND_SECURITY = 'password-and-security',
}

export enum ClientSettingsTabsPaths {
  DETAILS = '/client/settings/my-details',
  USERS = '/client/settings/users',
  BILLING = '/client/settings/billing',
  PASSWORD_AND_SECURITY = '/client/settings/password-and-security',
}

export enum AgencyOnBoardingPaths {
  CLIENTS = '/auth/agency-overboarding/2',
  CONNECTIONS = '/auth/agency-overboarding/3',
  ALERTS = '/auth/agency-overboarding/4',
  BILLING = '/auth/agency-overboarding/5',
  USERS = '/auth/agency-overboarding/6',
}

export enum BusinessOnBoardingPaths {
  CONNECTIONS = '/auth/business-overboarding/2',
  BILLING = '/auth/business-overboarding/3',
  USERS = '/auth/business-overboarding/4',
}

export enum AgencySettingsTabsKeys {
  DETAILS = 'my-details',
  USERS = 'users',
  BILLING = 'billing',
  PASSWORD_AND_SECURITY = 'password-and-security',
}

export enum AgencySettingsTabsPaths {
  DETAILS = '/agency/settings/my-details',
  USERS = '/agency/settings/users',
  BILLING = '/agency/settings/billing',
  PASSWORD_AND_SECURITY = '/agency/settings/password-and-security',
}
