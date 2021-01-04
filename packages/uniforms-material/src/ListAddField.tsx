import Button, { ButtonProps } from '@material-ui/core/Button';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import cloneDeep from 'lodash/cloneDeep';
import React, { ReactNode } from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListAddFieldProps = FieldProps<
  unknown,
  ButtonProps,
  {
    fullWidth?: FormControlProps['fullWidth'];
    icon?: ReactNode;
    initialCount?: number;
    margin?: FormControlProps['margin'];
    variant?: FormControlProps['variant'];
    text?: String;
  }
>;

function ListAdd({
  disabled,
  fullWidth = false,
  icon = '+',
  margin = 'dense',
  name,
  value,
  variant,
  text,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  const limitNotReached =
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <FormControl fullWidth={fullWidth} margin={margin} variant={variant}>
      <Button
        variant="contained"
        color="primary"
        startIcon={icon}
        {...filterDOMProps(props)}
        disabled={!limitNotReached}
        onClick={() => {
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }}
      >
        {text}
      </Button>
    </FormControl>
  );
}

export default connectField(ListAdd, { initialValue: false, kind: 'leaf' });
