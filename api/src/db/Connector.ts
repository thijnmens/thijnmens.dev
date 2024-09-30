import mysql from 'mysql';

/**
 * Handles the database connection, you should really only make one of these and use it across the application
 */
export default class Connector {
	connection: mysql.Connection;
	
	constructor() {
		this.connection = this.createConnection();
		this.connect();
	}

	/**
	 * Creates the connection, does not connect, to connect call `Connector.connect`
	 * 
	 * @see Connector.connect
	 */
	createConnection() {
		return mysql.createConnection({
			host: process.env.DB_HOST as string,
			user: process.env.DB_USER as string,
			password: process.env.DB_PASSWORD as string,
			database: process.env.DB_NAME as string,
		});
	}

	/**
	 * Connects to the database, to create a connection, call `Connector.createConnection`
	 * 
	 * @see Connector.createConnection
	 */
	connect() {
		this.connection.connect();
	}

	/**
	 * Ends the connection to the database
	 */
	disconnect() {
		this.connection.end();
	}

	/**
	 * Resets the connection with the database
	 */
	reconnect() {
		this.disconnect();
		this.connect();
	}
}
