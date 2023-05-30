import React from 'react';
import AllTransactions from '../../components/AllTransactions';
import Wrapper from '../../components/Wrapper';

const Transactions = () => {
  return (
    <Wrapper>
      <AllTransactions type='all' />
    </Wrapper>
  );
};

export default Transactions;
