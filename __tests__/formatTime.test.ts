import {formatTime} from "@/lib/utils";

describe('formatTime', () => {
    test('should correctly format time for whole minutes and seconds', () => {
        const input1 = 90;
        const input2 = 360;
        const expected1 = '01:30';
        const expected2 = '06:00';

        const result1 = formatTime(input1);
        const result2 = formatTime(input2);

        expect(result1).toBe(expected1);
        expect(result2).toBe(expected2);
    });

    test('should correctly format time for less than a minute', () => {
        const input1 = 45;
        const input2 = 5;
        const expected1 = '00:45';
        const expected2 = '00:05';

        const result1 = formatTime(input1);
        const result2 = formatTime(input2);

        expect(result1).toBe(expected1);
        expect(result2).toBe(expected2);
    });

    test('should correctly format time for zero seconds', () => {
        const input = 0;
        const expected = '00:00';

        const result = formatTime(input);

        expect(result).toBe(expected);
    });

    test('should correctly format time for large inputs', () => {
        const input1 = 3600;
        const input2 = 7261;
        const expected1 = '60:00';
        const expected2 = '121:01';

        const result1 = formatTime(input1);
        const result2 = formatTime(input2);

        expect(result1).toBe(expected1);
        expect(result2).toBe(expected2);
    });
});
