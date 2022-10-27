import s from './footer.module.css';
import { useEffect, useState } from 'react';
const regSteps = async () => {
	try {
		await askPermission()
		await navigator.serviceWorker.register("/service-worker.js");
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}
function askPermission() {
	return new Promise(function (resolve, reject) {
		const permissionResult = Notification.requestPermission(function (result) {
			resolve(result);
		});

		if (permissionResult) {
			permissionResult.then(resolve, reject);
		}
	}).then(function (permissionResult) {
		if (permissionResult !== "granted") {
			throw new Error("We weren't granted permission.");
		}
	});
}
export default function Footer() {
	const [isUnsupported, sIU] = useState(false);
	const [worked, sW] = useState(false);
	const [working, setWorking] = useState(false);
	useEffect(() => {
		navigator.serviceWorker.getRegistration().then(reg => {
			if (reg) {
				sW(true)
			}
		});
		if (!("serviceWorker" in navigator) || !("PushManager" in window) ) {
			// Service Worker isn't supported on this browser, hide UI.
			sIU(true);
			return;
		}
	}, []);
	if (isUnsupported) {
		return <div className={s.unsupported} />
	}
	return (
		<div className={s.main}>
			<button
				disabled={worked}
				onClick={() => {
					if (worked) return;
					(async () => {
						if (worked) return;
						setWorking(true);
						let didWork = await regSteps();
						setWorking(false);
						sW(didWork);
					})();
				}}
			>Join{working ? 'ing' : ''}{worked && !working ? 'ed' : ''} the Unflaired Bullying Gang</button>
		</div>
	);
}