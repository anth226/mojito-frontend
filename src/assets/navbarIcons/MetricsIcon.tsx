import * as React from "react"

function MetricsIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 10h6v8H0v-8zm14-5h6v13h-6V5zM7 0h6v18H7V0zM2 12v4h2v-4H2zM9 2v14h2V2H9zm7 5v9h2V7h-2z"
        fill={props.fill ?? "#70707C"}
      />
    </svg>
  )
}

export default MetricsIcon
