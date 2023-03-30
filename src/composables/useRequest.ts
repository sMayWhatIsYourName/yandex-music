import axios, { AxiosInstance } from 'axios';

export default function useRequest(): AxiosInstance {
    return axios.create({
        baseURL: 'https://api.music.yandex.net',
        headers: {
            'Accept-Language': 'ru',
            'Content-Type': 'application/json;charset=utf-8',
            'X-Yandex-Music-Client': 'YandexMusicAndroid/23020251',
            Authorization: `OAuth ${localStorage.getItem('token')}`
        }
    });
}
