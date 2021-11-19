import { FraudDetectorService, poissonProbabilityApproximation,
    zeroTruncatedProbabilityGreaterThan,
    zeroTruncatedProbabilityApproximation } from '../src/index';
import { ExpressDataApplication } from '@themost/express';
import { round } from 'mathjs';
import { TraceUtils } from '@themost/common';
describe('FraudDetectorService', () => {
    let app: ExpressDataApplication;
    beforeAll(() => {
        app = new ExpressDataApplication();
    });
    it('should create instance', () => {
        const service = new FraudDetectorService(app);
        expect(service).toBeTruthy();
    });

    it('should calculate probability approximation', () => {
        // https://en.wikipedia.org/wiki/Poisson_distribution
        // flood per 100 years
        // k = 0
        TraceUtils.info(`poissonProbabilityApproximation(0, 1) = .368`)
        let value = poissonProbabilityApproximation(0, 1);
        expect(round(value, 3)).toBe(.368);
        // k = 1
        TraceUtils.info(`poissonProbabilityApproximation(1, 1) = .368`)
        value = poissonProbabilityApproximation(1, 1);
        expect(round(value, 3)).toBe(.368);
        // k = 2
        TraceUtils.info(`poissonProbabilityApproximation(2, 1) = .184`)
        value = poissonProbabilityApproximation(2, 1);
        expect(round(value, 3)).toBe(.184);
        // k = 2
        TraceUtils.info(`zeroTruncatedProbabilityApproximation(2, 1) = .291`)
        value = zeroTruncatedProbabilityApproximation(2, 1);
        expect(round(value, 3)).toBe(.291);
        // k = 3
        TraceUtils.info(`poissonProbabilityApproximation(3, 1) = .061`)
        value = poissonProbabilityApproximation(3, 1);
        expect(round(value, 3)).toBe(.061);
        // k = 4 floods
        TraceUtils.info(`poissonProbabilityApproximation(4, 1) = .015`)
        value = poissonProbabilityApproximation(4, 1);
        expect(round(value, 3)).toBe(.015);
        // k = 5 floods
        TraceUtils.info(`poissonProbabilityApproximation(5, 1) = .003`)
        value = poissonProbabilityApproximation(5, 1);
        expect(round(value, 3)).toBe(.003);
        // k = 6 floods
        TraceUtils.info(`poissonProbabilityApproximation(6, 1) = .0005`)
        value = poissonProbabilityApproximation(6, 1);
        expect(round(value, 4)).toBe(.0005);
    });

    it('should calculate greater than probability', () => {
        TraceUtils.info(`poissonProbabilityApproximation(250, 50)`)
        const value = poissonProbabilityApproximation(48, 50);
        expect(round(value, 3)).toBe(.055);
    });
});