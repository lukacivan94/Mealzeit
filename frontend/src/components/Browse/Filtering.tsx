import React,{ useState , useEffect}  from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';


import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EventType = [
  'Get Together',
  'Volunteering'
];
const Setting = [
  'Indoor',
  'Outdoor',
];
const MealType =[
  'Breakfast',
  'Lunch',
  'Brunch',
  'Dinner',
];
const CuisineType =[
  'Asian',
  'European',
  'African',
  'Latin'
]; 


function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix=""
    />
  );
}

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
interface Props{
  selectedEvent:string,
  setSelectedEvent(event:any): void,
  selectedDate:Date,
  setSelectedDate(event:any):void,
  setSelectedCuisine(event:any):void,
  selectedCuisine:string,
  setSelectedSetting(event:any):void,
  selectedSetting:string,
  setSelectedMeals(event:any):void,
  selectedMeals:string,
  setSelectedFoodType(event:any):void,
  selectedFoodType:string,
  setTypedNumber(event:any):void,
  typedNumber:Number
  
}
interface State {
  numberformat: string;
}
export default function MultipleSelect(props:Props) {
  const classes = useStyles();
  
  
  useEffect(() => console.log(props.selectedEvent), [props.selectedEvent]);


  return (
    
    <div>
      <FormControl className={classes.formControl} onChange={props.setSelectedEvent}>
        <InputLabel htmlFor="native-select">Event Type</InputLabel>
        <Select native defaultValue="" id="EventType" value={props.selectedEvent}>
          <option aria-label="None" value="" />
            <option value={"Volunteering"}>Volunteering</option>
            <option value={"Get Together"}>Get Together</option>
            <option value={"Course"}>Course</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={props.setSelectedSetting}>
        <InputLabel htmlFor="native-select">Setting</InputLabel>
        <Select native defaultValue="" id="Setting" value={props.selectedSetting}>
          <option aria-label="None" value="" />
            <option value={1}>Indoor</option>
            <option value={2}>Outdoor</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={props.setSelectedMeals}>
        <InputLabel htmlFor="native-select">Meal Type</InputLabel>
        <Select native defaultValue="" id="Mealtype" value={props.selectedMeals}>
            <option aria-label="None" value="" />
            <option value={1}>Breakfast</option>
            <option value={2}>Brunch</option>
            <option value={3}>Lunch</option>
            <option value={4}>Dinner</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={props.setSelectedCuisine}>
        <InputLabel htmlFor="native-select">Cuisine</InputLabel>
        <Select native defaultValue="" id="Cuisine" value={props.selectedCuisine}>
          <option aria-label="None" value="" />
            <option value={1}>European</option>
            <option value={2}>Asian</option>
            <option value={3}>African</option>
            <option value={4}>North American</option>
            <option value={5}>Australian</option>
            <option value={6}>South American</option>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={props.setSelectedFoodType}>
        <InputLabel htmlFor="native-select">Food type</InputLabel>
        <Select native defaultValue="" id="FoodType" value={props.selectedFoodType}>
          <option aria-label="None" value="" />
            <option value={1}>Vegeterian</option>
            <option value={2}>Vegan</option>
            <option value={3}>Meat</option>
            <option value={4}>Halal</option>
            <option value={5}>Pescatarian</option>
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Pick an event date"
          value={props.selectedDate}
          onChange={props.setSelectedDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField
        label="Rough Size of the group"
        value={props.typedNumber}
        onChange={props.setTypedNumber}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
      />
      
    </div>
  );
}