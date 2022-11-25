import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/home/home';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
				bridge.send("VKWebAppGetAuthToken", {"app_id": Number(data.app_id), "scope": "friends,photos"})
					.then((responseAuth) => {
						setToken(responseAuth.access_token);
						getConfig();
					}).catch((e) => {
					console.log(`error: ${e} `)
				});
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
			return user;
		}

		fetchData().then((user) => {
			getConfig(user.id).then((userConfig) => {
				if (!userConfig) {
					createUserConfig(user);
				}
			});
		});
	}, []);

	const getConfig = async function (userId) {

		const response = await fetch(`https://d5dkgim47m3sjaq4k4s3.apigw.yandexcloud.net/user?id=${userId}`);

		if (response.ok) { // если HTTP-статус в диапазоне 200-299
			let json = await response.json();
			return json[0];
		} else {
			alert("Ошибка HTTP: " + response.status);
			return null;
		}
	};

	const createUserConfig = async function (user) {
		const response = await fetch('https://d5dkgim47m3sjaq4k4s3.apigw.yandexcloud.net/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				$id: user.id,
				$name: user.first_name + ' ' + user.last_name,
			})
		});

		if (response.ok) { // если HTTP-статус в диапазоне 200-299
			let json = await response.json();
			console.log(JSON.stringify)
		} else {
			alert("Ошибка HTTP: " + response.status);
		}
		return response;
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
		setState({...state, activePanel: e.currentTarget.dataset.to});
	};

	return (
		// todo: add props modal={modal}
		<View  activePanel={activePanel} popout={popout}>
			<Home
				id='home'
				user={fetchedUser}
				fetchedUser={fetchedUser}
				showInput={() => {
					setState({...initialState, activeModal: 'timeInputTest'})
				}}
				go={goToPanel} />
		</View>
	);
}

export default App;
