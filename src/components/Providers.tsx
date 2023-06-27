'use client'

import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';


// you might use ReactNode when you want to allow a prop to hold a string, a number, an element, or an array of elements.

interface ProvidersProps  {
    children:ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    return (
        <>
            <Toaster position='top-center' reverseOrder={false} />
            {children}
        </>
  )
};
export default Providers;