import 'dotenv/config';
import mongoose from 'mongoose';

const environment = process.env.NODE_ENV ?? '';
let uri = process.env.DATABASE ?? 'mongodb://127.0.0.1:27017/GameShelf';

if (environment === 'development') uri += '-Development';
if (environment === 'test') uri += '-Test';

export const startDatabase = async () => {
	try {
		mongoose.set('strictQuery', true);
		await mongoose.connect(uri);
		console.log(`✅ Database:\x1b[32m Database is running on ${environment || 'Production'} environment \x1b[0m`);
	} catch (error: any) {
		console.log(`❌\x1b[31m Error while trying to connect to database: ${error.message} \x1b[0m`);
	}
};
