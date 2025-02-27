let myDate = new Date();
let year = myDate.getFullYear();
let month = ('0' + (myDate.getMonth() + 1)).slice(-2);
let day = ('0' + myDate.getDate()).slice(-2);
let hours = ('0' + myDate.getHours()).slice(-2);
let minutes = ('0' + myDate.getMinutes()).slice(-2);
let seconds = ('0' + myDate.getSeconds()).slice(-2);

let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
module.exports = formattedDateTime;
