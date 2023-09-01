import * as React from "react"

function Close(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={props.width ?? 18}
      height={props.height ?? 18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.001 7.115l6.6-6.6L17.486 2.4l-6.6 6.6 6.6 6.6-1.885 1.885-6.6-6.6-6.6 6.6L.516 15.6l6.6-6.6-6.6-6.6L2.4.515l6.6 6.6z"
        fill={props.fill ?? "#262631"}
      />
    </svg>
  )
}

export default Close
