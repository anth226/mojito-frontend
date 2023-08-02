import React from 'react';

export const IconKey = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => {
  const { fill, stroke } = props;
  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='22' cy='22' r='22' fill={fill || '#262631'} />
      <path
        d='M29.7887 24.9303C27.7287 26.9803 24.7787 27.6103 22.1887 26.8003L17.4787 31.5003C17.1387 31.8503 16.4687 32.0603 15.9887 31.9903L13.8087 31.6903C13.0887 31.5903 12.4187 30.9103 12.3087 30.1903L12.0087 28.0103C11.9387 27.5303 12.1687 26.8603 12.4987 26.5203L17.1987 21.8203C16.3987 19.2203 17.0187 16.2703 19.0787 14.2203C22.0287 11.2703 26.8187 11.2703 29.7787 14.2203C32.7387 17.1703 32.7387 21.9803 29.7887 24.9303Z'
        stroke={stroke || 'white'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M16.8906 27.4902L19.1906 29.7902'
        stroke={stroke || 'white'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.5 21C25.3284 21 26 20.3284 26 19.5C26 18.6716 25.3284 18 24.5 18C23.6716 18 23 18.6716 23 19.5C23 20.3284 23.6716 21 24.5 21Z'
        stroke={stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
