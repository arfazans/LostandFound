import React, { useState } from 'react';
import { BaseItemCard } from './BaseItemCard';
import ResolutionModal from './ResolutionModal';

export const LostItemCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BaseItemCard
        {...props}
        type="lost"
        messageLabel="Poster Contact"
        contactName={props.founderName}
        contactPhone={props.phoneNumber}
        onResolve={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <ResolutionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="lost"
          {...props}
        />
      )}
    </>
  );
};
