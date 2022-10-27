import getTop50 from '$lib/apimock';
import { useEffect, useState } from 'react';
import s from './listings.module.css';
export default function Listings({ top }) {
	return (
		<div className={s.main}>
			<h1>Top 50 Most Wanted</h1>
			<ol>
				{top.map((unflaired, i) => (
					<li key={i}>
						<a href={`//reddit.com/u/${unflaired.reddit_username}`}>
							<span>{unflaired.reddit_username}</span>
							<img className={s.icon} src={`https://api.unflai.red/uimg/${unflaired.reddit_username}`} />
							<code>{unflaired.score} posts</code>
						</a>
					</li>
				))}
			</ol>
		</div>
	);
}