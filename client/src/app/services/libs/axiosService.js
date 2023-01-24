import axios from 'axios';
import FuseUtils from '@fuse/FuseUtils';
import jwtService from './jwtService';
import * as userService from '../axios/users/users.service';

class axiosService extends FuseUtils.EventEmitter {
    init() {
        console.log('AxiosService init();');
        this.setInterceptors();
    }

    setInterceptors = () => {
        axios.interceptors.request.use(config => {
            console.log(config);
            config.headers = {
                ...config.headers,
                ...jwtService.getAuthHeaders()
            };
            return config;
        });
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    // if you ever get an unauthorized response, logout the user
                    jwtService.emit('onAutoLogout', 'Invalid access_token');
                    jwtService.setSession(null);
                }
                throw err;
            });
        });
    };

    signInWithEmailAndPassword = userService.login;
    signInWithToken = userService.loginWithToken;
    forgetPassword = userService.forgetPassword;
    resetPassword = userService.resetPassword;

    setUserId = (uid) => {
        if (uid) {
            localStorage.setItem('tkr_userid', uid);
        } else {
            localStorage.removeItem('tkr_userid');
        }
    };
    
    getUserId = () => {
        return window.localStorage.getItem('tkr_userid');
    };
    
    cleanLocalStorage = () => {
        this.setUserId(null);
    };

    checkToken = userService.login;

    handleErros = (errors) => {
        // TODO
    };
}

const instance = new axiosService();

export default instance;
