const{ login } = require('./controllers/auth');
test('should  login succesfully', () => {
    const text = login('ravi', 'ravi123');
});

const{ adminlogin } = require('./controllers/auth');
test('should  login succesfully', () => {
    const text = adminlogin('suresh', 'suresh123');
});

const{ fac } = require('./controllers/auth');

test('should  change succesfully', () => {
    const text = fac('V Ravi', 'CI', 'A102');
});

const{ timetable } = require('./controllers/auth');

test('should  display succesfully', () => {
    const text = timetable('CIVIL');
});

const{ adminca } = require('./controllers/auth');

test('should  assign faculty to their roles', () => {
    const text = adminca('C siddhartha''CI');
});

const{ exam } = require('./controllers/auth');

test('the exam details', () => {
    const text = exam('cse','10-06-2021','CSE001', 'EXAM1', '1');
});

const{ student } = require('./controllers/auth');

test('the exam details of student will be displayed', () => {
    const text = student('CB.EN.U4AERO18001','shankar','C204');
});

const{ facroom } = require('./controllers/auth');

test('the room number for the faculty should be assigned', () => {
    const text = facroom('V Ravi','A202','10-06-2021');
});

const{ edit } = require('./controllers/auth');

test('details of the faculty will be changed', () => {
    const text = edit('raviaero@gmail.com','ravi','2147665544');
});

const{ notify } = require('./controllers/auth');

test('should  notify the faculty', () => {
    const text = notify('C siddhartha','Schedule updated');
});
