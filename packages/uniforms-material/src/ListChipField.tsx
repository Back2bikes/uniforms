import Chip, { ChipProps } from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import React from 'react';
import { FieldProps, connectField, joinName, useField } from 'uniforms';

export type ListChipFieldProps = FieldProps<
  unknown,
  ChipProps,
  { label?: String }
>;

function ListChip({ label, name }: ListChipFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const handleDelete = () => {
    const value = parent.value!.slice();
    value.splice(nameIndex, 1);
    parent.onChange(value);
  };
  return (
    <Chip
      icon={<FaceIcon />}
      label={label}
      color="primary"
      onDelete={handleDelete}
      style={{ padding: '8px' }}
    />
  );
}

export default connectField(ListChip, { initialValue: false, kind: 'leaf' });
