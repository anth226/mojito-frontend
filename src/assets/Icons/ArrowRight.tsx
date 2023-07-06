import * as React from 'react';

function ArrowRight(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clip-path='url(#clip0_319_41684)'>
        <path
          d='M9.88047 8.99995L6.16797 5.28745L7.22847 4.22695L12.0015 8.99995L7.22847 13.7729L6.16797 12.7124L9.88047 8.99995Z'
          fill={props.fill ?? '#262631'}
        />
      </g>
      <defs>
        <clipPath id='clip0_319_41684'>
          <rect
            width='18'
            height='18'
            fill='#fff'
            transform='translate(0 18) rotate(-90)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ArrowRight;
