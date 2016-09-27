let url = process.env.API_URL || 'http://localhost:3000';

export const BACKEND_ROUTES = {
    'auth': {
        'login': url + '/auth/login',
        'signup': url + '/auth/signup',
        'signupValidation': url + '/auth/signup-validation'
    },
    'setting': {
        'subscription': url + '/setting/subscription'
    }
};
