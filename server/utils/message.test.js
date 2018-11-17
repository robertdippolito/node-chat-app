const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    //store response in variable and assert from match, text match and created at value is a number'
    let from = 'Rob';
    let text = 'Hello World!';
    let message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  });
});
describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Admin';
    let lat = 123;
    let long = 456;
    let url = 'https://www.google.com/maps?q=';
    let coords = generateLocationMessage(from, lat, long);
    expect(coords.from).toBe(from);
    expect(coords.url).toBe(`${url}${lat},${long}`);
    expect(typeof coords.createdAt).toBe('number')
  });
});
