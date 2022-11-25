import React, { useCallback, useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, platform, ScreenSpinner} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Home from '../../panels/home/home';
// import fetchUser from '../../api/reques';

// 84 strings
// TODO: УБрать APP_ID в Env
// TODO: Добавить возможность создавать промежуточные сигналыъ
// TODO: ДОбавить звуковое сопровождение
// TODO: Поправить баг с конпкой reset

function App() {

	const [vkResponse, setVkResponse] = useState();
	const [activePanel, setActivePanel] = useState('home');
	const [activeModal, setActiveModal] = useState();
	const [platform] = useState(platform())
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe((response) => {bridgeEventManager(response)});
		fetchUser().then(() => {
			setPopout(null);
		});
	}, []);

	const getConfig = async function () {

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

	// todo: move to api
	const APP_ID = 7595020;
	const fetchUser = async function() {
		const user = await bridge.send('VKWebAppGetUserInfo');
		setState({...state, user});
		bridge.send("VKWebAppGetAuthToken", {"app_id": APP_ID, "scope": "friends"})
			.then((response) => {
				setState({...state, token: response.access_token});
			}).catch((e) => {
			console.log(`error: ${e} `)
		});
	}

	const bridgeEventManager = (response) => {
		if (response.detail.type === 'VKWebAppUpdateConfig') {
			const schemeAttribute = document.createAttribute('scheme');
			schemeAttribute.value = response.detail.data.scheme ? response.detail.data.scheme : 'client_light';
			document.body.attributes.setNamedItem(schemeAttribute);
		}
		if (response.detail.type === 'VKWebAppGetAuthTokenResult') {
			setState({...state, token: response.detail.token});
			console.log(`token set: ${state.token}`);
		}
		if (response.detail.type === 'VKWebAppCallAPIMethodResult') {
			setVkResponse(response.detail.data)
		}
	}

	const goToPanel = (e) => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		// todo: add props modal={modal}
		<View  activePanel={activePanel} popout={popout}>
			<Home
				id='home'
				fetchedUser={user}
				showInput={() => {
					setState({...initialState, activeModal: 'timeInputTest'})
				}}
				go={goToPanel} />
		</View>
	);
}

export default App;