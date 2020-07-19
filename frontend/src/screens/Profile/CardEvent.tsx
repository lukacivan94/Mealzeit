import React , { useEffect, useState} from 'react';
import moment from 'moment';

import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import WarningIcon from '@material-ui/icons/Warning';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

import axios from '../../axios';
import CookroomSPV from './EditComponents/CookroomSPV';
import CoursesSPV from './EditComponents/CoursesSPV';
import RecipesSPV from './EditComponents/RecipesSPV';
import InteractiveList from './InteractiveList';
import Collapsible from './Collapsible';

/*
* CardEvent: Event is cookroom, courses or recipes, and the data from the grid is wrapped in the card
* to show inner components with data. Controls for add/delete request, delete/edit event is performed here.
* Dialogue is used to show all the editable components.
*/


// Basic Styling specification of the all the components
const theme = createMuiTheme({
    palette: {
      primary: orange,
    },
  });


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  
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
        paddingLeft: '15px',
    },
    elementTitle: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '16px',
        fontFamily: 'Source Sans Pro, sans-serif',
    },
    elementContent: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontSize: '15px',
        paddingLeft: '15px',
        fontFamily: 'Source Sans Pro, sans-serif',
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
      snackbar: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
      appBar: {
        position: 'relative',
        backgroundColor: 'darkorange',
        marginBottom: '10px',
      },
    toolbar: {
        minHeight: 80,
      },
  }),
);


// Interface specification for the exported default component
interface Props {
    type: String;       // type: cookrooms, courses, recipes
    joined:Number;
    member?: any;
    date?: any;
    title: any;
    request?: any;
    numberOfMembers?: Number;
    main_id?: any;
    performCancelDelete?: any; // function to delete or cancel an event

    food_type?: any;
    cuisine_type?: any;
    preparation_time?: any;
    reloadEvent?: any;  // function to reload an event after patch
}

// Interface specification for the declared constant
interface Provider {
    _id: string,
    full_name: string
  }


export default function MediaControlCard(props: Props) {   
  const classes = useStyles();
  const theme = useTheme();

  const obj : Array<Provider> = [];
  const [memberName, setMemberName] = useState(obj);
  const [requestName, setRequestName] = useState(obj);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

// When the component is mounted, axios calls is performed to get the information from backend
  useEffect(() => {
      if(props.member){
        props.member.map(
            val => {
                axios.get("/users/"+val).then(response=> {
                    setMemberName(memberName => [...memberName,{_id: val, full_name: response["data"]['user']['first_name'] + ' ' +response["data"]['user']['last_name']}]);
                })}
        );
      }
      if(props.request){
        
            props.request.map(
                val => {
                    axios.get("/users/"+val).then(response=> {
                        setRequestName(requestName => [...requestName,{_id: val, full_name: response["data"]['user']['first_name'] + ' ' +response["data"]['user']['last_name']}]);
                    })}
            );
      }

    },[]);

    // axios calls to patch events: adding or removing the request from a user to another user
    const handleAddRequestToMember = (mid, fullName) => {
        
        axios.patch(`/${props.type}/accreq/${props.main_id}/${mid}/`)
            .then(res => {
                setRequestName(requestName.filter(item => item._id !== mid));
                setMemberName(memberName=>[...memberName, {_id:mid, full_name: fullName}]);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };
    const handleRejectRequestToMember =(mid) => {
        axios.patch(`/${props.type}/rejectreq/${props.main_id}/${mid}/`)
            .then(res => {
                setRequestName(requestName.filter(item => item._id !== mid));
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };


    // Controlling opening and closing of modals and dialouges
    const handleCancelDelete = () => {
        setOpen(false);
        props.performCancelDelete(props.type, props.main_id);
    };
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleEditClickOpen = () => {
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
        props.reloadEvent(props.type);
    };
    const handleEditCancel = () => {
        setEditOpen(false);
    };


// based on the type specifications, the buttons or components are shown and actions are performed
  return (
    <Card className={classes.root}>
        <div className={classes.info} >
            <div className={classes.details} >
                <div className={classes.content}>

                        <Typography className={classes.title} component="h6" variant="h6">
                            { props.title }
                        </Typography>

                        
                    {
                        (props.type === "courses" || props.type === "cookrooms")
                        ?
                        <>
                            {
                                    (props.type === "courses")
                                    ?
                                    <Collapsible heading="Dates">
                                        <ul>
                                            {
                                            props.date.map((value, index) => (<li key={index}> {moment(value).format("YYYY-MM-DD HH:mm")} </li>))
                                            }
                                        </ul>
                                    </Collapsible>
                                    :
                                    null
                            }
                            {
                                    (props.type === "cookrooms")
                                    ?
                                    <Paper elevation={3}>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}> Date:</div>
                                            <div className={classes.elementContent}>{moment(props.date).format("YYYY-MM-DD HH:mm")}</div>
                                        </div>
                                    </Paper>
                                    :
                                    null    
                            }
                            {
                                (memberName === undefined || memberName.length === 0)
                                 
                                ?
                                null
                                :
                                <Collapsible heading="Members">
                                    <ul>
                                        {
                                        memberName.map((value, index) => (<li key={index}> {value.full_name} </li>))
                                        }
                                    </ul>
                                </Collapsible>
                            }

                           
                        </>
                        
                        :
                        null
                    }
                    {
                        (props.type === "cookrooms" && !props.joined)
                        ?
                            (requestName === undefined || requestName.length == 0)
                            ?
                            null
                            :
                                <Collapsible heading="Requests">
                                    <div className={classes.elementContent}>
                                        {
                                            requestName.map((value, index) => (<InteractiveList 
                                                                                    key={index} 
                                                                                    name={value.full_name} 
                                                                                    addToMember={handleAddRequestToMember}
                                                                                    rejectRequest={handleRejectRequestToMember}
                                                                                    id={value._id}/>))
                                        }
                                    </div>
                                </Collapsible>
                        :
                            null
                    }
                    {
                        (props.type === "recipes")
                        ?
                        <Paper elevation={3}>
                            {
                                    props.food_type
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Food Type:</div>
                                            <div className={classes.elementContent}>{props.food_type}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    
                                    :
                                    null
                            }
                            {
                                    props.cuisine_type
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Cuisine Type:</div>
                                            <div className={classes.elementContent}>{props.cuisine_type}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    :
                                    null
                            }
                            {
                                    props.preparation_time
                                    ?
                                    <>
                                        <div className={classes.element}>
                                            <div className={classes.elementTitle}>Preparation Time:</div>
                                            <div className={classes.elementContent}>{props.preparation_time}</div>
                                        </div>
                                        <Divider variant="middle" />
                                    </>
                                    :
                                    null
                            }
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
                 (props.type === "recipes")
                        ?
                    null
                    :
                <div className={classes.element}>
                    {memberName.length}/{props.numberOfMembers}
                </div>
            }
            {
                props.joined
                ?
                
                    (props.type === "recipes")
                    ?
                    null
                    :
                    <div className={classes.iconGroup}>
                        <Tooltip title="leave" placement="bottom">
                            <IconButton edge="end" aria-label="cancel"onClick={handleClickOpen}>
                                <CancelIcon className={classes.icon2} />
                            </IconButton>
                        </Tooltip>
                        <MuiThemeProvider theme={theme}>
                        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClickClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                            <DialogTitle id="alert-dialog-slide-title"><WarningIcon  style={{ fill: 'red' }}/>{"Do you want to leave the event?"}</DialogTitle>
                            <DialogActions>
                            <Button style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleClickClose} color="primary">Disagree</Button>
                            <Button style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleCancelDelete} color="primary">Agree</Button>
                            </DialogActions>
                        </Dialog>
                    </MuiThemeProvider>                       
                    </div>
                
                :
                <div className={classes.iconGroup}>
                    
                    <Tooltip title="delete" placement="bottom">
                        <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon className={classes.icon2} />
                        </IconButton>
                    </Tooltip>
                    <MuiThemeProvider theme={theme}>
                        <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClickClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                            <DialogTitle id="alert-dialog-slide-title"><WarningIcon  style={{ fill: 'red' }}/>{"Do you want to delete the event?"}</DialogTitle>
                            <DialogActions>
                            <Button  style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleClickClose} color="primary">Disagree</Button>
                            <Button  style={{ backgroundColor: 'darkorange', color: 'white' }} onClick={handleCancelDelete} color="primary">Agree</Button>
                            </DialogActions>
                        </Dialog>
                    </MuiThemeProvider>
                    <Tooltip title="edit" placement="bottom">
                        <IconButton edge="end" aria-label="edit" onClick={handleEditClickOpen}>
                            <EditIcon className={classes.icon1}/>
                        </IconButton>
                    </Tooltip>
                    <Dialog fullScreen open={editOpen} onClose={handleEditClose} TransitionComponent={Transition}>
                        <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton edge="start" color="inherit" onClick={handleEditCancel} aria-label="close">
                            <CloseIcon />
                            </IconButton>
                        </Toolbar>
                        </AppBar>
                        {
                            (props.type === 'cookrooms')
                            ?
                            <CookroomSPV id ={props.main_id} handleDialogClose={handleEditClose}/>
                            :
                            null
                        }
                        {
                            (props.type === 'courses')
                            ?
                            <CoursesSPV id ={props.main_id} handleDialogClose={handleEditClose}/>
                            :
                            null
                        }
                        {
                            (props.type === 'recipes')
                            ?
                            <RecipesSPV id ={props.main_id} handleDialogClose={handleEditClose}/>
                            :
                            null
                        }
                    </Dialog>
                    
                </div>
            }
            </div>
        </div>
    </Card>
  );
}