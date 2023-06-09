import * as React from "react"

function ConnectionsIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 5.284a2.5 2.5 0 015 0v1.5h1c1.398 0 2.097 0 2.648.229a3 3 0 011.624 1.623c.228.551.228 1.25.228 2.648h1.5a2.5 2.5 0 010 5H18v1.7c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311c-.642.327-1.482.327-3.162.327h-.7v-1.75a2.25 2.25 0 00-4.5 0v1.75H6.8c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.31C2 20.503 2 19.663 2 17.983v-1.7h1.5a2.5 2.5 0 000-5H2c0-1.398 0-2.097.228-2.648a3 3 0 011.624-1.623c.551-.229 1.25-.229 2.648-.229h1v-1.5z"
        stroke={props.stroke ?? "#656575"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ConnectionsIcon
