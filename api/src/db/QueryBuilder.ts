import mysql from 'mysql';
import util from 'util';
import { Tables } from './Tables.js';
import { ForeignKeys } from './ForeignKeys.js';
import IEntity from './entities/IEntity.js';
import Connector from './Connector.js';

export default class QueryBuilder {
	connector: Connector
	queryString: string;
	execute: (query: string | mysql.QueryOptions) => Promise<unknown>;

	constructor() {
		this.connector = new Connector()
		this.queryString = "";
		this.execute = util.promisify(this.connector.connection.query).bind(this.connector.connection);
		process.on('SIGINT', this.onExit)
		process.on('SIGTERM', this.onExit)
	}
	
	select(fields: IEntity[]): QueryBuilder {
		this.queryString += `SELECT ${fields.toString()} `;
		return this;
	}

	from(table: Tables): QueryBuilder {
		this.queryString += `FROM ${table} `;
		return this;
	}

	innerJoin(table: Tables, on: ForeignKeys): QueryBuilder {
		this.queryString += `INNER JOIN ${table} ON ${on} `
		return this;
	}

	rightJoin(table: Tables, on: ForeignKeys): QueryBuilder {
		this.queryString += `RIGHT JOIN ${table} ON ${on} `
		return this;
	}

	leftJoin(table: Tables, on: ForeignKeys): QueryBuilder {
		this.queryString += `LEFT JOIN ${table} ON ${on} `
		return this;
	}
	
	where(field: IEntity, value: string | number): QueryBuilder {
		this.queryString += `WHERE ${field} = '${value}' `
		return this;
	}
	
	build(): string {
		const query = this.queryString
		this.queryString = "";
		return query;
	}
	
	onExit() {
		this.connector.disconnect();
	}
}