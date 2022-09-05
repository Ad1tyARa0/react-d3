import React from 'react';
import { Toaster } from 'react-hot-toast';

// Component props.
interface CustomToasterProps {}

const CustomToasterComponent: React.FunctionComponent<
  CustomToasterProps
> = () => {
  return (
    <Toaster
      position='top-center'
      reverseOrder={false}
      gutter={8}
      containerClassName=''
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
        },

        // Default options for specific types
        success: {
          duration: 3000,
          theme: {
            primary: '#2ecc71',
            secondary: 'black',
          },
        },

        error: {
          duration: 3000,
          theme: {
            primary: '#e74c3c',
            secondary: 'black',
          },
        },
      }}
    />
  );
};

export const CustomToaster = CustomToasterComponent;
