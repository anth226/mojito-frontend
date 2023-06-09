import { AccountRole, AuthInterface, LoginCredentials } from "./auth";

// A mock function to mimic making an async request for data
export function login(credentials: LoginCredentials) {
  return new Promise<{ data: AuthInterface }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            authenticated:
              credentials.password === AccountRole.AGENCY ||
              credentials.password === AccountRole.CLIENT
                ? true
                : false,
            userEmail: credentials.email,
            role:
              credentials.password === AccountRole.AGENCY
                ? AccountRole.AGENCY
                : credentials.password === AccountRole.CLIENT
                ? AccountRole.CLIENT
                : AccountRole.NOROLE,
          },
        }),
      500
    )
  );
}
