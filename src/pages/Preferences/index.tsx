import React from 'react';
import Wrapper from '../../components/Wrapper';
import { Add } from '@mui/icons-material';
import {
  Button,
  Card,
  Divider,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Preferences = () => {
  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align='right'>Calories</TableCell>
                    <TableCell align='right'>Fat(g)</TableCell>
                    <TableCell align='right'>Carbs(g)</TableCell>
                    <TableCell align='right'>Protein(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.calories}</TableCell>
                      <TableCell align='right'>{row.fat}</TableCell>
                      <TableCell align='right'>{row.carbs}</TableCell>
                      <TableCell align='right'>{row.protein}</TableCell>
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
