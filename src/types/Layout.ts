import Tag from './Tag.ts';

interface Layout {
	name: string;
	description: string;
	tags: Tag[];
	image: string;
	source: string;
	download: string;
}

export default Layout;
