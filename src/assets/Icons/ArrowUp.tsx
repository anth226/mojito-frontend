import * as React from "react"

function ArrowUp(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={9}
      viewBox="0 0 10 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 8V1m0 0L1.5 4.5M5 1l3.5 3.5"
        stroke={"#027A48"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props as React.SVGProps<SVGPathElement>}
      />
    </svg>
  )
}

export default ArrowUp
