import { io } from 'socket.io-client';

import { socket, activeUserIds, USAGE_POOL } from '$lib/stores';
import { WEBUI_BASE_URL } from '$lib/constants';
import { URL_PREFIX } from '$lib/constants';
import { browser, dev } from '$app/environment';

export const setupSocket = async (enableWebsocket) => {
	console.log('setupSocket', enableWebsocket, WEBUI_BASE_URL);
	var socket_addr = '';
	if (dev) {
		socket_addr = getWebSocketAddr(WEBUI_BASE_URL);
	} else {
		socket_addr = getWebSocketAddr(window.location.href);
	}
	console.log('connect socket_addr = ', socket_addr);
	const _socket = io(`${socket_addr}` || undefined, {
	// const _socket = io(`${WEBUI_BASE_URL}` || undefined, {
		reconnection: true,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 5000,
		randomizationFactor: 0.5,
		path: URL_PREFIX + '/ws/socket.io',
		transports: enableWebsocket ? ['websocket'] : ['polling', 'websocket'],
		auth: { token: localStorage.token }
	});

	await socket.set(_socket);

	_socket.on('connect_error', (err) => {
		console.log('websocket_connect_error', err);
	});

	_socket.on('connect', () => {
		console.log('websocket_connected', _socket.id);
	});

	_socket.on('reconnect_attempt', (attempt) => {
		console.log('websocket_reconnect_attempt', attempt);
	});

	_socket.on('reconnect_failed', () => {
		console.log('websocket_reconnect_failed');
	});

	_socket.on('disconnect', (reason, details) => {
		console.log(`Web_Socket ${_socket.id} disconnected due to ${reason}`);
		if (details) {
			console.log('websocket_Additional details:', details);
		}
	});

	_socket.on('user-list', (data) => {
		console.log('websocket_user-list', data);
		activeUserIds.set(data.user_ids);
	});

	_socket.on('usage', (data) => {
		console.log('websocket_usage', data);
		USAGE_POOL.set(data['models']);
	});
};

export const getWebSocketAddr = (url: string) => {
  var schema = "http";
  var host = "localhost"; 
  var port = "8080";
  try {
    const parsedURL = new URL(url);
	if (parsedURL.protocol) {
		schema = parsedURL.protocol.slice(0, -1);
	}
	if (parsedURL.hostname) {
		host = parsedURL.hostname;
	}
	if (parsedURL.port) {
		port = parsedURL.port;
	}
  } catch (error) {
    console.error("parse url error: ", error);
  }
  return `${schema}://${host}:${port}`;
};
