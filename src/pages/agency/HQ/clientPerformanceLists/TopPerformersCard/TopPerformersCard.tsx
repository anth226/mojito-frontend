import { Card, Divider } from "antd";
import React from "react";
import ClientPerformanceRow from "../clientPerformanceRow/clientPerformanceRow";
import PerformersMenu from "../performersMenu/performersMenu";
import { performance } from "../../../../../constants/Arrows";
import { performanceClientList } from "../../../../../mockdata/Client";

const performersMenuItems = [
  { value: "Revenue" },
  { value: "CPM" },
  { value: "ROAS" },
  { value: "CTR" },
];

const TopPerformersCard = () => {
  return (
    <Card>
      <h3
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "0px",
        }}
      >
        Top Perfromers
        <span
          style={{
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "16px",
            letterSpacing: "0em",
            textAlign: "right",
            color: "#818183",
          }}
        >
          See more
        </span>
      </h3>
      <PerformersMenu items={performersMenuItems} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "32px",
        }}
      >
        {performanceClientList.map((performer, index) => {
          return (
            <React.Fragment key={index}>
              <ClientPerformanceRow client={performer} type={performance.UP} />
              {index !== performanceClientList.length - 1 ? (
                <Divider style={{ margin: "12px 0px" }} />
              ) : (
                ""
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Card>
  );
};

export default TopPerformersCard;
