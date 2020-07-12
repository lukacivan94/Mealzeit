import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      className={classes.tabpanel}
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Paper elevation={0}>{children}</Paper>
          {/*<Typography>{children}</Typography>*/}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const tabStyle = {
  default_tab:{
      color: 'grey',
      fontSize: 20,
      backgroundColor: 'white',
      boxShadow: ' 0px 3px 28px -9px rgba(0,0,0,0.91)',
  },
  active_tab:{
      color: 'orange',
      fontSize: 20,
      backgroundColor: 'white',
      boxShadow: ' 0px 3px 28px -9px rgba(0,0,0,0.91)',
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 800,
    borderRadius: '25px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)',
  },
  appbar: {

    borderRadius: '25px',
  },
  tab: {
    //border: '1px solid red',
    width: '100%',
    height: '100%',
    borderRadius: '25px',
  },
  tabpanel: {
    borderRadius: '25px',
  },
  indicator: {
    backgroundColor: "orange",
    height: "10px",
    top: "45px"
  },
}));

export default function TabBar(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  //const [activeIndex, setActiveIndex] = React.useState(0);

  const getStyle =  (isActive) => {
    return isActive ? tabStyle.active_tab : tabStyle.default_tab
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <div className={classes.wrapper}>
        <AppBar className={classes.appbar} position="static" color="default">
            <Tabs
            TabIndicatorProps={{ className: classes.indicator }}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="primary"
            aria-label="scrollable force tabs example"
            >
            <Tab className={classes.tab} label="Cook Room" style={getStyle(value === 0) } {...a11yProps(0)} />
            <Tab className={classes.tab} label="Course" style={getStyle(value === 1) } {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            { props.left }
        </TabPanel>
        <TabPanel value={value} index={1}>
            { props.right }
        </TabPanel>
        </div>
    </div>
  );
}

