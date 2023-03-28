import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {CgUserlane} from 'react-icons/cg';
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';

export default function ({
  name,
  ts,
  comment,
  rating,
  className
}) {

  return (
    <div className={className}>
      <Card sx={{ maxWidth: 345, borderRadius: '0.6rem', background: '#ECF4F1', fontFamily: 'pf' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name.substring(0,1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <CgUserlane />
            </IconButton>
          }
          title={name}
          subheader={ts}
          titleTypographyProps={{fontFamily: "pf"}}
          subheaderTypographyProps={{fontFamily: "pf"}}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontFamily={"pf"}>
            {comment}
          </Typography>
          <div className='mt-4 text-[#509E82] flex'>
            {Array.from(Array(rating).keys()).map((i) => (
              <AiFillStar/>
            ))}
            {Array.from(Array(5-rating).keys()).map((i) => (
              <AiOutlineStar/>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}