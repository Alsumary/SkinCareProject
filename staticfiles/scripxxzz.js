const navbar = document.querySelector('.nvnov')
const navLinks = document.querySelectorAll('.nvnvLink')
const sections = document.querySelectorAll('.seo')

window.addEventListener('scroll', () => {
    if(window.scrollY > 30 ) {
        navbar.classList.add('backdrop-blur-md')
        navbar.classList.add('bg-opacity-50')
        navbar.classList.add('nav-shadow')

    }else{
        navbar.classList.remove('backdrop-blur-md')
        navbar.classList.remove('bg-opacity-50')
        navbar.classList.remove('nav-shadow')

    }
})


const today = new Date();
today.setHours(0, 0, 0, 0);
let contBtn = document.getElementById('contBtn');
let timetable = document.querySelectorAll('#timetable li input');
let timeLabels = document.querySelectorAll('#timetable li label');
let dateValue = document.getElementById('date-modal-value');
let timeValue = document.getElementById('time-modal-value');
let subForm = document.getElementById('subForm');
let contmodal = document.getElementById('cont-modal');
let ddSelected = document.getElementById('ddSelected');
let twiceInputs = document.querySelectorAll('.twiceInputs');
const shakeDiv = document.getElementById('forShaking');
const datepicker = document.getElementById('datepickerEl');
let selectedDate;
let selectedTime;
let formattedDate;



function formatDate(date) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    }
function shakeElement(e) {
    e.classList.add('shake');
    setTimeout(() => {
        e.classList.remove('shake')
    }, 500)
}


function timetableGet() {
    timetable.forEach(timeNow => {
        if(timeNow.checked){
            selectedTime = timeNow.id;
        }
    });
}
function convertTimeFormat(inputTime) {
    // Check if the inputTime has the expected format
    const parts = inputTime.split('-');
    if (parts.length !== 3) {
        console.error('Invalid input time format.');
        return null;
    }

    const [hourStr, minuteStr, meridiem] = parts;
    const hour = parseInt(hourStr);
    const minute = parseInt(minuteStr);

    // Check if hour and minute are valid numbers
    if (isNaN(hour) || isNaN(minute)) {
        console.error('Invalid hour or minute value.');
        return null;
    }

    // Adjust hour for PM time
    let formattedHour = hour;
    if (meridiem.toLowerCase() === 'pm' && hour < 12) {
        formattedHour += 12;
    }

    // Pad single digits with a leading zero
    formattedHour = formattedHour.toString().padStart(2, '0');

    return `${formattedHour}:${minute.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', function() {

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight for compariso
    let datepickerCells = document.querySelectorAll('.datepicker-cell');
    datepickerCells.forEach(cell => {
        const cellDate = new Date(cell.dataset.date);
        console.log('is less')
        if (cellDate < today) {
            console.log('is less')
        }
    });

    timetable.forEach(timeField => {
        timeField.addEventListener('click', (event) => {
            if(timeField.getAttribute('isbooked') === "true"){
                event.preventDefault()
                shakeElement(shakeDiv)
            }
        });
    });

    // Use the Flowbite datepicker API to handle date selection
    datepicker.addEventListener('changeDate', function(event) {
        timetable.forEach(timeField => {
            timeField.checked = false;
            timeLabels.forEach(timeLabel => {
                let timeLabelAttribute = timeLabel.getAttribute('for')
                if(timeLabelAttribute === timeField.id){
                    timeLabel.classList.remove('bg-red-600')
                    timeLabel.classList.remove('text-white')
                    timeLabel.classList.remove('hover:bg-red-500')
                    timeLabel.classList.remove('hover:text-white')
                    timeField.setAttribute('isBooked', 'false')
                }
            })
        });
        

        selectedDate = new Date(event.detail.date);
        formattedDate = formatDate(selectedDate);

        var appointments = document.querySelectorAll(".aps");
        for (var i = 0; i < appointments.length; i++) {
        var appointmentDateValue = appointments[i].querySelector(".appointment-date").value;
        var appointmentTimeValue = appointments[i].querySelector(".appointment-time").value;
        var appointmentDate = new Date(appointmentDateValue);
        // console.log(appointmentDate.getMonth() + 1)
        // console.log(selectedDate.getMonth() + 1 )
        if (appointmentDate.getMonth() + 1 === selectedDate.getMonth() + 1 & appointmentDate.getFullYear() === selectedDate.getFullYear() & appointmentDate.getDate() === selectedDate.getDate()) {
            timetable.forEach(timeField => {
                if(convertTimeFormat(timeField.id) === appointmentTimeValue){
                    timeLabels.forEach(timeLabel => {
                        let timeLabelAttribute = timeLabel.getAttribute('for')
                        if(timeLabelAttribute === timeField.id){
                            timeLabel.classList.add('bg-red-600')
                            timeLabel.classList.add('text-white')
                            timeLabel.classList.add('hover:bg-red-500')
                            timeLabel.classList.add('hover:text-white')
                            timeField.setAttribute('isBooked', 'true')
                        }
                    })
                }
            });
        }
    }
    });
});


contBtn.addEventListener('click', () => {
    timetableGet()
    if(selectedDate != undefined){
        dateValue.value = formattedDate
    }
    if(selectedTime != undefined){
        // timeValue.value = selectedTime
        timeValue.value = convertTimeFormat(selectedTime)

    }
})
let BookType = document.getElementById('BookType')
const selectedValue = BookType.value;
let dateBoolean, timeBoolean, NameBoolean, EmailBoolean, PhoneBoolean = false
subForm.addEventListener('submit', (event) =>  {
    if(dateValue.value){
        dateTimeBoolean = true;
        dateValue.value = formattedDate;
    }else{
        event.preventDefault()
        shakeElement(dateValue);
    }
    if(timeValue.value){
        timeBoolean = true;
    }else{
        event.preventDefault()
        shakeElement(timeValue);
    }

    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let phone = document.getElementById('phone')

    if(name.value){
        NameBoolean = true;
    }else{
        event.preventDefault()
        shakeElement(name);
    }
    
    if(email.value){
        EmailBoolean = true;
    }else{
        event.preventDefault()
        shakeElement(email);
    }

    if(phone.value){
        PhoneBoolean = true;
    }else{
        event.preventDefault()
        shakeElement(phone);
    }




    if (selectedValue === "selected") {
        // Log a message to the console
        shakeElement(BookType)
      } else {
        console.log("Selected value:", selectedValue);
      }
})


window.onscroll =() => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                if(id == "home"){
                    link.classList.remove('text-white')
                    link.classList.remove('bg-blue-700')
                    link.classList.remove('md:text-blue-700')
                    link.classList.remove('text-gray-900')
                    document.querySelector(".nvnvLink[href*='#home']").classList.add('text-white')
                    document.querySelector(".nvnvLink[href*='#home']").classList.add('bg-blue-700')
                    document.querySelector(".nvnvLink[href*='#home']").classList.add('md:bg-transparent')
                    document.querySelector(".nvnvLink[href*='#home']").classList.add('md:text-blue-700')
                }else{
                    link.classList.remove('text-white')
                    link.classList.remove('bg-blue-700')
                    link.classList.remove('md:text-blue-700')
                    link.classList.remove('text-gray-900')
                    document.querySelector('.nvnvLink[href*=' + id + ']').classList.add('text-white')
                    document.querySelector('.nvnvLink[href*=' + id + ']').classList.add('bg-blue-700')
                    document.querySelector('.nvnvLink[href*=' + id + ']').classList.add('md:bg-transparent')
                    document.querySelector('.nvnvLink[href*=' + id + ']').classList.add('md:text-blue-700')
                }
            })
        }
    });
}


