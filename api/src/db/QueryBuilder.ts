import { Tables } from './Tables.js';
import { ForeignKeys } from './ForeignKeys.js';
import IEntity from './entities/IEntity.js';
import { Connection, RowDataPacket } from 'mysql2/promise';

export default class QueryBuilder {
	connection: Connection;
	queryString: string;

	constructor(connection: Connection) {
		this.connection = connection
		this.queryString = "";
	}

	select(fields: (IEntity | string)[]): this {
		this.queryString += `SELECT ${fields.toString()} `;
		return this;
	}

	from(table: Tables): this {
		this.queryString += `FROM ${table} `;
		return this;
	}

	innerJoin(table: Tables, on: ForeignKeys): this {
		this.queryString += `INNER JOIN ${table} ON ${on} `
		return this;
	}

	rightJoin(table: Tables, on: ForeignKeys): this {
		this.queryString += `RIGHT JOIN ${table} ON ${on} `
		return this;
	}

	leftJoin(table: Tables, on: ForeignKeys): this {
		this.queryString += `LEFT JOIN ${table} ON ${on} `
		return this;
	}

	where(field: IEntity, value: string | number): this {
		this.queryString += `WHERE ${field} = '${value}' `
		return this;
	}

	async execute() {
		if (process.env.NODE_ENV === 'development') console.log(this.queryString);
		const [rows, _] = await this.connection.query<RowDataPacket[]>(this.queryString);
		this.queryString = "";
		return rows;
	}
}