/* Your Code Here */
// Employee Record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Process Array of Arrays into Array of Employee Records
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Add timeIn event
  function createTimeInEvent(dateString) {
    const [date, hour] = dateString.split(' ');
    this.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour, 10) });
    return this;
  }
  
  // Add timeOut event
  function createTimeOutEvent(dateString) {
    const [date, hour] = dateString.split(' ');
    this.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour, 10) });
    return this;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  

  const allWagesFor = function() {
    const dates = this.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate.call(this, date), 0);
  };
  
  // Calculate all wages for an array of employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => totalPayroll + allWagesFor.call(employee), 0);
  }
  
  // Helper function to find employee by first name
  function findEmployeeByFirstName(collection, firstName) {
    return collection.find(employee => employee.firstName === firstName);
  }
  
  // Sample CSV data
  const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    // ... other employee data
  ];
  
  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    // ... other timeIn data
  ];
  
  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    // ... other timeOut data
  ];
  
  
  const employeeRecords = createEmployeeRecords(csvDataEmployees);
  
  
  employeeRecords.forEach((employee, index) => {
    csvTimesIn[index][1].forEach(timeIn => createTimeInEvent.call(employee, timeIn));
    csvTimesOut[index][1].forEach(timeOut => createTimeOutEvent.call(employee, timeOut));
  });
  
  // Calculate total payroll
  const totalPayroll = calculatePayroll(employeeRecords);
  console.log("Total Payroll:", totalPayroll);
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 /*const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}*/