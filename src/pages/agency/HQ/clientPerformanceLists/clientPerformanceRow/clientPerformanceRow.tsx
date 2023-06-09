import { Avatar, Space } from "antd";
import { Avatars } from "../../../../../assets/base64Icons";
import CustomBadge from "../../../../../components/CustomBadge/CustomBadge";
import { USDcurrency } from "../../../../../utils/formatters";
import { Client } from "../../../../../interfaces/Client";
import {
  percentageIcons,
  performance,
  performanceBackgroundColors,
  performanceColors,
} from "../../../../../constants/Arrows";

const { IconBadge } = CustomBadge;

interface ClientPerformanceRowProps {
  client: Client;
  type: performance;
}

const ClientPerformanceRow = ({ client, type }: ClientPerformanceRowProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Space>
        <Avatar size={"small"} src={client.avatar?? Avatars.AVATAR1} />
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          {client.name ?? "NAME"}
        </span>
      </Space>
      <Space>
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
        <IconBadge
          icon={percentageIcons[type]}
          color={performanceColors[type]}
          backgroundColor={performanceBackgroundColors[type]}
        />
      </Space>
    </div>
  );
};

export default ClientPerformanceRow;
