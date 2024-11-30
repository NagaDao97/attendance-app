// Fake Database (For demonstration purposes only)
let users = [];  // Array to store user data (username, password, role)
let attendanceRecords = []; // Attendance records array (keeps track of who marked attendance)

let currentUser = null;  // Store current logged-in user
let loginTime = null; // Variable to store the login time

// Show the Signup Page
function showSignup() {
  document.getElementById('signup').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('attendance').style.display = 'none';
  document.getElementById('managerDashboard').style.display = 'none';
}

// Show the Login Page
function showLogin() {
  document.getElementById('login').style.display = 'block';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('attendance').style.display = 'none';
  document.getElementById('managerDashboard').style.display = 'none';
}

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  // Store user data in the "database"
  users.push({ username, password, role });

  alert('Signup successful! Please login.');
  showLogin();
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if the user exists
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    currentUser = user;
    loginTime = new Date();  // Record the login time
    alert('Login successful!');

    // Show the appropriate page based on the user's role
    if (currentUser.role === 'manager') {
      showManagerDashboard();
    } else {
      showAttendancePage();
    }
  } else {
    alert('Invalid credentials! Please try again.');
  }
});

// Show Manager Dashboard
function showManagerDashboard() {
  document.getElementById('managerDashboard').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('attendance').style.display = 'none';

  const userList = document.getElementById('userList');
  userList.innerHTML = '';  // Clear previous list

  users.forEach(user => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.username} (${user.role})`;
    userList.appendChild(listItem);
  });

  // Show the attendance records
  const attendanceList = document.getElementById('attendanceList');
  attendanceList.innerHTML = '';  // Clear previous records
  attendanceRecords.forEach(record => {
    const listItem = document.createElement('li');
    listItem.textContent = `${record.username} marked present at ${record.time}`;
    attendanceList.appendChild(listItem);
  });
}

// Show Attendance Page (User)
function showAttendancePage() {
  document.getElementById('attendance').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
  document.getElementById('managerDashboard').style.display = 'none';

  const userDuration = document.getElementById('userDuration');
  userDuration.textContent = `Logged in for: ${Math.floor((new Date() - loginTime) / 1000)} seconds`;
}

// Mark Attendance (User)
function markAttendance() {
  if (!currentUser) {
    alert('You must be logged in to mark attendance.');
    return;
  }

  const currentTime = new Date().toLocaleTimeString(); // Capture current time
  const record = { username: currentUser.username, time: currentTime };

  // Add the attendance record
  attendanceRecords.push(record);

  alert('Attendance marked successfully!');

  // Update the Manager Dashboard attendance list
  showManagerDashboard();
}

// Logout Function
function logout() {
  currentUser = null;
  loginTime = null; // Clear login time
  alert('You have logged out.');
  
  // Show the Signup page after logout
  showSignup();
}

// Go Back to Signup Page after logout
function goBackToSignup() {
  // Clear user data and show signup page
  currentUser = null;
  loginTime = null; // Clear login time
  showSignup();
}

// Go Back to the Previous Page
function goBack() {
  window.history.back();  // This will take the user back to the previous page in the browser history
}
