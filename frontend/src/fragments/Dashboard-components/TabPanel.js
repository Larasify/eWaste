/**
 * Reusbale Table Panel 
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function TabPanel(props) {
    /* 
    * @param {props} panel props to render panel
    */
    const { children, value, index, ...other } = props;
        
    /* Main renderer */
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
    