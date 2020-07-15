import React from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Table from '../Browse/Table';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import CancelIcon from '@material-ui/icons/Cancel';
import Avatars from '../Browse/Avatars';
import GroupAvatars from '../Browse/GroupAvatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent:'space-evenly',
      margin: '20px',
      fontFamily: 'Source Sans Pro, sans-serif',
      padding: '25px 10px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'space-between',
      borderRadius:'25px',
      boxShadow: '1px 9px 32px -2px rgba(0,0,0,0.75)',
      overflow: 'hidden',
      border:'2px solid grey',
      
    },
    title:{
      display:'flex',
      justifyContent:'center',
      borderRadius:'25px',
      width:'100%',
    },
    TabImage:{
        display:'flex',
        'font-size':'large',
        flexDirection:'row',
        margin: '5px 5px',
    },
   
    content: {
      //flex: '1 0 auto',
      display: 'flex',
      color: 'orange',
      alignItems:'center',
      justifyContent:'center',
      border:'2px solid grey',
      
      //borderRadius:'25px',
     
      
    },
    cover: {
      width:'200px',
      height: 'auto',
      margin: '5px 5px',
    },
    avatarIcons:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'space-between',

    },
    icons:{
      display:'flex', 
      alignSelf:'center',
      margin: '5px 40px',
      padding: '5px 30px',
    },
    invitedAvatar:{
      display:'flex',
      margin: '0px 50px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    acceptIcon: {
      height: 50,
      width: 50,
      color: 'green',
      marginRight: '20px',
    },
    
    media:{
      order:0,
      flexGrow:1,
    },
    rejectIcon: {
        height: 50,
        width: 50,
        color: 'red',
        marginRight: '-20px',
      },
  }),
);
interface Props {
    title: string;
    id: string;
    imageSource: string; 
    Date: string;
    Cuisine: String;
    EventType: String;
    Location : String;
    FoodType: String;
    MealType: String;
    Size: Number;
    invited:String;
    Setting: string;
    invitedText: string;
    inviteeText: string;
    name:string;
};

export default function BrowseCard(props:Props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>

        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5"  >
            {props.title}
          </Typography>
        </CardContent>
        
        <Divider variant="middle" />
        <div className={classes.TabImage}>
          <Table Date = {props.Date}  Cuisine = {props.Cuisine} EventType = {props.EventType} Location = {props.Location} FoodType = {props.FoodType} MealType = {props.MealType} Size = {props.Size} Setting = {props.Setting}/>
          <CardMedia
          className={classes.cover}
          image={props.imageSource}
          />
        </div>
        <div className= {classes.avatarIcons}>
            <div className = {classes.invitedAvatar}>
              <Avatars Invited ={props.invited} name={props.name} text = {props.invitedText}/>
            </div>
            <div className = {classes.icons}>
              <CheckCircleIcon className= {classes.acceptIcon} />
              <CancelIcon className= {classes.rejectIcon} />
            </div>
            
        </div>
        <div className={classes.controls}>
           
            <GroupAvatars inviteeText={props.inviteeText}/>
        </div>       

      </div>
    </Card>
  );
}