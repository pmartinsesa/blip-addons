import * as React from 'react';

export type EditBlockOptionProps = {
  id: string;
  onClick: (id: string) => void;
};

export const EditBlockOption = ({
  id,
  onClick,
}: EditBlockOptionProps): JSX.Element => {
  return (
    <div className="edit-block-option">
      <span onClick={() => onClick(id)}>Editar</span>
    </div>
  );
};
