import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import { Separator } from "pages/ProductsList/Separator";
import Counter from 'components/counter';
import { Navbar } from 'components/navbar';


export function ProductDetail() {

  return (
    <>
      <Navbar />
      <div style={{ margin: 'auto', maxWidth: '970px' }}>
        <Button variant="contained" size="small" style={{ marginBottom: '20px' }}>
          Volver a lista de productos
        </Button>
        <br />
        <br />
        <div style={{ display: 'flex', padding: '10px' }}>
          <div>
            <CardMedia
              component="img"
              height="250px"
              image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
              alt="green iguana"
              style={{ width: '450px', height: '450px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <CardMedia
                component="img"
                height="250px"
                image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
                alt="green iguana"
                style={{ width: '100px', height: '100px' }}
              />
              <CardMedia
                component="img"
                height="250px"
                image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
                alt="green iguana"
                style={{ width: '100px', height: '100px' }}
              />
              <CardMedia
                component="img"
                height="250px"
                image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
                alt="green iguana"
                style={{ width: '100px', height: '100px' }}
              />
              <CardMedia
                component="img"
                height="250px"
                image="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMxbasiw5cWT9eJgi5j_P3lfnuDjhK-wFMy7UTrG61DSx-fDlIVkucLf--9dGPKDwxNHsOTW5fALVrv7uXEYJIOR4pxOyATLrmP5pKWj1VthcHGTSz8Lq-&usqp=CAE"
                alt="green iguana"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          </div>
          <CardContent style={{ textAlign: 'left', display: 'flex', gap: '20px', flexDirection: 'column', paddingLeft: '40px' }}>
            <Typography variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
            <Typography variant='h5'>$450</Typography>
            <Typography style={{ fontWeight: 'bold' }}>Disponibilidad:
              <Typography component={'span'}>Con stock</Typography>
            </Typography>
            <Separator />
            <Counter />
            <Button variant="contained" size="small" style={{ marginBottom: '20px', width: 'max-content' }}>
              Agregar al carrito
            </Button>
          </CardContent>

        </div>
      </div>
    </>
  )
}