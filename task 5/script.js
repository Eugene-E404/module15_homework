let websocket = new WebSocket('wss://echo.websocket.org');

websocket.onopen = () => {
	console.log('Соединение с echo.websocket открыто');
};
websocket.onerror = (error) => {
	console.log('Ошибка соеднения с echo.websocket:', error);
};
websocket.onclose = () => {
	console.log('Соединение с echo.websocket закрыто');
};
websocket.onmessage = (dataSrv) => {
	displayChat(undefined, dataSrv.data);
};

function displayChat(massageClint, massageServer) {
	if (massageClint) {
		document.body.insertAdjacentHTML('beforeend', `
			<p style="margin-left: 200px; color: red;">${massageClint}</p>
		`);
	} else if (massageServer) {
		document.body.insertAdjacentHTML('beforeend', `
			<p style="color: blue;">${massageServer}</p>
		`);	
	};
}

function sendMassege() {
	let massage = document.querySelector('#massageChat').value;
	
	displayChat(massage, undefined);
	websocket.send(massage);
}

function getGeo () {
	let promise = new Promise((resolve, reject) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const {coords} = position;
					let latitude = coords.latitude;
					let longitude = coords.longitude;
					let objCoords = {
						'latitude': latitude,
						'longitude': longitude						
					}

					resolve(objCoords);
				},
				(errorPosition) => {
					reject(`Информация о местоположении недоступна: ${errorPosition.message}`);
				}
			);
		} else {
			reject('Информация о местоположении недоступна: геолокация не поддерживается');
		}
	});
	
	promise
	.then((objCoords) => {
		let geo = `<a href="https://www.openstreetmap.org/#map=18/${objCoords.latitude}/${objCoords.longitude}" target="_blank">Гео-локация</a>`;
		displayChat(geo, undefined);
	})
	.catch((error) => {
		displayChat(error, undefined);
	});
}

document.querySelector('#btnSend').addEventListener('click', sendMassege);
document.querySelector('#btnGeo').addEventListener('click', getGeo);
