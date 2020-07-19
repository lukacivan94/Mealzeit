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


const tday = new Date();
// function getDates(date:Date|null){

//   if (date == null){
//     return null
//   } else {
//     const new_date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
//     const string_date = new_date.toString()
//     return  string_date
//   }
// }
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
function getDates(val){
  const dt = moment(val).format("YYYY-MM-DD HH:MM")
  return dt.toString()
}
console.log(getMealType("2020-07-16T18:30:42.392Z"))


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
interface StateText {
  text: string;
}
const getIsVirtual= setting => (setting? "Online" : "Classroom");
const getPremium = prem => (prem? "Included in Premium": "Not included in Premium")

const getEvent= (val) => val? "Volunteering": "Get Together";


//..................Main function ..............................................................................................................
export default function MultipleSelect(props:Props) {
  const classes = useStyles();
  const theme = useTheme();
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
  
  useEffect(() => console.log( getDates(selectedDate), [getDates(selectedDate)]));

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
    const filterPrice = ftype =>{
       const initPrice = ftype.price_of_course
      

       if((initPrice <= parseInt(price.numberformat,10))||(price.numberformat=='')){
         return true
       }else{
         return false
       }

    }



  const filterFoodType = ftype =>((ftype.food_type.toLowerCase() == selectedFoodType.toLowerCase())|| (selectedFoodType == ""));
  const filterEventType = ftype =>(((ftype.hasOwnProperty("course_rating"))&&(selectedEvent == "Course"))|| (selectedEvent == "") );
  const filterVolunteering = ftype =>(((selectedCookroomEvent == getEvent(ftype.is_volunteering))|| (selectedCookroomEvent == "") ));
  const filterEventType2 = ftype =>(((ftype.hasOwnProperty("is_volunteering"))&&(selectedEvent == "Cookroom"))|| (selectedEvent == "") );
  const filterSetting = ftype =>((getIsVirtual(ftype.is_virtual) == selectedSetting) || (selectedSetting == ""));
  const filterMealType = ftype =>((getMealType(ftype.date_time) == selectedMealType)||(selectedMealType == ""));
  const filterCuisine = ftype =>((ftype.cuisine_type.toLowerCase() == selectedCuisineType.toLowerCase()) || (selectedCuisineType == ""));
  // const filterPrice = ftype =>((parseInt(ftype.price_of_course,10) <= parseInt(price.numberformat,10)-25)||(parseInt(ftype.price_of_course,10) >= (parseInt(price.numberformat,10)+25)) || (price.numberformat == ""));
  const filterSize = ftype =>((ftype.number_of_members == values.numberformat) || (values.numberformat == ""));
  //const filterTitle = ftype =>((ftype.title.includes(searches ))|| (searches == ""));
  const filterDate = ftype =>((getDates(ftype.date_of_publish) == getDates(selectedDate)) || (getDates(selectedDate) == getDates(today)));
  const filters = [filterEventType,filterSize,filterPrice,filterSetting,filterTitle,filterDate];
  const filters2 = [filterEventType2,filterSize,filterCuisine,filterFoodType,filterTitle,filterDate,filterMealType,filterVolunteering];
  const filteredCourses = filters.reduce((d, f) => d.filter(f) , props.Courses)
  //const filteredCourses = props.Courses

  //const filteredCookrooms = filters.reduce((d, f) => d.filter(f) , cookrooms)
  const filteredCookrooms = filters2.reduce((d, f) => d.filter(f) , props.Cookrooms)
  console.log(props.Cookrooms)
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
                      <option value={"Lunch"}>Brunch</option>
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
            {
                filteredCourses.map(
                (val) => <CourseCard key={val._id} Id={val._id} ImageSource={CourseImage} Title= {val.title} Date = {getDates(val.date_of_publish)} 
                EventType = "Course" Location = {val.location} Rating = {val.course_rating}  Size = {val.number_of_members} Setting = {getIsVirtual(val.is_virtual)} 
                Price = {val.price_of_course} IncludedInPremium = {getPremium(val.is_included_in_premium)} TRatings= {val.number_of_ratings} PreparationTime = {val.preparation_time}
                FoodType={val.food_type} MealType = {val.meal_type} Cuisine={val.cuisine_type} Members = {val.members} NumMembers={val.number_of_members}/>
                )

            }

        </div>
        <div>
            {
                filteredCookrooms.map(
                (val) => <PublicCard key={val._id} ImageSource={CookroomImage} Title= {val.title} Date = {getDates(val.date_time)} EventType = {getEvent(val.is_volunteering)}  Location = {val.location} Size = {val.number_of_members} 
                Price = {val.suggested_price} IncludedInPremium = {getPremium(val.is_included_in_premium)} TRatings= {val.number_of_ratings} PreparationTime = {val.preparation_time}
                FoodType={val.food_type} MealType = {val.meal_type} Cuisine={val.cuisine_type} Id={val._id} Setting= "" Rating={0} Members = {val.members} NumMembers={val.number_of_members}/>
                )
                
            }

        </div>
      
    </div>
  );
}


