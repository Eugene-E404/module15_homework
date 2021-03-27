function showTimeDate() {
	
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
		fetch(`https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${objCoords.latitude}&long=${objCoords.longitude}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			document.body.insertAdjacentHTML('beforeend', `
				<div>
					${data.timezone + '; ' + data.date_time_txt}
				</div>
			`);
		});
	})
	.catch((error) => {
		alert(error);
	});
}

document.querySelector('.btn').addEventListener('click', showTimeDate);