import { FraudDetectorService, poissonProbabilityApproximation } from '../src/index';
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
        TraceUtils.info(`poissonProbabilityApproximation(1, 0) = .368`)
        let value = poissonProbabilityApproximation(1, 0);
        expect(round(value, 3)).toBe(.368);
        // k = 1
        TraceUtils.info(`poissonProbabilityApproximation(1, 1) = .368`)
        value = poissonProbabilityApproximation(1, 1);
        expect(round(value, 3)).toBe(.368);
        // k = 2
        TraceUtils.info(`poissonProbabilityApproximation(1, 2) = .184`)
        value = poissonProbabilityApproximation(1, 2);
        expect(round(value, 3)).toBe(.184);
        // k = 3
        TraceUtils.info(`poissonProbabilityApproximation(1, 3) = .061`)
        value = poissonProbabilityApproximation(1, 3);
        expect(round(value, 3)).toBe(.061);
        // k = 4 floods
        TraceUtils.info(`poissonProbabilityApproximation(1, 4) = .015`)
        value = poissonProbabilityApproximation(1, 4);
        expect(round(value, 3)).toBe(.015);
        // k = 5 floods
        TraceUtils.info(`poissonProbabilityApproximation(1, 5) = .003`)
        value = poissonProbabilityApproximation(1, 5);
        expect(round(value, 3)).toBe(.003);
        // k = 6 floods
        TraceUtils.info(`poissonProbabilityApproximation(1, 6) = .0005`)
        value = poissonProbabilityApproximation(1, 6);
        expect(round(value, 4)).toBe(.0005);
    });
});