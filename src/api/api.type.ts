export interface TFeeback {
	id: number;
	title: string;
	upvote: number;
	description: string;
	status: "in-progress" | "planned" | "live";
	category: "enhancement" | "feature" | "bug" | "ui" | "ux";
	created_at: string;
	comments_count: number;
	[key: string]: unknown;
}
