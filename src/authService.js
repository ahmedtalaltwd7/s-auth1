import createAuth0Client from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen } from './store.js';
import config from './auth_config.js';
// @ts-ignore
async function createClient() {
	// @ts-ignore
	let auth0Client = await createAuth0Client({
		domain: config.domain,
		client_id: config.clientId
	});

	return auth0Client;
}

// @ts-ignore
async function loginWithPopup(client, options) {
	popupOpen.set(true);
	try {
		await client.loginWithPopup(options);

		user.set(await client.getUser());
		isAuthenticated.set(true);
	} catch (e) {
		// eslint-disable-next-line
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

// @ts-ignore
function logout(client) {
	return client.logout();
}

const auth = {
	createClient,
	loginWithPopup,
	logout
};

export default auth;
