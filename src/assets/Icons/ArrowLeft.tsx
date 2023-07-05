import * as React from 'react';

function ArrowLeft(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width={20}
      height={20}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_319_41332)'>
        <path
          d='M8.11953 9.00005L11.832 12.7126L10.7715 13.7731L5.99853 9.00005L10.7715 4.22705L11.832 5.28755L8.11953 9.00005Z'
          fill={props.fill ?? '#262631'}
        />
      </g>
      <defs>
        <clipPath id='clip0_319_41332'>
          <path
            fill='#fff'
            transform='translate(18) rotate(90)'
            d='M0 0H20V20H0z'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowLeft;
