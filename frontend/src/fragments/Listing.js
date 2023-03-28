import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345, paddingTop: '1rem', borderRadius: '0.6rem'}}>
      <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image="../images/phone-generic.jpg"
            alt="green iguana" 
            paddingTop={"1rem"}
        />
        <CardContent>
          <Typography gutterBottom variant="span" component="div" fontFamily={"pf"} textAlign={"center"}>
            Random Device
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}