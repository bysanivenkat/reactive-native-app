import { useEffect, useState } from 'react';
import { getStepCount, initHealthKit } from '../services/healthService';

export const useHealthData = () => {
    const [steps, setSteps] = useState(0);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                await initHealthKit();
                setIsAuthorized(true);
                const stepCount = await getStepCount();
                setSteps(stepCount);
            } catch (error) {
                console.error('Error fetching health data:', error);
            }
        };

        fetchHealthData();
    }, []);

    return { steps, isAuthorized };
};
