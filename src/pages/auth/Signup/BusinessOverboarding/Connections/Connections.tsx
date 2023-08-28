import { Col, Input, Row, Space } from 'antd';
import React, { useState } from 'react';
import { ConnectionType } from 'enums/connections';
import { toast } from 'react-toastify';
import { CREATE_CONNECTION, DELETE_CONNECTION } from 'api/graphql/mutations';
import { useGraphQlMutation } from 'hooks/useCustomHookApollo';
import ConnectionCard from 'components/ConnectionCard/ConnectionCard';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import classes from './Connections.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getOnboardingFromStore,
  updateConnections,
  setBusinessConnections
} from 'reduxSlices/onboarding/onboarding';

const BusinessOnBoardingConnections = () => {

  const [createConnection] = useGraphQlMutation(CREATE_CONNECTION, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      // dispatch(next());
    },
  });

  const [deleteConnection] = useGraphQlMutation(DELETE_CONNECTION, {
    onError(error) {
      toast.error(error.message);
      throw error;
    },
    onCompleted: () => {
      // dispatch(next());
    },
  });
  const { allConnectionList,bussinessConnections } = useAppSelector(getOnboardingFromStore);

  const [searchValue, setSearchValue] = useState('');

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

  const onConnectButtonClick = async (index: number) => {
    const account_info=JSON.parse(`${localStorage.getItem("mojito_account_info")}`)
    const input = {
      source: ConnectionType[allConnectionList[index].type],
      clientId: account_info._id,
    };
    if(allConnectionList[index].status===0){
      const connectionResponse = await createConnection({
        variables: { input: input },
      });
      const createConnectionData = connectionResponse?.data?.createConnection;
      if (createConnectionData) {
        const payload = {
          action: 'add',
          index,
          connectionKey: allConnectionList[index].key.toString(),
          connectionId: createConnectionData?.connection?._id,
          clientMutationId: createConnectionData?.clientMutationId,
        };
        dispatch(setBusinessConnections(payload));
      }
    }else{
      const curr=bussinessConnections.find((i)=>i.connectionKey===allConnectionList[index].key.toString())
      const input = {
        id: curr?.connectionId,
        clientMutationId:null,
      };
      const deleteConnectionResponse = await deleteConnection({
        variables: { input: input },
      });
      if(deleteConnectionResponse){
      const payload = {
        action: 'remove',
        index,
        connectionKey: allConnectionList[index].key.toString(),
      };
      dispatch(setBusinessConnections(payload));}
    }
    dispatch(updateConnections({ index, notNested: true }));
  };

  return (
    <Space direction='vertical'>
      <>
        <div>
          <h1 style={{ margin: '0px' }}>Connections</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <Input
          className={classes.search_box}
          size='large'
          placeholder='Search'
          prefix={<MagnifyingGlass />}
          onChange={onSearchChange}
        />
        <Row gutter={[16, 16]} justify={'center'}>
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
                  direction='vertical'
                  onConnectButtonClick={() => onConnectButtonClick(index)}
                />
              </Col>
            );
          })}
        </Row>
      </>
    </Space>
  );
};

export default BusinessOnBoardingConnections;
