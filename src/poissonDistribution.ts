import {add, multiply, pow, e, divide, factorial, MathType} from 'mathjs';
/**
 * Poisson Distribution
 *
 *       k     -λ
 *      λ  *  e
 * p = ----------
 *         k!
 *
 * where λ = expected, k = observed
 */

/**
 * Calculates the probability of a number of successes based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function poissonProbabilityApproximation (observed: number, expected: number): any {
    const a: MathType = multiply(pow(expected,observed) ,pow(e, -expected));
    return divide(a,  factorial(observed));
}


/**
 * Calculates the probability of successes greater than a number of successes  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function poissonProbabilityGreaterThan (observed: number, expected: number): any
{
    return 1 - poissonProbabilityLowerOrEqual(observed, expected);
}

/**
 * Calculates the probability of successes lower than a number of successes  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function poissonProbabilityLowerThan (observed: number, expected: number): any {
    let k = observed - 1
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, poissonProbabilityApproximation(k, expected));
        k -= 1;
    }
    return res;
}

/**
 * Calculates the probability of successes greater or equal than a number of successes  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function poissonProbabilityGreaterOrEqual (observed: number, expected: number): any
{
    return 1 - poissonProbabilityLowerThan(observed, expected);
}

/**
 * Calculates the probability of successes lower than a number of successes  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function poissonProbabilityLowerOrEqual (observed: number, expected: number): any {
    let k = observed
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, poissonProbabilityApproximation(k, expected));
        k -= 1;
    }
    return res;
}

export {
    poissonProbabilityApproximation,
    poissonProbabilityGreaterThan,
    poissonProbabilityGreaterOrEqual,
    poissonProbabilityLowerThan,
    poissonProbabilityLowerOrEqual
}