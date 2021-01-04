import Button, { ButtonProps } from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { ReactNode } from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = FieldProps<
  unknown,
  ButtonProps,
  { icon?: ReactNode; text?: String }
>;

function ListDel({
  disabled,
  icon = <DeleteIcon />,
  name,
  text,
  ...props
}: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.minCount! >= parent.value!.length);

  return (
    <Button
      variant="contained"
      size="small"
      color="secondary"
      startIcon={icon}
      {...filterDOMProps(props)}
      disabled={!limitNotReached}
      onClick={() => {
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        parent.onChange(value);
      }}
    >
      {text}
    </Button>
  );
}

export default connectField(ListDel, { initialValue: false, kind: 'leaf' });
