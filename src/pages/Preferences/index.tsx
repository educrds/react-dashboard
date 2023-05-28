import React from 'react';
import Wrapper from '../../components/Wrapper';
import { Add } from '@mui/icons-material';
import {
  Button,
  Card,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';

const Preferences = () => {
  const categories = useSelector((state: any) => state.categories.categories);

  return (
    <Wrapper>
      <h2>Preferências</h2>
      <Card elevation={false}>
        <Grid container justifyContent={'space-between'} padding={'3vh 1vw'} gap={'1.35rem'}>
          <Grid item>
            <h3>Categorias</h3>
          </Grid>
          <Grid>
            <Button variant='contained'>
              <Add />
            </Button>
          </Grid>
          <Grid container>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Cor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>
                        {category.type}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {category.category}
                      </TableCell>
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ backgroundColor: category.color }}
                      ></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </Wrapper>
  );
};

export default Preferences;
