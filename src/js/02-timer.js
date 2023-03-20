// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
startButton.disabled = true; 
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        // const currentDate = new Date();
       
        if (selectedDates[0] < new Date()) {
          
           window.alert('Please choose a date in the future');
          return;
        } else {
            startButton.disabled = false;
            startButton.addEventListener('click', () => {
    
                startButton.disabled = true;              
                    const intervalId = setInterval(() => {
                  
                        const deltaTime = selectedDates[0] - new Date();
                        
                        const time = convertMs(deltaTime);
                       
                        daysElement.innerText = addLeadingZero(time.days);
                        hoursElement.innerText = addLeadingZero(time.hours);
                        minutesElement.innerText = addLeadingZero(time.minutes);
                        secondsElement.innerText = addLeadingZero(time.seconds);
                        
                        if (deltaTime <= 1000) {
                          clearInterval(intervalId);
                        }
                      }, 1000);
                
             
      
           
          }); 
        }
    },
  };

  flatpickr(datetimePicker, options) ;
  

    
 
//   startButton.addEventListener('click', () => {
    
//         const currentDate = new Date();
//         const selectedDate = new Date(datetimePicker.value);
//         if (selectedDate < currentDate) {
//             startButton.disabled = true; 
//            window.alert('Please choose a date in the future');
          
//         } else  {
//             startButton.disabled = false;
//             const intervalId = setInterval(() => {
          
//                 const deltaTime = selectedDate - new Date();
                
//                 const time = convertMs(deltaTime);
               
//                 daysElement.innerText = addLeadingZero(time.days);
//                 hoursElement.innerText = addLeadingZero(time.hours);
//                 minutesElement.innerText = addLeadingZero(time.minutes);
//                 secondsElement.innerText = addLeadingZero(time.seconds);
                
//                 if (deltaTime <= 1000) {
//                   clearInterval(intervalId);
//                 }
//               }, 1000);
        
//       };
//     // const currentDate = new Date();
//     // const selectedDate = new Date(datetimePicker.value);
//     // if (selectedDate < currentDate) {
     
//     //   window.alert('Please choose a date in the future');
//     //   return;
//     // }
    
//     // const deltaTime = selectedDate - currentDate;
   
//     // const time = convertMs(deltaTime);
   
//     // daysElement.innerText = addLeadingZero(time.days);
//     // hoursElement.innerText = addLeadingZero(time.hours);
//     // minutesElement.innerText = addLeadingZero(time.minutes);
//     // secondsElement.innerText = addLeadingZero(time.seconds);
    
   
//   });
  function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
   
    const days = Math.floor(ms / day);
   
    const hours = Math.floor((ms % day) / hour);
  
    const minutes = Math.floor(((ms % day) % hour) / minute);
    
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }