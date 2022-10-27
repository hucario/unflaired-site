import type { UnflairedUser } from "$lib/types";
import Hero from "$components/hero";
import Head from "next/head";
import Listings from "$components/listings";
import Footer from "$components/footer";
import { useEffect, useState } from "react";
import getTop50 from "$lib/apimock";

export async function getServerSideProps() {
	return {
		props: {
			Top50: await getTop50()
		}, // will be passed to the page component as props
	};
}

export default function Home({ Top50 }) {
	if (!Top50) {
		return;
	}
	return (
		<>
			<Head>
				<title>Unflaired Detector</title>
				<meta name="description" content="Flair up, filth!" />
			</Head>
			<Hero worstOffender={Top50[0]} />
			<Listings top={Top50} />
			<Footer />
		</>
	);
}
