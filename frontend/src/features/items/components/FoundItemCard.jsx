import React, { useState } from 'react';
import { BaseItemCard } from './BaseItemCard';
import ResolutionModal from './ResolutionModal';

export const FoundItemCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <BaseItemCard
        {...props}
        type="found"
        messageLabel="Finder Contact"
        contactName={props.OwnerName}
        contactPhone={props.phoneNumber}
        onResolve={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <ResolutionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type="found"
          {...props}
        />
      )}
    </>
  );
};
