import { TinyArea, TinyAreaConfig } from "@ant-design/plots";

const TinyAreaGraph = () => {
  const data = [20, 20, 20, 25, 25, 25];

  const config: TinyAreaConfig = {
    height: 60,
    width: 200,
    autoFit: false,
    data,
    smooth: true,
    meta: {
      y: {
        min: 15,
        max: 30,
      },
    },
    areaStyle: {
      fill: "l(270) 0.5:#ffffff 1:#FE7E07",
    },
    line: {
      color: "l(270) 0:#FE7E07 1:#027A48",
      size: 3,
    },
    annotations: [
      {
        type: "line",
        start: ["min", "median"],
        end: ["max", "median"],
        text: {
          content: "AVG",
          offsetY: 0,
          style: {
            textAlign: "left",
            fontSize: 10,
            fill: "rgba(44, 53, 66, 0.45)",
            textBaseline: "bottom",
            shadowBlur: 10,
          },
        },
      },
    ],
  };

  return <TinyArea {...config} />;
};

export default TinyAreaGraph;
