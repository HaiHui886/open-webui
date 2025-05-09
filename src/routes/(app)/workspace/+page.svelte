<script lang="ts">
	import { URL_PREFIX } from '$lib/constants';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user?.role !== 'admin') {
			if ($user?.permissions?.workspace?.models) {
				goto(URL_PREFIX + '/workspace/models');
			} else if ($user?.permissions?.workspace?.knowledge) {
				goto(URL_PREFIX + '/workspace/knowledge');
			} else if ($user?.permissions?.workspace?.prompts) {
				goto(URL_PREFIX + '/workspace/prompts');
			} else if ($user?.permissions?.workspace?.tools) {
				goto(URL_PREFIX + '/workspace/tools');
			} else {
				goto(URL_PREFIX + '/');
			}
		} else {
			goto(URL_PREFIX + '/workspace/models');
		}
	});
</script>
