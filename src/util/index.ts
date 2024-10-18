import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRequestStatusCount(status: string[]) {
	const statusTags = Array.from(new Set(status));

	const counts = status.reduce((obj, val) => {
		if (val in obj) {
			const value = obj[`${val}`];
			return { ...obj, [`${val}`]: value + 1 };
		} else {
			return { ...obj, [`${val}`]: 1 };
		}
	}, {} as { [key: (typeof statusTags)[number]]: number });
	return { tags: statusTags, counts };
}
