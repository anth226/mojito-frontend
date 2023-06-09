import * as React from "react"

function MultiStack(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.333 11.334L8 14.667l6.666-3.333M1.333 8L8 11.334 14.666 8M8 1.333L1.333 4.668 8 8l6.666-3.333L8 1.334z"
        stroke="#fff"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MultiStack
