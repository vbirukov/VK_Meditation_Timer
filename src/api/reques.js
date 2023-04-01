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

const callYandexApi = async function ({endpoint, body}) {
    const response = await fetch(`https://d5dkgim47m3sjaq4k4s3.apigw.yandexcloud.net${endpoint ? '/' + endpoint : ''}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        let json = await response.json();
        console.log(JSON.stringify)
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
    return response;
}

export const updateLastTimer = function(userId, timerValue) {

    return callYandexApi({
        endpoint: 'setlasttimer',
        body: {
            $id: userId,
            $value: timerValue
        }
    });
}

const getConfig = async function (userId) {

    // TODO добавить в callYandexApi опцию GET запроса
    const response = await fetch('https://functions.yandexcloud.net/d4egmdhjt35ibg2b0ao5', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id: fetchedUser.id})
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    return response;
};

const createUserConfig = async function (user) {

    return callYandexApi({
        endpoint: 'user',
        body: {
            $id: user.id,
            $value: user.first_name + ' ' + user.last_name
        }
    });
}

export default fetchUser;
export {updateLastTimer, getConfig, createUserConfig};