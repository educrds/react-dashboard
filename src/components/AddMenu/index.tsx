import React, { useState } from 'react';
import { MenuList, MenuItem, ListItemIcon } from '@mui/material';
import { TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { Divider } from '@mui/material';
import AddTransactionModal from '../AddTransactionModal';
import { PaperContainer, ItemText } from './styles';

const AddButtonMenu = () => {
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');

  const handleOpen = type => {
    console.log(type);
    setTransactionType(type);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <PaperContainer>
        <MenuList>
          <MenuLabel
            onClick={() => handleOpen('receita')}
            icon={<TrendingUpOutlined sx={{ color: '#22c58b' }} />}
            text='Receita'
          />
          <Divider />
          <MenuLabel
            onClick={() => handleOpen('despesa')}
            icon={<TrendingDownOutlined sx={{ color: '#eb3d3d' }} />}
            text='Despesa'
          />
        </MenuList>
      </PaperContainer>
      <AddTransactionModal onClose={handleClose} open={open} type={transactionType} />
    </>
  );
};

interface MenuLabelProps {
  onClick: () => {};
  icon: React.ReactNode;
  text: string;
}

const MenuLabel = ({ onClick, icon, text }: MenuLabelProps) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ItemText>{text}</ItemText>
    </MenuItem>
  );
};

export default AddButtonMenu;
