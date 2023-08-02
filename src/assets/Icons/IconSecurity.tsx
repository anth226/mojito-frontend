import React from 'react';

export const IconSecurity = (
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
        d='M20.4902 12.2296L15.5002 14.1096C14.3502 14.5396 13.4102 15.8996 13.4102 17.1196V24.5496C13.4102 25.7296 14.1902 27.2796 15.1402 27.9896L19.4402 31.1996C20.8502 32.2596 23.1702 32.2596 24.5802 31.1996L28.8802 27.9896C29.8302 27.2796 30.6102 25.7296 30.6102 24.5496V17.1196C30.6102 15.8896 29.6702 14.5296 28.5202 14.0996L23.5302 12.2296C22.6802 11.9196 21.3202 11.9196 20.4902 12.2296Z'
        stroke={stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M19.0508 21.8697L20.6608 23.4797L24.9608 19.1797'
        stroke={stroke || 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
