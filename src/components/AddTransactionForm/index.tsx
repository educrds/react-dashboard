import React, { useState } from 'react';
import {
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  FormControlLabel,
  TextField,
  Modal,
  InputAdornment,
  Box,
  Chip,
  Button,
  Grid,
  Container,
  Switch,
  Autocomplete,
  Paper,
} from '@mui/material';
import {
  CloseRounded,
  AccountBalanceWalletRounded,
  DescriptionRounded,
  LabelRounded,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface AddTransactionFormProps {
  open: boolean;
  onClose: () => {};
}

const categories = [
  { id: 1, name: 'Categoria 1' },
  { id: 2, name: 'Categoria 2' },
  { id: 3, name: 'Categoria 3' },
  { id: 4, name: 'Categoria 4' },
  { id: 5, name: 'Categoria 5' },
];

type CustomInputProps = TextFieldProps & {
  ownerState?: any;
  label?: string;
};

const CustomInput = function CustomInput(props: CustomInputProps) {
  const { inputProps, InputProps, ownerState, inputRef, error, label, ...other } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} ref={InputProps?.ref}>
      {InputProps?.endAdornment}
    </Box>
  );
};

const AddTransactionForm = ({ open, onClose }: AddTransactionFormProps) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedChipIndex, setSelectedChipIndex] = useState(0);
  const [date, setDate] = useState(null);
  // const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOptionChange = (event, value) => setSelectedOption(value);

  const handleChipClick = index => setSelectedChipIndex(index);

  return (
    <Modal
      open={open}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        component='main'
        maxWidth='sm'
        sx={{ backgroundColor: '#fff', borderRadius: '.5rem' }}
      >
        <AppBar
          position='static'
          sx={{
            borderRadius: '8px 8px 0 0',
            color: '#666',
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderBottom: '1px solid #bfbfbf90',
          }}
        >
          <Toolbar>
            <Typography variant='h5' component='div' sx={{ flexGrow: 1, color: '#666' }}>
              Nova receita
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
              <CloseRounded />
            </IconButton>
          </Toolbar>
        </AppBar>
        <form onSubmit={() => {}}>
          <Grid container rowGap={3} sx={{ my: 3, display: 'flex', flexDirection: 'column' }}>
            <Grid item md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccountBalanceWalletRounded sx={{ color: 'action.active' }} />
                <TextField
                  id='input-with-sx'
                  variant='standard'
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  label='Paga'
                  labelPlacement='end'
                  control={<Switch color='primary' />}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='standard'
                fullWidth
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <Box sx={{ display: 'flex', gap: 0.5, py: 1 }}>
                      <Chip
                        label='Hoje'
                        clickable
                        onClick={() => handleChipClick(0)}
                        color={selectedChipIndex === 0 ? 'primary' : 'default'}
                      />
                      <Chip
                        label='Ontem'
                        clickable
                        onClick={() => handleChipClick(1)}
                        color={selectedChipIndex === 1 ? 'primary' : 'default'}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={date}
                          slots={{
                            textField: CustomInput,
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  ),
                }}
              />
            </Grid>
            <Grid item md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DescriptionRounded sx={{ color: 'action.active' }} />
                <TextField
                  id='input-with-sx'
                  variant='standard'
                  placeholder='Descrição'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item md={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LabelRounded sx={{ color: 'action.active' }} />
                <Autocomplete
                  fullWidth
                  freeSolo={false}
                  id='tags-standard'
                  options={categories}
                  value={selectedOption}
                  onChange={handleOptionChange}
                  getOptionLabel={option => option.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='standard'
                      label='Categoria'
                      placeholder='Selecione uma categoria'
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end' }}>
                <Button variant='contained' onClick={() => {}} sx={{ mt: 1 }}>
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Modal>
  );
};

export default AddTransactionForm;
