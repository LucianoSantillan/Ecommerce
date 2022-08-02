import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card >
      <CardActionArea style={{display: 'flex', padding: '10px'}}>
        <CardMedia
          component="img"
          height="250px"
          image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
          alt="green iguana"
          style={{width: '250px'}}
        />
        <CardContent style={{textAlign: 'left', display: 'grid', gap: '10px'}}>
          <Typography variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
          <Typography variant='h5'>$450</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
