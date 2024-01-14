const express = require("express");

const path = require("path");

const app = express();

const scheduleMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on.
  const currentHour = currentDate.getHours();

  // Check if it's a weekday (Monday to Friday) and between 9am and 5pm
  if (
    currentDay >= 1 &&
    currentDay <= 6 &&
    currentHour >= 9 &&
    currentHour < 17
  ) {
    // Allow access if within the schedule
    next();
  } else {
    // Deny access if outside the schedule
    res
      .status(403)
      .send("Access forbidden outside of Monday to Friday, 9am to 5pm.");
  }
};

// Use the scheduleMiddleware for all routes to restrict access

app.use(scheduleMiddleware);

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;
// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

app.listen(PORT, () => console.log(`server is running in port ${PORT}`));
