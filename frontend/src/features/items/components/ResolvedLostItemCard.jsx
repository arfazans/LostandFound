import React from 'react';
import ResolvedItemCard from './ResolvedItemCard';

const ResolvedLostItemCard = (props) => {
  return (
    <ResolvedItemCard
      {...props}
      type="lost"
      contactName={props.resolvingUsername}
      contactPhone={props.resolvingEmail}
    />
  );
};

export default ResolvedLostItemCard;
