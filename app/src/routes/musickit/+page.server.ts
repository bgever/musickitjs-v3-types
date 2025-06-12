import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MUSICKIT_DEVELOPER_TOKEN } from '$env/static/private';

export const load: PageServerLoad = async () => {
	if (!MUSICKIT_DEVELOPER_TOKEN) {
		error(500, 'MusicKit developer token is not set.');
	}

	return {
		developerToken: MUSICKIT_DEVELOPER_TOKEN
	};
};
