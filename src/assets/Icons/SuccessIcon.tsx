import * as React from 'react';

function SuccessIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width='74'
      height='74'
      viewBox='0 0 74 74'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M36.9997 67.8333C53.9581 67.8333 67.8331 53.9583 67.8331 36.9999C67.8331 20.0416 53.9581 6.1666 36.9997 6.1666C20.0414 6.1666 6.16638 20.0416 6.16638 36.9999C6.16638 53.9583 20.0414 67.8333 36.9997 67.8333Z'
        stroke='#0062FF'
        strokeWidth='4.625'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M23.8961 36.9998L32.622 45.7256L50.1045 28.2739'
        stroke='#0062FF'
        strokeWidth='4.625'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default SuccessIcon;
