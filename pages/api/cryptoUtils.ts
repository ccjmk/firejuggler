import { createHmac } from 'crypto';

export function hash(key: string) {
    const secret = 'abcdefg';
    const hash = createHmac('sha256', secret)
        .update(key)
        .digest('hex');
    console.log(hash);
    return hash;
}

export function validate(key: string) {
    console.log("on validate..");
}