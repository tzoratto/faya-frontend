let url = process.env.API_URL || 'http://localhost:3000';

export const BACKEND_ROUTES = {
    'auth': {
        'login': url + '/auth/login',
        'logout': url + '/auth/logout',
        'signup': url + '/auth/signup',
        'signupValidation': url + '/auth/signup-validation',
        'facebook': url + '/auth/facebook',
        'twitter': url + '/auth/twitter',
        'google': url + '/auth/google',
        'facebookCallback': url + '/auth/facebook/callback',
        'twitterCallback': url + '/auth/twitter/callback',
        'googleCallback': url + '/auth/google/callback',
        'localUnlink': url + '/auth/unlink/local',
        'facebookUnlink': url + '/auth/unlink/facebook',
        'twitterUnlink': url + '/auth/unlink/twitter',
        'googleUnlink': url + '/auth/unlink/google'
    },
    'setting': {
        'subscription': url + '/setting/subscription'
    }
};
