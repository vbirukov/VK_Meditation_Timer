import bridge from '@vkontakte/vk-bridge';

const APP_ID = 7595020;

const fetchUser = async function() {
    const user = await bridge.send('VKWebAppGetUserInfo');
    this.setState({user});
    bridge.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": "friends"})
        .then((response) => {
            this.setState({token: response.access_token});
        }).catch((e) => {
        console.log(`error: ${e} `)
    });
}

export const updateLastTimer = function(userId, timerValue) {
    const response = fetch('https://d5dkgim47m3sjaq4k4s3.apigw.yandexcloud.net/setlasttimer', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            $id: userId,
            $value: timerValue,
        })
    }).then((result) => {
        if (!response.ok) { // если HTTP-статус в диапазоне 200-299
            console.log("Ошибка HTTP при отправке данных: " + response.status);
        }
    });
}

export default fetchUser;