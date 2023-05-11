/**
 * Notifier service
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import toast from 'react-hot-toast';

/* Notifier */
export const Notify = {
    /* On success */
    success: (message) => {
        /* 
        * @param {message} message to show
        */
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
    /* on Failures */
    error: (message) => {
        /* 
        * @param {message} message to show
        */
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