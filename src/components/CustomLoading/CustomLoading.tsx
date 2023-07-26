import { Spin } from 'antd';
import classes from './CustomLoading.module.css';

type CustomLoadingProps = {
  loading: boolean;
};

export const CustomLoading = (props: CustomLoadingProps) => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className={classes.box_spin}>
          <Spin size='large' />
        </div>
      )}
    </>
  );
};
