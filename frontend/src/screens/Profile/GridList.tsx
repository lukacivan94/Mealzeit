import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardCourse from './CardCourse';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
  const { type, joined, data } = props;
  console.log(data);
  //const [CourseDate, setCourseDate ] = React.useState(dates);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {
              (type === "course" && !joined)
              ?
              data.map((object, index) => {
                console.log(object);

                return(
                      <Grid item xs={4} key={index}>
                          <CardCourse type={type} joined={joined} member={object.members} date={object.dates}/>
                      </Grid>
                  )})
              :
              null
              // <Grid item xs={4}>
              //     <CardCourse type={type} joined={joined} />
              // </Grid>
        }
      </Grid>
    </div>
  );
}