import 'react-native-gesture-handler/jestSetup';

jest.mock('@react-native-firebase/firestore', () => {
    return jest.fn().mockImplementation(() => ({
        collection: () => ({
            add: jest.fn(),
            get: () => ({
                then: jest.fn(),
            }),
            where: () => ({
                get: () => ({
                    then: jest.fn(),
                })
            }),
        })
    }));
});
jest.mock('@react-native-firebase/auth', () => {
    return jest.fn().mockImplementation(() => ({
        currentUser: {email: 'email@email.com'},
        signOut: jest.fn(),
    }));
});

jest.mock('react-native-date-picker', () => 'mockDatePicker');

jest.mock('react-native-vector-icons/MaterialIcons', () => 'mockIcon');

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => {
            return {
                navigate: jest.fn(),
            };
        },
    };
});
