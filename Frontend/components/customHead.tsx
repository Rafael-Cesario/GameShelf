import Head from 'next/head';

export const CustomHead = () => {
	return (
		<Head>
			<title>GameShelf</title>
			<meta name="description" content="GameShelf is a website to save the games you play." />
			<meta name="author" content="Rafael Cesário" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="shortcut icon" href="favicon/favicon.ico" type="image/x-icon" />
			<link href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
			<meta charSet="UTF-8" />
		</Head>
	);
};
