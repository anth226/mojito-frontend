import * as React from "react";

function DropDown(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 10L3 5H13L8 10Z" fill="#535362" />
    </svg>
  );
}

export default DropDown;
