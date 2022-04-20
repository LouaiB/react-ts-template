/**
 * @description form validation rules for the app
 */


const Rules = {
    user: {
        email: {
            minLength: { 
                value: 3,
                message: 'email must be at least 3 characters long'
            }
        }
    }
}

export default Rules;