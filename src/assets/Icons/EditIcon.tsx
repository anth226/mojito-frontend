import * as React from 'react';

function EditIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M12 20.0002H21M3 20.0002H4.67454C5.16373 20.0002 5.40832 20.0002 5.63849 19.9449C5.84256 19.8959 6.03765 19.8151 6.2166 19.7055C6.41843 19.5818 6.59138 19.4088 6.93729 19.0629L19.5001 6.50022C20.3285 5.6718 20.3285 4.32865 19.5001 3.50022C18.6716 2.6718 17.3285 2.6718 16.5001 3.50022L3.93726 16.0629C3.59136 16.4088 3.4184 16.5818 3.29472 16.7836C3.18506 16.9626 3.10425 17.1576 3.05526 17.3617C3 17.5919 3 17.8365 3 18.3257V20.0002Z'
        stroke='#262631'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default EditIcon;
