import * as React from "react"

function AlertIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={21}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.134 3.5a1 1 0 011.732 0l8.536 14.785a1 1 0 01-.866 1.5H3.464a1 1 0 01-.866-1.5L11.134 3.5z"
        stroke={props.stroke ?? "#70707C"}
        strokeWidth={2}
      />
      <path
        d="M12.56 9.228l-.124 4.583h-1.17l-.127-4.583h1.422zm-.709 6.629a.746.746 0 01-.543-.224.73.73 0 01-.224-.543.716.716 0 01.224-.537.746.746 0 01.543-.224c.203 0 .38.074.534.224a.733.733 0 01.121.923.827.827 0 01-.278.278.727.727 0 01-.377.103z"
        fill={props.fill ?? "#70707C"}
      />
    </svg>
  )
}

export default AlertIcon
