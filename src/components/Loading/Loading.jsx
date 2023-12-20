import { Spin } from 'antd';

const Loading = () => {
  return (
    <div className='flex-1 justify-center  mt-40'>
      <Spin tip="Loading Posts" size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loading;
