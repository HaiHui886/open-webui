<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user?.role !== 'admin') {
			if ($user?.permissions?.workspace?.models) {
				goto('/endpoint/uivarpath/workspace/models');
			} else if ($user?.permissions?.workspace?.knowledge) {
				goto('/endpoint/uivarpath/workspace/knowledge');
			} else if ($user?.permissions?.workspace?.prompts) {
				goto('/endpoint/uivarpath/workspace/prompts');
			} else if ($user?.permissions?.workspace?.tools) {
				goto('/endpoint/uivarpath/workspace/tools');
			} else {
				goto('/endpoint/uivarpath/');
			}
		} else {
			goto('/endpoint/uivarpath/workspace/models');
		}
	});
</script>
