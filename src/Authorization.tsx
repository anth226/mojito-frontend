import React, { useCallback, useEffect } from "react";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import {
  AgencyNavBarPaths,
  AuthenticationPaths,
  ClientNavBarPaths,
} from "./pages/paths";
import { AccountRole, getAuthFromStore } from "./reduxSlices/auth/auth";

interface isMatchArguments {
  pathPatternEnum: typeof ClientNavBarPaths | typeof AgencyNavBarPaths;
  location: string;
}
function isMatch(
  pathPatternEnum: isMatchArguments["pathPatternEnum"],
  location: isMatchArguments["location"]
): boolean {
  const paths = Object.values(pathPatternEnum);
  for (let i = 0; i < paths.length; i++) {
    if (matchPath(paths[i], location)) {
      return true;
    }
  }
  return false;
}

const Authorization: React.FunctionComponent = () => {
  const authObject = useAppSelector(getAuthFromStore);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  //   console.log(authObject.role, pathname)

  const authorizedAgency = useCallback((role: any, path: any) => {
    const authorizedPath = isMatch(AgencyNavBarPaths, path);
    if (role === AccountRole.AGENCY && authorizedPath) {
      console.log("ROLE: AGENCY");
    } else {
      navigate(AuthenticationPaths.LOGINPATH);
    }
  }, []);

  const authorizedClient = useCallback((role: any, path: any) => {
    const authorizedPath = isMatch(ClientNavBarPaths, path);
    if (role === AccountRole.CLIENT && authorizedPath) {
      console.log("ROLE: CLIENT");
    } else {
      navigate(AuthenticationPaths.LOGINPATH);
    }
  }, []);

  useEffect(() => {
    if (authObject.role === AccountRole.NOROLE) {
      navigate(AuthenticationPaths.LOGINPATH);
    }
    if (authObject.role === AccountRole.AGENCY) {
      authorizedAgency(authObject.role, pathname);
    }
    if (authObject.role === AccountRole.CLIENT) {
      authorizedClient(authObject.role, pathname);
    }
  }, [authObject.role, authorizedAgency, authorizedClient, pathname]);

  return <Outlet />;
};

export default Authorization;
