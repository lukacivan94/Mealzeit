import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function DatesList({ dates, id }) {
  const classes = useStyles();

  const handleDelete = (chipToDelete) => () => {
    id(chipToDelete.key);
  };
  

  return (
    <Paper elevation={0} component="ul" className={classes.root}>
      {dates.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}