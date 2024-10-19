export interface TFeedback {
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

export interface TComment {
	id: number;
	request_id: string;
	created_at: string;
	category: "enhancement" | "feature" | "bug" | "ui" | "ux";
	content: string;
	status: "in-progress" | "planned" | "live";
	author_id: string;
	parent_id: number;
	has_reply: boolean;
	[key: string]: unknown;
}

export interface TUser {
	id: string;
	email: string;
	username: string;
	name: string;
}
