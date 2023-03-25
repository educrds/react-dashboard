import React, { useState, useEffect } from 'react';
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
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { categories } from '../../charts/doughnutChartConfig';
import { NumericFormat } from 'react-number-format';
import { insertDocument, updateDocumentById } from '../../services/transactions';
import { useDispatch } from 'react-redux';
import { MainGrid, InputBoxIcon, ButtonBox, ToggleContainer } from './styles';

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

interface AddTransactionFormProps {
  transactionType: string;
  transactionToEdit?: Transaction;
  onClose: boolean;
}

const AddTransactionForm = ({
  transactionType,
  transactionToEdit,
  onClose,
}: AddTransactionFormProps) => {
  const initialFormData = {
    status: false,
    category: '',
    description: '',
    value: '',
    date: '',
    type: '',
  };
  const [uid] = useState('iVmUSglTCiR0GvPdWNzMzstEb3R2');
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

  const handleValueChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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

  const handleDateChange = newDate => {
    console.log(newDate);
    setFormData(prevFormData => ({ ...prevFormData, date: newDate }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const updatedFormData = { ...formData, type: transactionType };
    transactionToEdit
      ? dispatch(updateDocumentById(uid, transactionToEdit.id, formData))
      : dispatch(insertDocument(uid, updatedFormData));
    setFormData(initialFormData);
    onClose();
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
          <ToggleContainer>
            <FormControlLabel
              label={transactionType === 'revenues' ? 'Recebida' : 'Paga'}
              labelPlacement='end'
              control={<Switch color='primary' />}
              onChange={handleStatusCheck}
            />
          </ToggleContainer>
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
            transactionType={transactionType === 'revenues' ? 'revenue' : 'expense'}
          />
        </Grid>
        <Grid item>
          <ButtonBox>
            <Button variant='contained' type='submit' disableElevation>
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

interface Category {
  category: string;
  type: string;
}

interface CategoryInputProps {
  categories: Category[];
  category: string;
  handleCategoryChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  transactionType: string;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  categories,
  category,
  handleCategoryChange,
  transactionType,
}) => {
  const handleCategoryDelete = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    handleCategoryChange({ target: { value: null } });
  };

  const renderCategoryList = () => {
    const categoryFilterByType = categories.filter(({ type }) => type === transactionType);
    return categoryFilterByType.map(({ category }, i) => (
      <MenuItem key={i} value={category}>
        {category}
      </MenuItem>
    ));
  };

  const handleCategorySelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    handleCategoryChange(event);
  };

  const renderCategory = () => <Chip label={category} onDelete={handleCategoryDelete} />;

  return (
    <TextField
      id='my-textfield'
      variant='standard'
      fullWidth
      select
      value={category}
      onChange={handleCategorySelection}
      SelectProps={{
        renderValue: renderCategory,
      }}
      InputProps={{
        startAdornment: <LabelRounded />,
      }}
    >
      {renderCategoryList()}
    </TextField>
  );
};

interface DateInputProps {
  onDateChange: (date: Date | null, value?: string | null) => void;
}

const DateInput = ({ onDateChange }: DateInputProps) => {
  const [date, setDate] = useState<number>();
  const [selectedChipIndex, setSelectedChipIndex] = useState<number>(-1);

  const formatDate = (date: moment.Moment) => date.unix();

  const setDateFromChipIndex = (index: number) => {
    const today = moment();
    const yesterday = moment().subtract(1, 'day');
    const newDate = index === 0 ? today : yesterday;
    const formattedDate = formatDate(newDate);
    setSelectedChipIndex(index);
    setDate(formattedDate);
    onDateChange(formattedDate);
  };

  const handleDateChange = (newDate: moment.Moment) => {
    const formattedDate = formatDate(newDate);
    setDate(formattedDate);
    setSelectedChipIndex(-1);
    onDateChange(formattedDate);
  };

  return (
    <TextField
      variant='standard'
      fullWidth
      value={date ? moment.unix(date).format('DD/MM/YYYY') : ''}
      onChange={date ? handleDateChange : () => {}}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='end'>
            {date && (
              <IconButton onClick={() => setDate(undefined)}>
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
              onClick={() => setDateFromChipIndex(0)}
              color={selectedChipIndex === 0 ? 'primary' : 'default'}
            />
            <Chip
              label='Ontem'
              clickable
              onClick={() => setDateFromChipIndex(1)}
              color={selectedChipIndex === 1 ? 'primary' : 'default'}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date ? moment.unix(date) : null}
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
