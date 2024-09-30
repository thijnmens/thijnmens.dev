import QueryBuilder from '../QueryBuilder.js';
import { Layouts } from '../entities/layouts.js';
import { Tags } from '../entities/tags.js';
import { Tables } from '../Tables.js';
import { ForeignKeys } from '../ForeignKeys.js';
import Connector from '../Connector.js';

export default class LayoutHandler {

	connector: Connector
	
	constructor() {
		this.connector = new Connector()
		this.connector.connect()
	}

	/**
	 * Get layout by its ID
	 * 
	 * @param id - Layout ID
	 */
	async getById(id: number | string): Promise<{id: number, name: string, description: string, source: string, tags: string[]} | undefined> {
		if (!this.connector.connection) return;
		
		// create query
		const result = await new QueryBuilder(this.connector.connection)
			.select([Layouts.id, Layouts.name, Layouts.description, Layouts.source, `${Tags.name} AS tag`])
			.from(Tables.layouts)
			.innerJoin(Tables.layouts_tags, ForeignKeys.layouts_tags__layouts)
			.rightJoin(Tables.tags, ForeignKeys.layouts_tags__tags)
			.where(Layouts.id, id)
			.execute();
		
		// If no layout with ID found, return
		if (!result || result.length === 0) return;
		
		return {
			id: result[0].id,
			name: result[0].name,
			description: result[0].description,
			source: result[0].source,
			tags: result.map((_) => _.tag)
		}
	}

	async getAll(): Promise<{id: number, name: string, description: string, source: string, tags: string[]}[] | undefined> {
		if (!this.connector.connection) return;

		// create query
		const result = await new QueryBuilder(this.connector.connection)
			.select([Layouts.id, Layouts.name, Layouts.description, Layouts.source, `${Tags.name} AS tag`])
			.from(Tables.layouts)
			.leftJoin(Tables.layouts_tags, ForeignKeys.layouts_tags__layouts)
			.leftJoin(Tables.tags, ForeignKeys.layouts_tags__tags)
			.execute();

		// If no layout with ID found, return
		if (!result || result.length === 0) return;
		
		const filteredResults: { [id: number]: {id: number, name: string, description: string, source: string, tags: string[]}}  = {};

		result.forEach((res) => {
			
			if (!filteredResults[res.id]) filteredResults[res.id] = {
				id: res.id,
				name: res.name,
				description: res.description,
				source: res.source,
				tags: []
			}
			
			if (res.tag != null) filteredResults[res.id].tags.push(res.tag);
		})
		
		return Object.values(filteredResults);
	}
}