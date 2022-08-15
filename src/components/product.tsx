import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';


const ActionAreaCard: FC<{ imgUrl: string, title: string, description: string, price: number }> = ({ imgUrl, title, description, price }) => {
  let history = useNavigate();
  return (
    <Card>
      <CardActionArea style={{ display: 'flex', padding: '10px', justifyContent: 'flex-start' }} onClick={() => {
        history(`/details`);

      }}>
        <CardMedia
          component="img"
          height="250px"
          image={imgUrl}
          alt="green iguana"
          style={{ width: '250px' }}
        />
        <CardContent style={{ textAlign: 'left', display: 'grid', gap: '10px' }}>
          <Typography variant="h5" component="div" style={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ textTransform: 'capitalize' }}>
            {description}
          </Typography>
          <Typography variant='h5'>${price}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;
