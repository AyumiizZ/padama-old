import API from '@/services/Api.js'

export default {
    register (credentials){
        return API().post('register', credentials)
    },
    login (credentials){
        return API().post('login', credentials)
    }
}

// AuthenticationService.register({
//     email: 'aaa@gmail.com',
//     password: '1111'
// })