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
  ReplayRounded,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ptBR } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { categories } from '../../charts/doughnutChartConfig';
import { NumericFormat } from 'react-number-format';
import { insertDocument, updateDocumentById } from '../../services/redux/transactions/selectors';
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
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const [saveButtonClicked, setSaveButtonClicked] = useState('');
  const [repeat, setRepeat] = useState({
    value: 1,
    checked: false,
  });

  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    }
  }, [transactionToEdit]);

  const handleValueChange = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      value: event.target.value,
    }));
  };

  const handleStatusCheck = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prevFormData => ({ ...prevFormData, status: event.target.checked }));

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

  // const handleDateChange = newDate =>
  //   setFormData(prevFormData => ({ ...prevFormData, date: newDate }));

  const handleRepeatCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setRepeat({ ...repeat, checked: isChecked });
  };

  const handleRepeatValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value <= 0) {
      return;
    }
    setRepeat({ ...repeat, value: value });
  };

  const handleButtonSaveClick = event => {
    const { name } = event.target;
    setSaveButtonClicked(name);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    const updatedFormData = { ...formData, type: transactionType };
    const repeatCount = repeat.value || 1; // Se o switch "repetir" não foi selecionado, repetir apenas uma vez
    const insertRepeatTransactions = []; // Array para armazenar as transações a serem inseridas
    const monthInterval = moment.duration(1, 'month'); // monthIntervalo de tempo entre cada repetição
    let lastDate = moment.unix(updatedFormData.date);

    // Arredondar o valor da transação para a casa decimal mais próxima
    const valuePerRepeatTransactions =
      Math.round((updatedFormData.value / repeatCount) * 100) / 100;

    // Gerar as transações a serem inseridas
    for (let i = 1; i <= repeatCount; i++) {
      // Obter a data da transação para cada repetição
      let date;
      if (i === 1) {
        date = lastDate;
      } else {
        date = lastDate.clone().add(monthInterval);
      }
      const timestamp = date.unix(); // Converter a data para Unix Timestamp
      const transaction = {
        ...updatedFormData,
        value: valuePerRepeatTransactions,
        date: timestamp,
      };
      insertRepeatTransactions.push(transaction);
      lastDate = date.clone(); // Atualizar a última data inserida
    }

    // Verifica nova transação ou edião da existente e insere no BD
    if (transactionToEdit) {
      dispatch(updateDocumentById(transactionToEdit.id, formData));
    } else {
      insertRepeatTransactions.forEach(transaction => dispatch(insertDocument(transaction)));
    }

    setFormData(initialFormData);

    if (saveButtonClicked === 'save') {
      return onClose();
    }
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
              control={
                <Switch color='primary' onChange={handleStatusCheck} checked={formData.status} />
              }
            />
          </ToggleContainer>
        </Grid>
        <Grid item md={12}>
          <DateInput formData={formData} setFormData={setFormData} />
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
        <Grid item md={12}>
          <ToggleContainer>
            {repeat.checked && (
              <InputBoxIcon>
                <ReplayRounded />
                <TextField
                  id='input-with-sx'
                  variant='standard'
                  type='number'
                  value={repeat.value}
                  onChange={handleRepeatValue}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>vezes</InputAdornment>,
                  }}
                />
              </InputBoxIcon>
            )}
            <FormControlLabel
              label='Repetir'
              labelPlacement='end'
              control={<Switch color='primary' onChange={handleRepeatCheck} />}
            />
          </ToggleContainer>
        </Grid>
        <Grid container justifyContent='flex-end' spacing={1}>
          {!transactionToEdit && (
            <Grid item>
              <Button
                variant='text'
                onClick={handleButtonSaveClick}
                name='saveAndAddAnother'
                type='submit'
                disableElevation
              >
                Salvar e adicionar outra
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button
              variant='contained'
              onClick={handleButtonSaveClick}
              name='save'
              type='submit'
              disableElevation
            >
              Salvar
            </Button>
          </Grid>
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
  date: Date;
}

const DateInput = ({ formData, setFormData }: DateInputProps) => {
  const [selectedChipIndex, setSelectedChipIndex] = useState<number>(-1);

  const formatDate = (date: moment.Moment) => date.unix();

  const setDateFromChipIndex = (index: number) => {
    const newDate = index === 0 ? moment() : moment().subtract(1, 'day');
    const formattedDate = formatDate(newDate);
    setSelectedChipIndex(index);
    setFormData(prevFormData => ({
      ...prevFormData,
      date: formattedDate,
    }));
    // onDateChange(formattedDate);
  };

  const handleDateChange = (newDate: moment.Moment) => {
    const formattedDate = formatDate(newDate);

    setFormData(prevFormData => ({
      ...prevFormData,
      date: formattedDate,
    }));

    setSelectedChipIndex(-1);
  };

  return (
    <TextField
      variant='standard'
      fullWidth
      value={formData.date ? moment.unix(formData.date).format('DD/MM/YYYY') : ''}
      onChange={formData.date ? handleDateChange : () => {}}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position='end'>
            {formData.date && (
              <IconButton
                onClick={() => {
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    date: '',
                  }));
                }}
              >
                <Backspace fontSize='small' />
              </IconButton>
            )}
          </InputAdornment>
        ),
        startAdornment: !formData.date && (
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
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
            >
              <DatePicker
                value={formData.date ? moment.unix(formData.date) : null}
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
