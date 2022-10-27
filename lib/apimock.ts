let t50c: null | {
	reddit_username: string;
	score: number;
}[];

export default async function getTop50() {
	if (t50c) {
		return t50c;
	}
	let apiReq = await fetch('https://api.unflai.red/');
	let apiRes = await apiReq.json();
	t50c = apiRes;
	return apiRes;
}