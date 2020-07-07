import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import $ from "jquery";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
  },
  containerButton: {
    width: '35px',
    backgroundColor: '#eb862f',
    display: 'none',
  },
  container: {
    boxSizing: 'border-box',
    overflowX: 'hidden',
    overflowY: 'hidden',
    backgroundColor: '#ededed',
    boxShadow: '5px 5px 5px rgba(68, 68, 68, 0.6)',
  },
  inner: {
    boxSizing: 'border-box',
    height: '90px',
    minWidth: '1000px',
    scroll: 'hidden',
    overflowX: 'hidden',
    overflowY:'hidden',
    padding: '5px',
  },
  box: {
    width: '80px',
    height: '80px',
    marginRight: '10px',
    boxSizing: 'border-box',
    display: 'inline-block',
    border: '1px solid grey',
    ':hover': {

    }
  },
  buttonRight: {
    height: '100%',
    paddingLeft: '8px',
  },
  buttonLeft: {
    height: '100%',
  },
  overlay: {
    opacity: 0.5,
  }
}));


export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();

  function importAll(r) {
      return r.keys().map(r);
  };

  function handleLeft(e) {
    e.preventDefault();
    var pos = $('.related-container2').scrollLeft() + 100;
    $('.related-container2').scrollLeft(pos);
  };
  
  function handleRight(e) {
    e.preventDefault();
    var pos = $('.related-container2').scrollLeft() - 100;
    $('.related-container2').scrollLeft(pos);
  };

  function handleHover(e) {
    e.preventDefault();
    $('.container-button').css('display','inline-block');
  };

  function handleLeave(e) {
    e.preventDefault();
    $('.container-button').css('display','none');
  };

  const listOfImages = importAll(require.context('../../assets/images/profiles/', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className={classes.root} onMouseOver={handleHover} onMouseLeave={handleLeave}>
      <Paper className={classes.containerButton + ' ' + "container-button"}>
        <ArrowBackIosIcon className={classes.buttonRight + ' ' + "go-right"} onClick={handleRight} />
      </Paper>
      <Paper className={classes.container + ' ' + "related-container2"}>
        <div className={classes.inner + ' ' + "related-inner"}>
            {
              listOfImages.map(
                (image, index) =>   <Avatar className={classes.box + ' ' + "related-box"} key={index} src={image.default}/>
              )
            }
        </div>
      </Paper>
      <Paper className={classes.containerButton + ' ' + "container-button"}>
        <ArrowForwardIosIcon className={classes.buttonLeft + ' ' + "go-left"} onClick={handleLeft} />
      </Paper>
    </div>
  );
}