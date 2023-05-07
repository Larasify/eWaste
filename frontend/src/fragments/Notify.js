import toast from 'react-hot-toast';

export const Notify = {
    success: (message) => {
        toast.success(message, {
            style: {
              border: '1px solid #449646',
              padding: '16px',
              color: '#ffffff',
              backgroundColor: '#449646',
              fontWeight: 'bold'
            },
            iconTheme: {
              primary: '#FFFAEE',
              secondary: '#449646',
            },
        });
    },
    error: (message) => {
        toast.error(message, {
            style: {
              border: '1px solid #e54444',
              padding: '16px',
              color: '#ffffff',
              backgroundColor: '#e54444',
              fontWeight: 'bold'
            },
            iconTheme: {
              primary: '#FFFAEE',
              secondary: '#e54444',
            },
        });
    }

}