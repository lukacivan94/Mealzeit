import React from 'react';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  wrapper: {
    backgroundColor: theme.palette.background.paper,
  },
}));


interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}




const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid white',
  },
  indicator: {
    backgroundColor: 'darkOrange',
  },
})(Tabs);

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: '18px',
      marginRight: theme.spacing(6),
      fontFamily: 'Source Sans Pro, sans-serif',
      '&:hover': {
        color: 'darkOrange',
        opacity: 1,
      },
      '&$selected': {
        color: 'darkOrange',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'darkOrange',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Paper elevation={0}>{children}</Paper>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}



export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant tabs">
          <AntTab label={props.label1} {...a11yProps(0)}/>
          <AntTab label={props.label2} {...a11yProps(1)}/>
        </AntTabs>
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