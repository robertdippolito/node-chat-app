const expect = require('expect');
const {isRealString} = require('./validation');
// import isRealString

// isRealString
// should reject non-string values
// should reject string with only spaces
// should allow string with non-space characters

describe('isRealString', () => {
    it('should reject a non-string value', () => {
      let nonString = 321;
      expect(isRealString(nonString)).toBe(false);
    });
    it('should reject a string of spaces', () => {
        let spaceString = '   ';
        expect(isRealString(spaceString)).toBe(false);
      });
      it('should accept the string value', () => {
        let spaceString = 'helloworld';
        expect(isRealString(spaceString)).toBe(true);
      });
  });