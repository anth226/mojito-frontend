import * as React from "react"

function ArrowDownMini(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={6}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 3.88L8.712.166l1.06 1.06L5 6 .227 1.227l1.06-1.06L5 3.879z"
        fill="#16161E"
      />
    </svg>
  )
}

export default ArrowDownMini
