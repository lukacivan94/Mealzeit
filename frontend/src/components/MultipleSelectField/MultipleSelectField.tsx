import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import { Field } from 'redux-form';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            maxWidth: 200
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap'
        },
        chip: {
            margin: 2
        },
        noLabel: {
            marginTop: theme.spacing(3)
        }
    })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const getStyles = (name: string, personName: string[], theme: Theme) => {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    };
};

const renderMultiple = ({ input, label, meta: { touched, error }, children, value, handleChange, ...custom }) => (
    <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
        error={touched && error}
        {...input}
        {...custom}
    >
        {children}
    </Select>
);

export const MultipleSelectField = ({ name, inputLabel, items }) => {
    const [valueArray, setArrayValue] = React.useState<string[]>([]);
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setArrayValue(event.target.value as string[]);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{inputLabel}</InputLabel>
            <Field
                name={name}
                component={renderMultiple}
                fullWidth
                multiple
                renderValue={(selected) => (selected as string[]).join(', ')}
                handleChange={handleChange}
                value={valueArray}
            >
                {items.map((item) => (
                    <MenuItem key={item} value={item}>
                        <ListItemText primary={item} />
                    </MenuItem>
                ))}
            </Field>
        </FormControl>
    );
    // }
};