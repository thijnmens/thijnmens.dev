import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

/**
 * Handles the database connection, you should really only make one of these and use it across the application
 */
export default class Connector {
	connection: mysql.Connection | undefined;

	constructor() {
		dotenv.config({
			path: './api/.env',
		});
	}
	
	/**
	 * Connects to the database, to create a connection, call `Connector.createConnection`
	 * 
	 * @see Connector.createConnection
	 */
	async connect() {
		this.connection = await mysql.createConnection({
			host: process.env.DB_HOST as string,
			user: process.env.DB_USER as string,
			password: process.env.DB_PASSWORD as string,
			database: process.env.DB_NAME as string,
		});
		this.connection.connect();
	}

	/**
	 * Ends the connection to the database
	 */
	async disconnect() {
		if (!this.connection) return;
		return this.connection.end()
	}

	/**
	 * Resets the connection with the database
	 */
	async reconnect() {
		await this.disconnect();
		await this.connect();
	}
}
