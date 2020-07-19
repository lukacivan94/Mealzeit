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
import CookroomImage from '../../assets/images/Cookroom_plates.png';
import CourseImage from '../../assets/images/Courses.jpeg';
import SampledEvents from './sampleEvents';
import invited from '../../assets/images/Invited/invited_by.png'
import Divider from '@material-ui/core/Divider';
import PublicCard, {CourseCard} from './Card';
import moment from 'moment';
import { getTime } from 'date-fns';


interface Props{
  Courses:any;
  Cookrooms:any;

}

/** (✓)
 * Styles for the components 
 */
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
    DontShow:{
      display:'none',
    },
    Show:{
      visibility:'visible',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 200,
    },
    formControlDate:{
      minWidth: 120,
      maxWidth: 200,
      margin: '7.5px 0px',
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

/** (✓)
 * the function getHours deconstructs the date string into hours so that we can use it for the meal type 
 * getMeal type function sues the time in the date string to figure out the meal type as it is needed to figure out wether the 
 * Meal type is breakfast, lunch dinner or brunch 
 */
const  getHours = (val) => moment(val).format("HH")

function getMealType(val){
  const time = getHours(val);
  const hInt = parseInt(time, 10);

  if (hInt >= 5 && hInt < 11 ){
    return 'Breakfast'
  } else if( hInt >= 11 && hInt < 13){
    return "Brunch"
  }else if(( hInt >= 13 && hInt < 16)){
    return "Lunch"
  }else{
    return "Dinner"
  }
}
// * the function getDates deconstructs the date string into the date YYYY-MM-HH format 

function getDates(val){
  const dt = moment(val).format("YYYY-MM-DD")
  return dt.toString()
}
function getDateTime(val){
  const dt = moment(val).format("YYYY-MM-DD HH:MM")
  return dt.toString()
}
// this function returns wether the classroom is virtual or not for the courses object by looking at the is_virtual parameter
const getIsVirtual= setting => (setting? "Online" : "Classroom");

//this function determines wether the course is a premiumn course or not 
const getPremium = prem => (prem? "Included in Premium": "Not included in Premium")

//this function returns wether the type of agthering in cookroom is a volunteering event or not 
const getEvent= (val) => val? "Volunteering": "Get Together";

const Range = value => parseInt(value,10) && (parseInt(value,10) < 0 || parseInt(value,10)>5000) ? 'Invalid Price, enter from 0 to 5000!': undefined;

const today = new Date()


/** (✓)
 * This is the number format used for the price and the size inpiut fields and the interfaces that are used for these fields are given below
 */
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

/** (✓)
 * This is a multiple select function where we use  multiple filters to filter out the cards according to the filters selected by the user 
 */
export default function MultipleSelect(props:Props) {
  const classes = useStyles();
  const theme = useTheme();
 
  //setting the state variables
  const [selectedDate, setSelectedDate] = React.useState<Date|null>(today);
  const [selectedSetting, setSelectedSetting] = React.useState<string | null>("");
  const [selectedMealType, setSelectedMealType] = React.useState<string>("");
  const [selectedFoodType, setSelectedFoodType] = React.useState<string>("");
  const [selectedCuisineType, setSelectedCuisineType] = React.useState<string>("");
  const [selectedEvent, setSelectedEvent] = React.useState<string | null>("");
  const [searches, setSearch] = React.useState<string>("");
  const [selectedCookroomEvent,setSelectedCookroomEvent]= React.useState<string | null>("");
  
  const [values, setValues] = React.useState<State>({
    numberformat: "",
  });
  const [price, setPrice] = React.useState<State>({
    numberformat: "",
  });

  //on change functions to changes each states
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
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
  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice({
      ...price,
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
  const handleChangeVolunteering = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCookroomEvent(event.target.value);
  };
  
 
  //this function is a  filter for the seaarch by titletle and we make case it case insensitive
  function filterTitle(ftype){
    if(ftype.title!= null){
      if((ftype.title.toLowerCase().includes(searches.toLowerCase()))||(searches=="")){
        return true
      }else{
        return false
      }
      
    }else{
      return false
    }
  };
  //this function is a filter by price so the courses with price below the numbers entered will be shown
  const filterPrice = ftype =>{
    const initPrice = ftype.price_of_course
      if((initPrice <= parseInt(price.numberformat,10))||(price.numberformat=='')){
        return true
       }else{
         return false
       }

    }
  //array of filters according to Food type, event type, setting, meal type and so on 
  const filterFoodType = ftype =>((ftype.food_type.toLowerCase() == selectedFoodType.toLowerCase())|| (selectedFoodType == ""));
  const filterEventType = ftype =>(((ftype.hasOwnProperty("course_rating"))&&(selectedEvent == "Course"))|| (selectedEvent == "") );
  const filterVolunteering = ftype =>(((selectedCookroomEvent == getEvent(ftype.is_volunteering))|| (selectedCookroomEvent == "") ));
  const filterEventType2 = ftype =>(((ftype.hasOwnProperty("is_volunteering"))&&(selectedEvent == "Cookroom"))|| (selectedEvent == "") );
  const filterSetting = ftype =>((getIsVirtual(ftype.is_virtual) == selectedSetting) || (selectedSetting == ""));
  const filterMealType = ftype =>((getMealType(ftype.date_time) == selectedMealType)||(selectedMealType == ""));
  const filterCuisine = ftype =>((ftype.cuisine_type.toLowerCase() == selectedCuisineType.toLowerCase()) || (selectedCuisineType == ""));
  const filterSize = ftype =>((ftype.number_of_members == values.numberformat) || (values.numberformat == ""));
  const filterDate = ftype =>((getDates(ftype.date_time) == getDates(selectedDate)) || (getDates(selectedDate) == getDates(today)));
  const filterDateCourses = ftype =>((getDates(ftype.dates[0]) == getDates(selectedDate)) || (getDates(selectedDate) == getDates(today)));


  /** (✓)
   * filterss array contain all the filters for the courses object
   * filters2 contains all the filters relevant for the cookromm object
   * we apply each filter to the array of courses and cookrooms respectively  
   * and then store all the filtered courses and cookroom in filtered cookrooms and filtered courses 
  */
  const filters = [filterEventType,filterSize,filterPrice,filterSetting,filterTitle,filterDateCourses];
  const filters2 = [filterEventType2,filterSize,filterCuisine,filterFoodType,filterTitle,filterDate,filterMealType,filterVolunteering];
  const filteredCourses = filters.reduce((d, f) => d.filter(f) , props.Courses)
  const filteredCookrooms = filters2.reduce((d, f) => d.filter(f) , props.Cookrooms)

  return (
    <div className={classes.root}>
      
      <div className={classes.wrapper}>
        <TextField
            className={classes.formControl}
            id="standard-multiline-flexible"
            label="Search By Title"
            multiline
            rowsMax={2}
            value={searches}
            onChange={handleChangeSearch}
        />

        <FormControl className={classes.formControl} onChange={handleChangeEvent}>
          <InputLabel htmlFor="native-select">Event Type</InputLabel>
          <Select native defaultValue="" id="EventType" value ={selectedEvent}>
              <option aria-label="None" value="" />
              <option value={"Cookroom"}>Cookroom</option>
              <option value={"Course"}>Course</option>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
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
        </FormControl>

        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
                className={classes.formControlDate}
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
          </FormControl>
              <div className ={(selectedEvent=="Course" || selectedEvent == "")? classes.DontShow : classes.Show} >
                <FormControl className={classes.formControl} onChange={handleChangeVolunteering}>
                  <InputLabel htmlFor="native-select">Cookroom Type</InputLabel>
                  <Select native defaultValue="" id="EventType" value ={selectedCookroomEvent}>
                      <option aria-label="None" value="" />
                      <option value={"Volunteering"}>Volunteering</option>
                      <option value={"Get Together"}>Get together</option>
                     
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
                      <option value={"American"}>American</option>
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} onChange={handleChangeFoodType}>
                  <InputLabel htmlFor="native-select">Food type</InputLabel>
                  <Select native defaultValue="" id="FoodType" value = {selectedFoodType}>
                    <option aria-label="None" value="" />
                      <option value={"Vegetarian"}>Vegetarian</option>
                      <option value={"Vegan"}>Vegan</option>
                      <option value={"Meat based"}>Meat based</option>
                  </Select>
                </FormControl>
            </div>
            <div className ={(selectedEvent=="Cookroom" || selectedEvent == "") ? classes.DontShow : classes.Show}>
                <FormControl className={classes.formControl} onChange={handleChangeSetting}>
                  <InputLabel htmlFor="native-select">Setting</InputLabel>
                  <Select native defaultValue="" id="Setting" value ={selectedSetting}>
                    <option aria-label="None" value="" />
                      <option value={"Online"}>Online</option>
                      <option value={"Classroom"}>Classroom</option>
                  </Select>
                </FormControl>
              
                <FormControl className={classes.formControl}>
                  <TextField
                    label="Price in Euros"
                    
                    value={price.numberformat}
                    onChange={handleChangePrice}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                  />
                </FormControl>
            </div>
        
      </div>
      <Divider variant="middle" />
      <div>
            {   //this takes all the courses information and we display it one by one in an array
                filteredCourses.map(
                (val) => <CourseCard key={val._id} Id={val._id} ImageSource={CourseImage} Title= {val.title}  
                EventType = "Course" Location = {val.location} Rating = {val.course_rating}  Size = {val.number_of_members} Setting = {getIsVirtual(val.is_virtual)} 
                Price = {val.price_of_course} IncludedInPremium = {getPremium(val.is_included_in_premium)} TRatings= {val.number_of_ratings} PreparationTime = {val.preparation_time}
                 Members = {val.members} NumMembers={val.number_of_members} ListDates={getDateTime(val.dates[0])}/>
                )

            }

        </div>
        <div>
            {
                //this takes all the cookrooms information and we display it one by one in an array
                filteredCookrooms.map(
                (val) => <PublicCard key={val._id} ImageSource={CookroomImage} Title= {val.title} Date = {getDateTime(val.date_time)} EventType = {getEvent(val.is_volunteering)}  Location = {val.location} Size = {val.number_of_members} 
                Price = {val.suggested_price}   PreparationTime = {val.preparation_time}
                FoodType={val.food_type} MealType = {val.meal_type} Cuisine={val.cuisine_type} Id={val._id} Setting= ""  Members = {val.members} NumMembers={val.number_of_members} Requested = {val.requests}/>
                )
                
            }

        </div>
      
    </div>
  );
}


