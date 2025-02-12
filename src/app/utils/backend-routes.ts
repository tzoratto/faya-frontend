let url = process.env.API_URL || 'http://localhost:3000';

export const BACKEND_ROUTES = new function () {
    this.auth = {};
    this.auth.login = url + '/auth/login';
    this.auth.signup = url + '/auth/signup';
    this.auth.signupValidation = url + '/auth/signup-validation';
    this.auth.passwordReset = url + '/auth/password-reset';
    this.auth.passwordResetValidation = url + '/auth/password-reset-validation';

    this.setting = {};
    this.setting.subscription = url + '/setting/subscription';

    this.apiKey = {};
    this.apiKey.apiKey = url + '/api-key';
    this.apiKey.instance = id => this.apiKey.apiKey + '/' + id;

    this.api = {};
    this.api.user = {};
    this.api.user.user = url + '/api/user';
    this.api.user.instance = id => this.api.user.user + '/' + id;

    this.api.namespace = {};
    this.api.namespace.namespace = url + '/api/namespace';
    this.api.namespace.count = this.api.namespace.namespace + '/count';
    this.api.namespace.instance = id => this.api.namespace.namespace + '/' + id;

    this.api.check = url + '/api/check';

    this.api.token = {};
    this.api.token.token = url + '/api/token';
    this.api.token.count = this.api.token.token + '/count';
    this.api.token.instance = id => this.api.token.token + '/' + id;

    this.api.token.history = id => this.api.token.instance(id) + '/history';
    this.api.token.history.year = id => this.api.token.history(id) + '/year';
    this.api.token.history.month = id => this.api.token.history(id) + '/month';
    this.api.token.history.day = id => this.api.token.history(id) + '/day';
};
