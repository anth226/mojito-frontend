import ArrowDown from "../assets/Icons/ArrowDown";
import ArrowUp from "../assets/Icons/ArrowUp";

const enum performance {
  UP = "UP",
  DOWN = "DOWN",
}

const performanceColors = {
  UP: "#24CA49",
  DOWN: "#FD4438",
};

const performanceBackgroundColors = {
  UP: "#24CA491A",
  DOWN: "#FD44381A",
};

const percentageIcons = {
  UP: <ArrowUp stroke={performanceColors.UP} />,
  DOWN: <ArrowDown stroke={performanceColors.DOWN} />,
};

export {
  performance,
  performanceColors,
  performanceBackgroundColors,
  percentageIcons,
};
