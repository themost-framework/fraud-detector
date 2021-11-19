import {add, multiply, pow, e, divide, factorial, MathType} from 'mathjs';
/**
 * Poisson Distribution
 *
 *       k     -λ
 *      λ  *  e
 * p = ----------
 *         k!
 *
 * where λ = mean, k = observed
 */

/**
 * Calculates the probability of a number of successes based on the mean number of successes
 * @param {number} mean - The mean number of successes
 * @param {number} observed - The number of successes in question
 * @returns {*} The calculated probability
 */
function poissonProbabilityApproximation (mean: number, observed: number): any {
    const a: MathType = multiply(pow(mean,observed) ,pow(e, -mean));
    return divide(a,  factorial(observed));
}


/**
 * Calculates the probability of successes greater than a number of successes  based on the mean number of successes
 * @param {number} mean - The mean number of successes
 * @param {number} observed - The number of successes in question
 * @returns {*} The calculated probability
 */
function poissonProbabilityGreaterThan (mean: number, observed: number): any
{
    return 1 - poissonProbabilityLowerOrEqual(mean, observed);
}

/**
 * Calculates the probability of successes lower than a number of successes  based on the mean number of successes
 * @param {number} mean - The mean number of successes
 * @param {number} observed - The number of successes in question
 * @returns {*} The calculated probability
 */
function poissonProbabilityLowerThan (mean: number, observed: number): any {
    let k = observed - 1
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, poissonProbabilityApproximation(mean, k));
        k -= 1;
    }
    return res;
}

/**
 * Calculates the probability of successes greater or equal than a number of successes  based on the mean number of successes
 * @param {number} mean - The mean number of successes
 * @param {number} observed - The number of successes in question
 * @returns {*} The calculated probability
 */
function poissonProbabilityGreaterOrEqual (mean: number, observed: number): any
{
    return 1 - poissonProbabilityLowerThan(mean, observed);
}

/**
 * Calculates the probability of successes lower than a number of successes  based on the mean number of successes
 * @param {number} mean - The mean number of successes
 * @param {number} observed - The number of successes in question
 * @returns {*} The calculated probability
 */
function poissonProbabilityLowerOrEqual (mean: number, observed: number): any {
    let k = observed
    let res: MathType = 0;
    while(k>=0) {
        res = add(res, poissonProbabilityApproximation(mean, k));
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