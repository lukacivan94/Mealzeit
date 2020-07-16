import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';

import InteractiveList from './InteractiveList';

import Collapsible from './Collapsible';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      boxShadow: '0px 0px 8px 1px rgba(0,0,0,0.75)',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    content: {
      flex: '1 0 auto',
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    iconrow: {
        display: 'flex',
        flexDirection: 'row',
        width: '10%',
    },
    iconGroup: {
        display: 'flex',
        alignContent: 'flex-end',
        flexDirection: 'column-reverse',
        height: '100%',
        justifyContent: 'space-evenly',
    },
    element: {
        height: '100%',
        display: 'flex',
        alignSelf: 'flex-start',
        padding: theme.spacing(1),
    },
    elementTitle: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: '10px',
    },
    elementContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    elementContentValue: {
        display: 'flex',
        flexDirection: 'column',
    },
    icon1: {
        display: 'flex',
        alignSelf: 'flex-end',
        padding: 0,
    },
    icon2: {
        display: 'flex',
        alignSelf: 'flex-end',
        padding: 0,
        fill: 'red',
    },
    counter: {
        display: 'flex',
        alignSelf: 'flex-start',
        padding: 0,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: 'darkorange',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
  }),
);

interface Props {
    type: String;
    joined:Number;
    member: any;
    date: any;
  }


export default function MediaControlCard(props) {
    // type: cookroom, course, recipe
  const classes = useStyles();
  const theme = useTheme();
  const { type, joined, member, date } = props;
  console.log(member);
//   const [CourseDate, setCourseDate ] = React.useState(dates);

//   if(type === "course"){
//     props.data.map(
//         val => {
//             setCourseDate(val['dates']);
//         }
//     )
//   }

  return (
    <Card className={classes.root}>
        <div className={classes.info} >
            <div className={classes.details} >
                <div className={classes.content}>
                        <Typography className={classes.title} component="h6" variant="h6">
                            Burger Day!
                        </Typography>
                    {
                        (type === "cookroom")
                        ?
                        <Collapsible heading="Date">
                            <ul>
                                <li>2021/23/22</li>
                                <li>2021/23/22</li>
                                <li>2021/23/22</li>
                            </ul>
                        </Collapsible>
                        :
                        null
                    }
                    {
                        (type === "course")
                        ?
                        <>
                            <Collapsible heading="Date">
                                <ul>
                                    {
                                    date.map((value, index) => (<li key={index}> {value} </li>))
                                    }
                                </ul>
                            </Collapsible>
                            {
                                (member === undefined || member.length == 0)
                                 
                                ?
                                null
                                :
                                <Collapsible heading="Members">
                                    <ul>
                                        {
                                        member.map((value, index) => (<li key={index}> {value} </li>))
                                        }
                                    </ul>
                                </Collapsible>
                            }
                           
                        </>
                        
                        :
                        null
                    }
                    {
                        (type === "cookroom" || type === "course")
                        ?
                        <Collapsible heading="Members">
                            <ul>
                                <li>Harry Warren</li>
                                <li>Sally Bacardi</li>
                                <li>Billy Joe</li>
                            </ul>
                        </Collapsible>
                    
                    :
                        null
                    }
                    {
                        (type === "cookroom")
                        ?

                    <Collapsible heading="Requests">
                        <div className={classes.elementContent}>
                            <InteractiveList name ="Regina Tidemann"/>
                            <InteractiveList name ="Roger Stone"/>
                            <InteractiveList name ="Jonas Dark"/>

                        </div>
                    </Collapsible>
                    :
                        null
                    }
                    {
                        (type === "recipe")
                        ?
                        <Paper>
                            <div className={classes.element}>
                                <div className={classes.elementTitle}> Info:</div>
                                <div className={classes.elementContent}></div>
                            </div>
                        </Paper>
                        :
                        null
                    }
                    
                    

                </div>
            </div>
      </div>
        <div className={classes.iconrow} >
            <div className={classes.details} >
            {
                 (type === "recipe")
                        ?
                    null
                    :
                <div className={classes.element}>
                    1/5
                </div>
            }
            {
                joined
                ?
                
                    (type === "recipe")
                    ?
                    null
                    :
                    <div className={classes.iconGroup}>
                        <CancelIcon className={classes.icon2} />
                    </div>
                
                :
                <div className={classes.iconGroup}>
                    <DeleteIcon className={classes.icon2} />
                    <EditIcon className={classes.icon1}/>
                </div>
            }
            </div>
        </div>
    </Card>
  );
}