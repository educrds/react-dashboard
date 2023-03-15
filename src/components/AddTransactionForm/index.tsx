import React, { useState } from 'react';
import {
  FormControlLabel,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Grid,
  Switch,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import {
  AccountBalanceWalletRounded,
  DescriptionRounded,
  LabelRounded,
  Backspace,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { categories } from '../../charts/doughnutChartConfig';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { MainGrid, InputBoxIcon, ButtonBox } from './styles';
import { NumericFormat } from 'react-number-format';

const CustomInput = function CustomInput(props) {
  const { InputProps } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }} ref={InputProps?.ref}>
      {InputProps?.endAdornment}
    </Box>
  );
};

function NumericFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      inputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      decimalSeparator=','
      thousandSeparator='.'
      decimalScale={2}
      fixedDecimalScale
    />
  );
}

const AddTransactionForm = () => {
  const [formData, setFormData] = useState({
    status: false,
    category: '',
    description: '',
    value: '',
    date: '',
  });

  const handleValueChange = event => {
    console.log(event.target.value);
    setFormData(prevFormData => ({
      ...prevFormData,
      value: event.target.value,
    }));
  };

  const handleStatusCheck = () =>
    setFormData(prevFormData => ({ ...prevFormData, status: !prevFormData.status }));

  const handleCategoryChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    setFormData(prevFormData => ({
      ...prevFormData,
      category: event.target.value,
    }));

  const handleDescriptionChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    setFormData(prevFormData => ({
      ...prevFormData,
      description: event.target.value,
    }));

  const handleDateChange = newDate =>
    setFormData(prevFormData => ({ ...prevFormData, date: newDate }));

  // 1. Formatar data como timestamp para enviar para BD
  // 2. Formatar para ser enviado apenas número no field Valor

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    const sendData = async () => {
      try {
        const docRef = await addDoc(collection(db, 'revenues'), formData);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    };

    sendData();
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainGrid container>
        <Grid item md={12}>
          <InputBoxIcon>
            <AccountBalanceWalletRounded />
            <TextField
              value={formData.value}
              onChange={handleValueChange}
              variant='standard'
              fullWidth
              name='formattedValue'
              InputProps={{
                inputComponent: NumericFormatCustom,
                startAdornment: <InputAdornment position='start'>R$ </InputAdornment>,
              }}
            />
          </InputBoxIcon>
          <Box>
            <FormControlLabel
              label='Recebida'
              labelPlacement='end'
              control={<Switch color='primary' />}
              onChange={handleStatusCheck}
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <DateInput onDateChange={handleDateChange} />
        </Grid>
        <Grid item md={12}>
          <InputWithIcon
            icon={<DescriptionRounded />}
            onChange={handleDescriptionChange}
            placeholder='Descrição'
            value={formData.description}
          />
        </Grid>
        <Grid item md={12}>
          <CategoryInput
            categories={categories}
            category={formData.category}
            handleCategoryChange={handleCategoryChange}
          />
        </Grid>
        <Grid item>
          <ButtonBox>
            <Button variant='contained' type='submit'>
              Salvar
            </Button>
          </ButtonBox>
        </Grid>
      </MainGrid>
    </form>
  );
};

interface InputWithIconProps {
  icon: React.ReactNode;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  adornment: boolean;
}

const InputWithIcon = ({ icon, value, placeholder, onChange, adornment }: InputWithIconProps) => {
  return (
    <InputBoxIcon>
      {icon}
      <TextField
        id='input-with-sx'
        variant='standard'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fullWidth
        InputProps={
          adornment && { startAdornment: <InputAdornment position='start'>R$</InputAdornment> }
        }
      />
    </InputBoxIcon>
  );
};

interface CategoryInputProps {
  categories: [];
  category: string;
  handleCategoryChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CategoryInput = ({ categories, category, handleCategoryChange }: CategoryInputProps) => {
  const handleCategoryDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    handleCategoryChange({ target: { value: null } });
  };
  const renderCategory = category => <Chip label={category} onDelete={handleCategoryDelete} />;

  return (
    <InputBoxIcon>
      <LabelRounded />
      <TextField
        id='my-textfield'
        label='Categoria'
        variant='standard'
        fullWidth
        select
        value={category}
        onChange={handleCategoryChange}
        SelectProps={{
          renderValue: () => renderCategory(category),
        }}
      >
        {categories
          .filter(({ type }) => type === 'receita')
          .map(({ category }, i) => (
            <MenuItem key={i} value={category}>
              {category}
            </MenuItem>
          ))}
      </TextField>
    </InputBoxIcon>
  );
};

interface DateInputProps {
  onDateChange: (date: Date | null, value?: string | null) => void;
}

const DateInput = ({ onDateChange }: DateInputProps) => {
  const [date, setDate] = useState<string>('');
  const [selectedChipIndex, setSelectedChipIndex] = useState<number>(-1);

  const formatDate = (date: number) => dayjs(date).format('DD/MM/YYYY');

  const selectDate = (index: number) => {
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');

    return index === 0 ? formatDate(today) : formatDate(yesterday);
  };

  const handleChipClick = (chipIndex: number) => {
    setSelectedChipIndex(chipIndex);
    setDate(selectDate(chipIndex));
  };

  const handleDateChange = newDate => {
    setDate(formatDate(newDate));
    setSelectedChipIndex(-1);
    onDateChange(newDate);
  };

  return (
    <TextField
      variant='standard'
      fullWidth
      value={date}
      onChange={date ? handleDateChange : () => {}}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='end'>
            {date && (
              <IconButton onClick={() => setDate('')}>
                <Backspace fontSize='small' />
              </IconButton>
            )}
          </InputAdornment>
        ),
        startAdornment: !date && (
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
                onChange={handleDateChange}
                slots={{
                  textField: CustomInput,
                }}
              />
            </LocalizationProvider>
          </Box>
        ),
      }}
    />
  );
};

export default AddTransactionForm;
