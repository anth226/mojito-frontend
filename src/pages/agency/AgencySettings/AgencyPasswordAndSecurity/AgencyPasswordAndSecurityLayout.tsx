import { Space } from "antd";
import ArrowRight from "assets/Icons/ArrowRight";
import { IconKey } from "assets/Icons/IconKey";
import { IconSecurity } from "assets/Icons/IconSecurity";
import classes from "./AgencyPasswordAndSecurity.module.css";
import { useState } from "react";
import AgencyPasswordAndSecurity from "./AgencyPasswordAndSecurity";
import { AgencyTwoFactorAuth } from "./AgencyTwoFactorAuth";

export const AgencyPasswordAndSecurityLayout = () => {
  const [securityMethod, setSecurityMethod] = useState<string>("");

  const securityMethods = [
    {
      name: "Password",
      icon: <IconKey fill="#F2F3F7" stroke="#656575" />,
    },
    {
      name: "Two-factor authentification",
      icon: <IconSecurity fill="#F2F3F7" stroke="#656575" />,
    },
  ];
  return (
    <>
      {securityMethod === "Password" && <AgencyPasswordAndSecurity />}
      {securityMethod === "Two-factor authentification" && (
        <AgencyTwoFactorAuth />
      )}
      {!securityMethod && (
        <div className={classes.box_content}>
          {securityMethods.map((item: any, index: number) => (
            <Space
              className={classes.box_item}
              key={index}
              onClick={() => setSecurityMethod(item.name)}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {item.icon}
                <p className={classes.item_name}>{item.name}</p>
              </div>
              <ArrowRight />
            </Space>
          ))}
        </div>
      )}
    </>
  );
};
