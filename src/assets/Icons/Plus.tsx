import * as React from "react"

function PlusIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_514_19808)">
        <path
          d="M9.168 9.951v-5h1.667v5h5v1.667h-5v5H9.168v-5h-5V9.95h5z"
          fill={props.fill?? "#0062FF"}
        />
      </g>
      <defs>
        <clipPath id="clip0_514_19808">
          <path fill="#fff" transform="translate(0 .784)" d="M0 0H20V20H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default PlusIcon
