/**
 * Device Listing Component
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';

export default function MultiActionAreaCard({
  title
}) {
  /* 
  * @param {title} title of the listed devicec
  */
  return (
    <Card sx={{  paddingTop: '1rem', borderRadius: '0.6rem', width: '9rem'}}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image="../images/phone-generic.jpg"
            alt="green iguana" 
            paddingTop={"1rem"}
        />
        <CardContent>
          <Typography gutterBottom variant="span" component="div" fontFamily={"pf"} textAlign={"center"} fontSize={'0.9rem'}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}