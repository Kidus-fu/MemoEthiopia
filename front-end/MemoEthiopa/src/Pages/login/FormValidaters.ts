export const validateUsernameEmail = (rule: any, value: string) => {
        rule
        if (!value) {
            return Promise.reject('Please input your username or email!');
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(value)) {
            return Promise.resolve();
        }
        if (value.length < 3) {
            return Promise.reject('Username must be at least 3 characters!');
        }
        return Promise.resolve();
};