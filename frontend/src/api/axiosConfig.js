import axios from 'axios';
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return "";
};

export default axios.create({

    baseURL:'http://localhost:8080',
    headers: {"ngrok-skip-browser-warning" :"true",'username':getCookie('username')}
}
);