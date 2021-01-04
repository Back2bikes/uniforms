import ListMaterial, { ListProps } from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    addIcon?: ReactNode;
    removeIcon?: ReactNode;
    initialCount?: number;
    itemProps?: {};
    chipText?: String;
    addText?: String;
    removeText?: String;
  }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  name,
  chipText,
  addText,
  removeText,
  removeIcon,
  value,
  ...props
}: ListFieldProps) {
  return (
    <>
      <ListMaterial
        dense
        subheader={
          label ? (
            <ListSubheader disableSticky>{label}</ListSubheader>
          ) : undefined
        }
        {...filterDOMProps(props)}
      >
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  index: itemIndex,
                  chipText,
                  removeText,
                  removeIcon,
                  ...itemProps,
                })
              : child,
          ),
        )}
      </ListMaterial>
      <ListAddField
        initialCount={initialCount}
        name="$"
        text={addText}
        icon={addIcon}
      />
      <br />
    </>
  );
}

export default connectField(List);
