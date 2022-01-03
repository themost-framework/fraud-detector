import { poissonProbabilityApproximation } from './poissonDistribution';
import { divide, subtract, add, MathType } from 'mathjs';

// Zero-truncated Poisson distribution
//            f(k;λ)
// g(k; λ) = ----------
//            1-f(k;λ)

/**
 * @param observed The number of occurences
 * @param expected The expected value
 * @returns {*} The calculated probability
 */
function zeroTruncatedProbabilityApproximation(observed: number, expected: number): any {
    return divide(poissonProbabilityApproximation(observed, expected),
        subtract(1, poissonProbabilityApproximation(0, expected)));
}

/**
 * Calculates the probability of lower than a number of occurences based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function zeroTruncatedProbabilityLowerThan (observed: number, expected: number): any {
    let k = observed - 1
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, zeroTruncatedProbabilityApproximation(k, expected));
        k -= 1;
    }
    return res;
}

/**
 * Calculates the probability of lower than or equal to a number of occurences  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function zeroTruncatedProbabilityLowerOrEqual (observed: number, expected: number): any {
    let k = observed
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, zeroTruncatedProbabilityApproximation(k, expected));
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
function zeroTruncatedProbabilityGreaterOrEqual (observed: number, expected: number): any
{
    return 1 - zeroTruncatedProbabilityLowerThan(observed, expected);
}

/**
 * Calculates the probability of successes greater than a number of successes  based on the expected value
 * @param {number} observed - The number of occurences
 * @param {number} expected - The expected value
 * @returns {*} The calculated probability
 */
function zeroTruncatedProbabilityGreaterThan (observed: number, expected: number): any
{
    return 1 - zeroTruncatedProbabilityLowerOrEqual(observed, expected);
}

export {
    zeroTruncatedProbabilityApproximation,
    zeroTruncatedProbabilityLowerOrEqual,
    zeroTruncatedProbabilityLowerThan,
    zeroTruncatedProbabilityGreaterOrEqual,
    zeroTruncatedProbabilityGreaterThan
}