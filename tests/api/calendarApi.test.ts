import {calendarApi} from '../../src/api/calendarApi'

describe('Test in CalendarApi', () => { 
    test('should have default config', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })

    test('should have x-token in all the requests', async () => {
        const token = 'ABC123';
        localStorage.setItem('token', token);
        const res = await calendarApi.get('/auth');
        expect(res.config.headers['x-token']).toBe(token);
    });
 })