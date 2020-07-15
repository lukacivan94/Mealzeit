import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  root:{
    width: '500px',
  },
  paper:{
    width: '500px',
  },
  table: {
    width: '500px',  
  }
  
});


const PublicTable = (props) => {
  const classes = useStyles();

  return (
    <Paper className = {classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
        <TableBody>
            <TableRow>
              <TableCell align="center">{props.Date}</TableCell>
              <TableCell align="center">{props.Cuisine}</TableCell>
              <TableCell align="center">{props.EventType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{props.Location}</TableCell>
              <TableCell align="center">{props.FoodType}</TableCell>
              <TableCell align="center">{props.MealType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Size: {props.Size}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
export const CourseTable = (props) => {
  const classes = useStyles();

  return (
    <Paper className = {classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
        <TableBody>
            <TableRow>
              <TableCell align="center">{props.Date}</TableCell>
              <TableCell align="center">{props.EventType}</TableCell>
              <TableCell align="center">{props.Price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">{props.Location}</TableCell>
              <TableCell align="center">{props.IncludedInPremium}</TableCell>
              <TableCell align="center">{props.Rating}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Size:{props.Size}</TableCell>
              <TableCell align="center">{props.Setting}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default PublicTable;