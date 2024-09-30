import QueryBuilder from '../QueryBuilder.js';
import { Layouts } from '../entities/layouts.js';
import { Tags } from '../entities/tags.js';
import { Tables } from '../Tables.js';
import { ForeignKeys } from '../ForeignKeys.js';

export default class LayoutHandler {
	
	queryBuilder: QueryBuilder;
	
	constructor() {
		this.queryBuilder = new QueryBuilder()
	}
	
	async getById<T>(id: number | string): Promise<T | undefined> {
		const query = this.queryBuilder
			.select([Layouts.id, Layouts.name, Layouts.description, Layouts.source, Tags.name])
			.from(Tables.layouts)
			.innerJoin(Tables.layouts_tags, ForeignKeys.layouts_tags__layouts)
			.rightJoin(Tables.tags, ForeignKeys.layouts_tags__tags)
			.where(Layouts.id, id)
			.build();
		
		const a = await this.queryBuilder.execute(query)
		
		console.log(a)
		
		return;
	}
}