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