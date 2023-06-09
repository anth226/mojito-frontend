import { Row, Col, Space, Button, Select, Avatar, Dropdown } from "antd";
import { ReactComponent as Filter } from "../../../assets/Filter.svg";
import PerformersMenu from "../HQ/clientPerformanceLists/performersMenu/performersMenu";
import { Client } from "../../../interfaces/Client";
import UserRow from "../../../components/UserRow/UserRow";
import { useState } from "react";
import TinyAreaGraph from "./TinyAreaGraph/TinyAreaGraph";
import { USDcurrency } from "../../../utils/formatters";
import CustomBadge from "../../../components/CustomBadge/CustomBadge";
import { Connections } from "../../../assets/base64Icons";
import ArrowDownMini from "../../../assets/Icons/ArrowDownMini";
import { mockClients } from "../../../mockdata/Client";

const performersMenuItems = [
  { value: "Revenue" },
  { value: "CPM" },
  { value: "ROAS" },
  { value: "CTR" },
];

const { IconBadge } = CustomBadge;

const Metrics = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);

  return (
    <>
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h1 style={{ margin: "0px" }}>Metrics</h1>
            <Space>
              <Button type="text">7 days</Button>
              <Button type="text">MTD</Button>
              <Button type="text">30 days</Button>
              <Button type="text">90 days</Button>
              <Button type="text">YTD</Button>
              <Select
                style={{ width: "150px" }}
                defaultValue="Popular"
                options={[{ value: "popular", label: "Popular" }]}
              />
              <Button icon={<Filter />} />
            </Space>
          </div>
        </Col>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PerformersMenu items={performersMenuItems} />
            <Dropdown
              menu={{
                items: [
                  {
                    label: "Ascending (Metric)",
                    key: "asc-metric",
                  },
                  {
                    label: "Descending (Metric)",
                    key: "desc-metric",
                  },
                  {
                    label: "Ascending (Name)",
                    key: "asc-name",
                  },
                  {
                    label: "Descending (Name)",
                    key: "desc-name",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  padding: "12px 24px",
                  borderRadius: "25px",
                  width: "120px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span>Sort by</span>
                <ArrowDownMini />
              </div>
            </Dropdown>
          </div>
        </Col>
      </Row>
      {clients.map((client, index) => (
        <UserRow
          key={index}
          user={client}
          extras={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TinyAreaGraph />
                <div
                  style={{
                    display: "flex",
                    columnGap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                    }}
                  >
                    {client.value
                      ? USDcurrency.format(client.value)
                      : USDcurrency.format(1280)}
                  </span>
                  <IconBadge />
                </div>
              </div>
              <Avatar.Group>
                <Avatar
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "1px 2px 0px 0px #f3f1f1",
                    padding: "4px",
                  }}
                  src={
                    <img
                      src={Connections.TIKTOK}
                      alt={""}
                      style={{ objectFit: "contain" }}
                    />
                  }
                />
                <Avatar
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "1px 2px 0px 0px #f3f1f1",
                    padding: "4px",
                  }}
                  src={Connections.GOOGLE_ADS}
                />
                <Avatar
                  style={{
                    backgroundColor: "#FFFFFF",
                    boxShadow: "1px 2px 0px 0px #f3f1f1",
                    padding: "4px",
                  }}
                  src={
                    <img
                      src={Connections.META}
                      alt={""}
                      style={{ objectFit: "contain" }}
                    />
                  }
                />
              </Avatar.Group>
            </div>
          }
          style={{ backgroundColor: "#FFFFFF" }}
        />
      ))}
    </>
  );
};

export default Metrics;
