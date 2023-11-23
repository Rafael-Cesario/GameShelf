/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},

	images: {
		remotePatterns: [
			{
				hostname: "media.rawg.io",
			},
		],
	},
};

module.exports = nextConfig;
