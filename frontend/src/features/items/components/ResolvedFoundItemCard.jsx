import React from 'react';
import ResolvedItemCard from './ResolvedItemCard';

const ResolvedFoundItemCard = (props) => {
  return (
    <ResolvedItemCard
      {...props}
      type="found"
      contactName={props.resolvingUsername}
      contactPhone={props.resolvingEmail}
    />
  );
};

export default ResolvedFoundItemCard;
