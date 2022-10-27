/** @param base64String {string} */
function urlBase64ToUint8Array(base64String) {
	var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

	var rawData = self.atob(base64);
	var outputArray = new Uint8Array(rawData.length);

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

async function getServerKey() {
	let req = await fetch("https://api.unflai.red/get-server-key");
	let res = await req.text();
	return urlBase64ToUint8Array(res);
}
const saveSubscription = async (subscription) => {
	const response = await fetch("https://api.unflai.red/save-push", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(subscription),
	});
	return response.json();
};
self.addEventListener("activate", async () => {
	try {
		const applicationServerKey = await getServerKey();
		const options = { applicationServerKey, userVisibleOnly: true };
		const subscription = await self.registration.pushManager.subscribe(options);
		const response = await saveSubscription(subscription);
		console.log(response);
	} catch (err) {
		console.log("Error", err);
	}
});

self.addEventListener("push", function (event) {
	/** @type {{
		h1: string,
		body: string
	}} */
	console.log(event.data.text());
	let evtDetails = JSON.parse(event.data.text());
	self.registration.showNotification(evtDetails.h1, {
		body: evtDetails.body,
		data: eventDetails.href
	});
});

self.addEventListener("notificationclick", function (event) {
	const clickedNotification = event.notification;
	clickedNotification.close();
	if (event.notification.data) {
		const promiseChain = clients.openWindow(event.notification.data);
		event.waitUntil(promiseChain);
	}
});