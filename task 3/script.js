function clickBtn(){
	let messageGeo;
	
	let promise = new Promise((reject, resolve) => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const {coords} = position;
					let latitude = coords.latitude;
					let longitude = coords.longitude;
					messageGeo = `Долгота ${coords.longitude} / Широта ${coords.latitude}`;
					resolve();
				},
				(errorPosition) => {
					messageGeo = `Информация о местоположении недоступна: ${errorPosition.message}`;
					reject();
				}
			);
		} else {
			messageGeo = 'Информация о местоположении недоступна: геолокация не поддерживается';
			reject();
		}
	});
	
	promise.
	finally(() => {
		document.body.insertAdjacentHTML('beforeend', `
			<div>
				${'Размер экрана ' + window.screen.width + 'x' + window.screen.height + ' px'}
				<br>
				${messageGeo}
			</div>
		`);
	});
}

let btn = document.querySelector('.btn');
btn.addEventListener('click', clickBtn);





















































