test('hello world!', () => {
	expect(1 + 1).toBe(2);
});
const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

describe('Username validation regex', () => {
	test('valid username passes', () => {
		expect(regex.test('Abcdef1@')).toBe(true);
		expect(regex.test('Password1!')).toBe(true);
		expect(regex.test('A1@aaaaa')).toBe(true);
	});

	test('missing capital letter fails', () => {
		expect(regex.test('abcdef1@')).toBe(false);
	});

	test('missing special character fails', () => {
		expect(regex.test('Abcdef12')).toBe(false);
	});

	test('missing number fails', () => {
		expect(regex.test('Abcdefg@')).toBe(false);
	});

	test('less than 8 characters fails', () => {
		expect(regex.test('Ab1@abc')).toBe(false);
	});

	test('all requirements barely met passes', () => {
		expect(regex.test('A1@aaaaa')).toBe(true);
	});

	test('contains only allowed characters', () => {
		expect(regex.test('A1@aaaaa')).toBe(true);
		expect(regex.test('A1@aaaaa!')).toBe(true);
		expect(regex.test('A1@aaaaa#')).toBe(false); // '#' not allowed
	});
});