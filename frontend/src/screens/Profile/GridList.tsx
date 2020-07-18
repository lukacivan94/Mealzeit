import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardCourse from './CardCourse';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);
interface Props {
  type: String;
  joined:Number;
  data: any;
}
const dates : String[] = [];

export default function GridList(props: Props) {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {
              (props.type === "course" && !props.joined)
              ?
              props.data.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardCourse type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.dates} 
                                      title={object.title} 
                                      numberOfMembers={object.number_of_members}
                            />
                      </Grid>
                  )})
              :
              null
        }
        {
              (props.type === "cookroom" && !props.joined)
              ?
              props.data.map((object, index) => {
                return(
                      <Grid item xs={4} key={index}>
                          <CardCourse type={props.type} 
                                      joined={props.joined} 
                                      member={object.members} 
                                      date={object.date_time} 
                                      title={object.title} 
                                      numberOfMembers={object.number_of_members} 
                                      request={object.request}/>
                      </Grid>
                  )})
              :
              null
        }
      </Grid>
    </div>
  );
}