// Function for getting time and status for the marquee
// Just edit 'Asia/Seoul' when on vacation somewhere!
const currentTimeZone = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul' }).resolvedOptions().timeZone;
const currentCity = currentTimeZone.split('/')[1];

function updateInfo() {
  const currentTime = new Date(new Date().toLocaleString('en-US', { timeZone: currentTimeZone }));
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const options = { weekday: 'long' };
  const today = currentTime.toLocaleDateString('en-US', options).toUpperCase();
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  let statusMessage = '';

// Various statuses depending on the time
  if ((currentTime.getDay() >= 1 && currentTime.getDay() <= 5 && hours >= 8 && hours < 16.5)) {
    statusMessage = '\u00A0AT\u00A0WORK\u00A0';
  } else if ((currentTime.getDay() >= 1 && currentTime.getDay() <= 5 && hours >= 16.5 && hours < 18) ||
             (currentTime.getDay() === 6 && hours >= 11 && hours < 13)|| 
             (currentTime.getDay() === 0 && hours >= 11 && hours < 13)) {
    statusMessage = '\u00A0AT\u00A0THE\u00A0GYM\u00A0';
  } else if ((currentTime.getDay() >= 0 && currentTime.getDay() <= 4 && hours >= 23) ||
             (currentTime.getDay() >= 1 && currentTime.getDay() <= 5 && hours >= 0 && hours < 7) ||
             (currentTime.getDay() === 6 && hours >= 2 && hours < 10)|| 
             (currentTime.getDay() === 0 && hours >= 2 && hours < 10)) {
    statusMessage = '\u00A0SLEEPING\u00A0';
  } else if ((currentTime.getDay() === 0 && hours >= 13 && hours < 21) ||
             (currentTime.getDay() === 5 && hours >= 18) ||
             (currentTime.getDay() === 6 && hours < 2) || 
             (currentTime.getDay() === 6 && hours > 13)) {
    statusMessage = '\u00A0DOWNTOWN\u00A0';
  } else {
    statusMessage = '\u00A0AT\u00A0HOME\u00A0';
  }

  if (currentCity === "Seoul") {
    document.getElementById('currentTime').innerText = '\u00A0' + formattedTime + '\u00A0';
    document.getElementById('currentWeekday').innerText = '\u00A0' + today + '\u00A0';
    document.getElementById('myStatus').innerText = statusMessage;
  } else {
    document.getElementById("currentStatus").innerText = "I\u00A0AM\u00A0ON\u00A0HOLIDAY\u00A0IN\u00A0" + currentCity.toUpperCase() + "\u00A0RIGHT\u00A0NOW\u00A0WHERE\u00A0IT'S\u00A0CURRENTLY\u00A0" + formattedTime; 
  }
}

// Update time every second
setInterval(updateInfo, 1000);


// Grab the source
    document.addEventListener('DOMContentLoaded', function() {
        fetch(window.location.href)
            .then(response => response.text())
            .then(html => {
                document.getElementById('sourceCode').textContent = html;
            })
            .catch(error => {
                console.error('Error fetching source code:', error);
            });
    });

// Function for toggling the source code on and off
        document.addEventListener('DOMContentLoaded', function () {
          var content = document.querySelector('.content');
          var sourceCodeContainer = document.querySelector('.sourcecode');
          var showSource = document.querySelector('.showsource');
          var container = document.querySelector('.container');
// Toggle to show  
          function showSourceCode() {
              sourceCodeContainer.style.filter = 'blur(0px)';
              content.style.display = 'none';
              sourceCodeContainer.style.position = 'static';
              container.style.overflowY = 'visible';
  
              var hideSource = document.createElement('div');
              hideSource.className = 'hidesource';
              hideSource.innerText = 'this site was handmade with love 💙';
              hideSource.addEventListener('click', hideSourceCode);
              document.body.appendChild(hideSource);

              window.scrollTo(0, 0);
          }
// Toggle to hide  
          function hideSourceCode() {
              sourceCodeContainer.style.filter = 'blur(1px)';
              content.style.display = 'block';
              sourceCodeContainer.style.position = 'absolute';
              container.style.overflow = 'hidden';

              window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);


              var hideSource = document.querySelector('.hidesource');
              if (hideSource) {
                  hideSource.remove();
              }
          }

          showSource.addEventListener('click', showSourceCode);
      });

      window.onload = function () {
          var sourceCodeContainer = document.getElementById('sourceCodeContainer');

          fetch('index.html')
              .then(response => response.text())
              .then(sourceCode => {
                  sourceCodeContainer.innerText = sourceCode;
              })
              .catch(error => {
                  console.error('Error fetching source code:', error);
              });    
      };