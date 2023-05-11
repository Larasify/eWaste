/**
 * User Comments Component
 * @version 1
 * @author [Samar Musthafa](https://git.shefcompsci.org.uk/act22sm)
 * 
 */
/* Module imports */
import * as React from 'react';
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
  /* 
  * @param {name} name of user who left review
  * @param {ts} timestamp of review
  * @param {comment} review text
  * @param {rating} star rating of review
  * @param {className} div name
  */
  return (
    <div className={className}>
      <Card sx={{ maxWidth: 345, borderRadius: '0.6rem', background: '#ECF4F1', fontFamily: 'pf' }}>
        {/* Render card header */}
        <CardHeader
        /* User logo */
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {name.substring(0,1)}
            </Avatar>
          }
          /* Actions */
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
        {/* Comment */}
        <CardContent>
          <Typography variant="body2" color="text.secondary" fontFamily={"pf"}>
            {comment}
          </Typography>
          <div className='mt-4 text-[#509E82] flex'>
            {/* Star rating */}
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