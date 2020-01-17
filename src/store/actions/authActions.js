import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryTime')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const sessionExpired = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expireTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart())

        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAY9vbZqyg5dJmGmQPsldCy5wTZaC76ahg'

        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY9vbZqyg5dJmGmQPsldCy5wTZaC76ahg'
        }

        axios.post(url, authData)
            .then(response => {
                const expiryTime = new Date(new Date().getTime + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expiryTime', expiryTime)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(sessionExpired(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authRedirect = path => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogout())
        } else {
            const expiryTime = new Date(localStorage.getItem('expiryTime'))
            if(expiryTime > new Date()){
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                dispatch(sessionExpired(expiryTime.getSeconds() - new Date().getSeconds))
            }
        }
    }
}