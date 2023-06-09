import * as React from "react";

function HQIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 18V8h8v10h-8zM0 10V0h8v10H0zm6-2V2H2v6h4zM0 18v-6h8v6H0zm2-2h4v-2H2v2zm10 0h4v-6h-4v6zM10 0h8v6h-8V0zm2 2v2h4V2h-4z"
        fill={props.fill ?? "#70707C"}
      />
    </svg>
  );
}

export default HQIcon;
