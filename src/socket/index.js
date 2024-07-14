import { io } from 'socket.io-client';

let base_url = "http://localhost:5000";
if (process.env.NODE_ENV === "production"){
    base_url = process.env.REACT_APP_API_URL;
}
else if (process.env.NODE_ENV === "development"){
    base_url = base_url;
}
const socketInit = () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(process.env.REACT_APP_API_URL, options);
};

export default socketInit;