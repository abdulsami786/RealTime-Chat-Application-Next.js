import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

interface loadingProps  {}

const loading: FC<loadingProps> = ({}) => {
    return (
        <div className='w-full flex flex-col gap-3'>
            <Skeleton className='mb-4' height={60} width={500} />
            <Skeleton height={20} width={150} />
            <Skeleton height={50} width={150} />
      </div>
  )
};
export default loading;