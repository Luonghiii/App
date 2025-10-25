import type { Account } from '../types';

export const initialAccounts: Account[] = [
    {
        id: 1,
        email: 'luonghiii@icloud.com',
        password_plain: 'Luong@07',
        nation: 'Việt Nam',
        flag: '🇻🇳',
        lastUpdate: new Date(),
        status: 'Work',
    },
    {
        id: 2,
        email: 'luonghii@icloud.com',
        password_plain: 'Luong@07',
        nation: 'USA',
        flag: '🇺🇸',
        lastUpdate: new Date(),
        status: 'Work',
    },
    {
        id: 3,
        email: 'ductien_n@icloud.com',
        password_plain: 'Truong@81',
        nation: 'Việt Nam',
        flag: '🇻🇳',
        lastUpdate: new Date(),
        status: 'Work',
    },
];
