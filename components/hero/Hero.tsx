import type { UnflairedUser } from '$lib/types';

import React, { FunctionComponent } from 'react';
import styles from './hero.module.css';

const crimes = [
	"CRIMES AGAINST HUMANITY",
	"BATTERY",
	"KIDNAPPING",
	"FIRST DEGREE MURDER",
	"GRAND THEFT AUTO",
	"TREASON",
	"MANSLAUGHTER",
	"SECOND DEGREE MURDER",
	"HOMICIDE",
	"ARSON",
	"BURGLARY",
	"EMBEZZLEMENT",
	"LARCENY",
	"ROBBERY",
	"THEFT",
	"EXTORTION",
	"OBSTRUCTION OF JUSTICE",
	"PERJURY",
	"AGGRAVATED ASSAULT",
	"RESISTING ARREST",
	"ASSAULT",
	"BLACKMAIL",
	"BRIBERY",
	"COMPUTER CRIME",
	"CONTROLLED SUBSTANCES",
	"DISTURBANCE OF THE PEACE",
	"DRUG ABUSE",
	"LOOTING",
	"PIRACY",
	"PROSTITUTION",
	"RACISM",
	"RACKETEERING",
	"SOLICITATION",
	"STALKING",
	"TERRORISM",
];

const Hero: FunctionComponent<{
	worstOffender?: UnflairedUser
}> = ({ worstOffender }) => {
	return (
		<div className={styles.wanted}>
			<div className={styles.left}>
				<hr />
				<div className={styles.align}>
					<h1>WANTED</h1>
					<h2 className={styles.big}>CRINGE OR BASED</h2>
				</div>
				<p className={styles.wantedFor}>
					<em>for</em>{" "}
					{crimes.map((crime) => (
						<React.Fragment key={crime}>
							<span>{crime}, </span>{" "}
						</React.Fragment>
					))}
					<br />
				</p>
				<p className={styles.end}>
					<em>and </em>
					<strong>{worstOffender?.score ?? "many"} INSTANCES OF UNFLAIRED-POSTING</strong>
				</p>
				<hr />
			</div>
			<div className={styles.right}>
				{worstOffender ? <img src={`https://api.unflai.red/uimg/${worstOffender.reddit_username}`} /> : null}
				<h3>
					<a href={`//reddit.com/u/${worstOffender?.reddit_username ?? ""}`}>{worstOffender?.reddit_username ?? ""}</a>
				</h3>
			</div>
		</div>
	);
}

export default Hero;