import ListItemMaterial, { ListItemProps } from '@material-ui/core/ListItem';
import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListChipField from './ListChipField';

export type ListItemFieldProps = {
  children?: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  removeIcon?: ReactNode;
  value?: unknown;
  index?: number;
  chipText?: String;
  removeText?: String;
};

function ListItem({
  children = <AutoField label={null} name="" />,
  dense = true,
  disableGutters,
  divider,
  index = 0,
  chipText,
}: ListItemFieldProps) {
  return (
    <div>
      {chipText && <ListChipField name="" label={`${chipText} ${index + 1}`} />}

      <ListItemMaterial
        dense={dense}
        disableGutters={disableGutters}
        divider={divider}
      >
        {children}
      </ListItemMaterial>
    </div>
  );
}

export default connectField(ListItem, { initialValue: false });
