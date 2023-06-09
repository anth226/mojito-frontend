import { Col, Input, Row, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import ConnectionCard from "../../../../../components/ConnectionCard/ConnectionCard";
import { ConnectionStatus } from "../../../../../enums/connections";
import { ReactComponent as MagnifyingGlass } from "../../../../../assets/Icons/MagnifyingGlass.svg";
import classes from "./Connections.module.css";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  countNestedConnections,
  getOnboardingFromStore,
  nested,
  updateConnections,
} from "../../../../../reduxSlices/onboarding/onboarding";
import ConnectClients from "./ConnectClients/ConnectClients";
import { AgencyOnBoardingPaths } from "../../../../paths";

const AgencyOnBoardingConnections = () => {
  const { nestedSteps, allConnectionList, nestedPath, prevStep } =
    useAppSelector(getOnboardingFromStore);

  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    setSearchValue(searchString);
  };

  const isInSearch = (connectionName: string) => {
    if (connectionName.includes(searchValue)) {
      return true;
    } else {
      return false;
    }
  };

  const onConnectButtonClick = (index: number) => {
    dispatch(updateConnections({ index }));
    dispatch(countNestedConnections({ set: false }));
  };

  const separateSelectedConnections = useMemo(() => {
    const selected = allConnectionList.filter(
      (connection) => connection.status === ConnectionStatus.CONNECTED
    );
    return selected;
  }, [allConnectionList]);

  useEffect(() => {
    dispatch(nested(AgencyOnBoardingPaths.CONNECTIONS));
    dispatch(countNestedConnections({ set: prevStep === 1 ? false : true }));
    return () => {
      dispatch(nested(""));
    };
  }, [dispatch, prevStep]);

  return (
    <Space direction="vertical">
      {nestedSteps === 0 && (
        <>
          <div>
            <h1 style={{ margin: "0px" }}>Connections</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <Input
            className={classes.search_box}
            size="large"
            placeholder="Search"
            prefix={<MagnifyingGlass />}
            onChange={onSearchChange}
          />
          <Row gutter={[16, 16]} justify={"center"}>
            {allConnectionList.map((connection, index) => {
              if (!isInSearch(connection.name)) {
                return <React.Fragment key={connection.key}></React.Fragment>;
              }
              return (
                <Col key={connection.key}>
                  <ConnectionCard
                    connection={connection}
                    cover
                    description
                    direction="vertical"
                    onConnectButtonClick={() => onConnectButtonClick(index)}
                  />
                </Col>
              );
            })}
          </Row>
        </>
      )}
      {nestedPath === AgencyOnBoardingPaths.CONNECTIONS && nestedSteps > 0 && (
        <ConnectClients
          connection={separateSelectedConnections[nestedSteps - 1]}
        />
      )}
    </Space>
  );
};

export default AgencyOnBoardingConnections;
