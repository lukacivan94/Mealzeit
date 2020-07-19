import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/*
* Collapsible: Component inside card event, which is an accordian. It can be expanded to
* reveal more information.
*/

// Basic Styling specification of the all the components
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    details: {
        padding: 0,
        margin: 0,
        fontSize: '14px',
        border: '1px solid rgba(0, 0, 0, .125)',
    }
  }),
);

export default function Collapsible(props) {
  const classes = useStyles();

  return (
      <Accordion className={classes.details}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}> { props.heading } </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
            { props.children }
        </AccordionDetails>
      </Accordion>
  );
}