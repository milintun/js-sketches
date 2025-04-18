// utility functions to work with a single instant in time, wrapped in a class


// The value will be passed to "new Date()", so it accepts anything accepted there:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
function Instant(timeValue) {
  const value = timeValue;
  const d = new Date(value);


  // current hour from 0 (midnight) through 23 (11pm)
  this.hour24 = function() {
    return d.getHours();
  }


  // the hour as a number from 1-12
  this.hour = function() {
    let h = this.hour24();
    h = h % 12;
    if (h === 0) {
      h = 12;
    }
    return h;
  }


  // return 'am' or 'pm' for the specified time (ante meridiem or post meridiem)
  // use toUpperCase() to make this into AM and PM
  this.meridiem = function() {
    return (this.hour24() < 12) ? 'am' : 'pm';
  }


  // return the hour and the minute, for example "6:43"
  this.hourMinute = function() {
    return this.hour() + ':' + nfz(this.minute(), 2);
  }


  // return hour and minute, with am or pm at the end; for example "6:43 pm"
  this.hourMinuteLong = function() {
    return this.hourMinute() + ' ' + this.meridiem();
  }


  // e.g. 11a, 2p, 7p
  this.hourShort = function() {
    return this.hour() + this.meridiem()[0];
  }


  // the current minute
  this.minute = function() {
    return d.getMinutes();
  }


  // day of the month, 1 through 31
  this.day = function() {
    return d.getDate();
  }


  // month of the year, returns 1 through 12
  this.month = function() {
    return d.getMonth() + 1;
  }


  // J, F, M, A, M, J, J, A, S, O, N, D
  this.monthLetter = function() {
    return this.monthName[0];
  }


  // name of the month
  this.monthName = function() {
    return [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ][d.getMonth()];
  }


  // short name of month, like Jan, Feb instead of January, February
  this.monthNameShort = function() {
    return [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ][d.getMonth()];
  }


  // 1968, 2001
  this.year = function() {
    return d.getFullYear();
  }


  // returns 0-6, useful for plotting or indexing
  this.weekday = function() {
    return d.getDay();
  }


  // S, M, T, W, T, F, S
  this.weekdayLetter = function() {
    return this.weekdayName[0];
  }


  // e.g. Sunday, Tuesday, Friday
  this.weekdayName = function() {
    return [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ][d.getDay()];
  }


  this.weekdayNameShort = function() {
    return [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ][d.getDay()];
  }
}
