// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
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
          
        if (selectedDates[0] < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');

        //    window.alert('Please choose a date in the future');
          return;
        } else {
            startButton.disabled = false;
        }
    },
  };

  flatpickr(datetimePicker, options) ;
      
 
  startButton.addEventListener('click', () => {
    
        const selectedDate = new Date(datetimePicker.value);
        
            const intervalId = setInterval(() => {
          
                const deltaTime = selectedDate - new Date();
                
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