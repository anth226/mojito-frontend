import * as React from "react"

function LightBulb(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
        d="M9.5 22.5h5m-4.5-12h4m-2 0v6m3-.674a7 7 0 10-6 0v.674c0 .932 0 1.398.152 1.765a2 2 0 001.083 1.083c.367.152.833.152 1.765.152.932 0 1.398 0 1.765-.152a2 2 0 001.083-1.083C15 17.898 15 17.432 15 16.5v-.674z"
        stroke="#2E2E3A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LightBulb
