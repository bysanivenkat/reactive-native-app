import AppleHealthKit, {
    HealthKitPermissions,
    HealthValue,
} from 'react-native-health';

const permissions: HealthKitPermissions = {
    permissions: {
        read: [
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.Steps,
            AppleHealthKit.Constants.Permissions.SleepAnalysis,
            AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            AppleHealthKit.Constants.Permissions.Workout,
        ],
        write: [],
    },
};

export const initHealthKit = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        AppleHealthKit.initHealthKit(permissions, (error: string) => {
            if (error) {
                console.log('[ERROR] Cannot grant permissions!');
                reject(error);
                return;
            }
            resolve();
        });
    });
};

export const getStepCount = (): Promise<number> => {
    return new Promise((resolve, reject) => {
        const options = {
            startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
        };
        AppleHealthKit.getStepCount(options, (err: Object, results: HealthValue) => {
            if (err) {
                return reject(err);
            }
            resolve(results.value);
        });
    });
};
