import React, { useState } from 'react';
import { MenuItem, ListItemIcon } from '@mui/material';
import { TrendingDownOutlined, TrendingUpOutlined, AddOutlined } from '@mui/icons-material';
import AddTransactionModal from '../AddTransactionModal';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';

const AddButtonMenu = ({ collapsed }) => {
  const [openModal, setOpenModal] = useState(false);
  const [transactionType, setTransactionType] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = event => {
    const transactionType = event.currentTarget.getAttribute('data-type');
    if (transactionType) {
      setTransactionType(transactionType);
      setOpenModal(true);
    }
    setAnchorEl(null);
  };

  const handleModalClose = () => setOpenModal(false);

  return (
    <>
        <div
          className='nav__button__container add__button'
          aria-controls={isOpen ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={isOpen ? 'true' : undefined}
          onClick={handleClick}
          id='basic-button'
        >
          <div>
            <AddOutlined />
            {!collapsed ? <span>Novo</span> : null}
          </div>
        </div>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose} data-type='revenues' id='revenue'>
            <ListItemIcon>
              <TrendingUpOutlined sx={{ color: '#22c58b' }} />
            </ListItemIcon>
            <ListItemText>Receita</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose} data-type='expenses' id='expense'>
            <ListItemIcon>
              <TrendingDownOutlined sx={{ color: '#eb3d3d' }} />
            </ListItemIcon>
            <ListItemText>Despesa</ListItemText>
          </MenuItem>
        </Menu>
      <AddTransactionModal onClose={handleModalClose} open={openModal} type={transactionType} />
    </>
  );
};

export default AddButtonMenu;
