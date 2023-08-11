// Get references to elements
const resultParagraph = document.getElementById("result");
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");
const ipAddressElement = document.getElementById("ip-address");
const userLocationElement = document.getElementById("user-location");

// Manually provided dry day list (change as needed)
const dryDays = [  "2023-01-14",
"2023-01-26",
"2023-01-30",
"2023-02-15",
"2023-02-18",
"2023-02-19",
"2023-03-08",
"2023-03-30",
"2023-04-04",
"2023-04-07",
"2023-04-14",
"2023-04-22",
"2023-06-29",
"2023-07-03",
"2023-07-28",
"2023-07-29",
"2023-08-15",
"2023-09-06",
"2023-09-07",
"2023-09-19",
"2023-09-28",
"2023-10-02",
"2023-10-24",
"2023-10-28",
"2023-11-12",
"2023-11-23",
"2023-11-27",
"2023-12-25"];

// Function to show a persistent alert with custom styling
function showPersistentAlert(message, className) {
  const alertElement = document.createElement("div");
  alertElement.className = `alert ${className} mt-3`;
  alertElement.textContent = message;

  resultParagraph.appendChild(alertElement);
}

// Function to check if today is a dry day
function checkDryDay() {
  const currentDate = new Date().toISOString().split("T")[0];

  if (dryDays.includes(currentDate)) {
    showPersistentAlert("Today is a dry day.", "alert-danger");
  } else {
    showPersistentAlert("Today is not a dry day.", "alert-success");
  }
}

// Function to update the date and time
function updateDateTime() {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const formattedTime = currentDate.toLocaleTimeString('en-US');

  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}

// Function to fetch and display user's IP address and location
async function getUserInfo() {
  try {
    const response = await fetch('https://ipinfo.io/?token=2d9d8dd4afcfe7');
    if (!response.ok) {
      throw new Error('Failed to fetch IP information');
    }

    const data = await response.json();

    ipAddressElement.textContent = `IP Address: ${data.ip}`;
    userLocationElement.textContent = `Location: ${data.city}, ${data.region}, ${data.country}`;
  } catch (error) {
    console.error('Error fetching user info:', error);
    ipAddressElement.textContent = 'IP Address: Error';
    userLocationElement.textContent = 'Location: Error';
  }
}

// Call the necessary functions when the page loads
updateDateTime();
checkDryDay();
getUserInfo();

// Update the time every second
setInterval(updateDateTime, 1000);
