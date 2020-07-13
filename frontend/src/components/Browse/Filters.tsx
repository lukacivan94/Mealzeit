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
import BrowseCard from './Card';
import Burgers from '../../assets/images/burger.jpg';
import SampledEvents from './sampleEvents';
import invited from '../../assets/images/Invited/invited_by.png'
import { NamedModulesPlugin } from 'webpack';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: ' -1px 9px 34px -13px rgba(0,0,0,0.75);',
    },
    wrapper: {
     backgroundColor: 'white', 
     padding: '10px',
     margin: '10px',
    },
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


const tday = new Date();
function getDates(date:Date|null){

  if (date == null){
    return null
  } else {
    const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const string_date = new_date.toString()
    return  string_date
  }
}
console.log(getDates(tday))
const today = new Date()

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
interface State {
  
  numberformat: string;
}
export default function MultipleSelect() {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = React.useState<Date|null>(today);
  const [selectedSetting, setSelectedSetting] = React.useState<string | null>("");
  const [selectedMealType, setSelectedMealType] = React.useState<string | null>("");
  const [selectedFoodType, setSelectedFoodType] = React.useState<string | null>("");
  const [selectedCuisineType, setSelectedCuisineType] = React.useState<string | null>("");
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>("");
 
  
  const [values, setValues] = React.useState<State>({
    numberformat: "",
  });

  const handleChangeSetting = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSetting(event.target.value);
  };
  
  const handleChangeMealType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMealType(event.target.value);
  };
  const handleChangeFoodType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFoodType(event.target.value);
  };
  const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    
  };
  const handleChangeCuisineType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCuisineType(event.target.value);
  };
  const handleDateChange = (date: Date| null) => {
    setSelectedDate(date);
  };
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedEvent(event.target.value);
  };
 
  useEffect(() => console.log(getDates(selectedDate)), [getDates(selectedDate)]);
  
  const filterFoodType = ftype =>((ftype.FoodType == selectedFoodType)|| (selectedFoodType == "") );
  const filterEventType = ftype =>((ftype.EventType == selectedEvent)|| (selectedEvent == "") );
  const filterSetting = ftype =>((ftype.Setting == selectedSetting) || (selectedSetting == ""));
  const filterMealType = ftype =>((ftype.MealType == selectedMealType)||(selectedMealType == ""));
  const filterCuisine = ftype =>((ftype.Cuisine == selectedCuisineType) || (selectedCuisineType == ""));
  const filterSize = ftype =>((ftype.Size == values.numberformat) || (values.numberformat == ""));
  const filterDate = ftype =>((ftype.Date.toString() == getDates(selectedDate)) || (getDates(selectedDate) == getDates(today)));
  const filters = [filterFoodType,filterEventType,filterSetting,filterMealType,filterCuisine,filterSize,filterDate];
  const filteredData = filters.reduce((d, f) => d.filter(f) , SampledEvents)
  console.log(SampledEvents.map((val)=>val.Date ))
  return (
    
    <div className={classes.root}>
      <div className={classes.wrapper}>
      <FormControl className={classes.formControl} onChange={handleChangeEvent}>
        <InputLabel htmlFor="native-select">Event Type</InputLabel>
        <Select native defaultValue="" id="EventType" value ={selectedEvent}>
          <option aria-label="None" value="" />
            <option value={"Volunteering"}>Volunteering</option>
            <option value={"Get Together"}>Get Together</option>
            <option value={"Course"}>Course</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={handleChangeSetting}>
        <InputLabel htmlFor="native-select">Setting</InputLabel>
        <Select native defaultValue="" id="Setting" value ={selectedSetting}>
          <option aria-label="None" value="" />
            <option value={"Indoor"}>Indoor</option>
            <option value={"Outdoor"}>Outdoor</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={handleChangeMealType}>
        <InputLabel htmlFor="native-select">Meal Type</InputLabel>
        <Select native defaultValue="" id="Mealtype" value= {selectedMealType}>
            <option aria-label="None" value=""/>
            <option value={"Breakfast"}>Breakfast</option>
            <option value={"Brunch"}>Brunch</option>
            <option value={"Lunch"}>Lunch</option>
            <option value={"Dinner"}>Dinner</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={handleChangeCuisineType}>
        <InputLabel htmlFor="native-select">Cuisine</InputLabel>
        <Select native defaultValue="" id="Cuisine" value = {selectedCuisineType}>
          <option aria-label="None" value="" />
            <option value={"European"}>European</option>
            <option value={"Asian"}>Asian</option>
            <option value={"African"}>African</option>
            <option value={"North American"}>North American</option>
            <option value={"Australian"}>Australian</option>
            <option value={"South American"}>South American</option>

        </Select>
      </FormControl>
      <FormControl className={classes.formControl} onChange={handleChangeFoodType}>
        <InputLabel htmlFor="native-select">Food type</InputLabel>
        <Select native defaultValue="" id="FoodType" value = {selectedFoodType}>
          <option aria-label="None" value="" />
            <option value={"Vegetarian"}>Vegeterian</option>
            <option value={"Vegan"}>Vegan</option>
            <option value={"Meat"}>Meat</option>
            <option value={"Halal"}>Halal</option>
            <option value={"Pescatarian"}>Pescatarian</option>
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Pick an event date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider>
        <TextField
        label="Size of the group"
        value={values.numberformat}
        onChange={handleChangeSize}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
      />
      </div>
      <Divider variant="middle" />
      <li>
            {
                filteredData.map(
                (val) => <BrowseCard key={val.eventId} id={val.eventId} imageSource={Burgers} title= "Burgers and fries at my place" Date = {val.Date.toDateString()}  Cuisine = {val.Cuisine} 
                EventType = {val.EventType} Location = {val.Location} FoodType = {val.FoodType} MealType = {val.MealType} Size = {val.Size} Setting = {val.Setting} 
                invited = {invited} invitedText = {val.invitedText} inviteeText = {val.inviteeText} name= "ivan"/>
                )
            }

        </li>
      
    </div>
  );
}


