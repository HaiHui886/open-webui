<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { URL_PREFIX } from '$lib/constants';

	onMount(() => {
		goto('/admin/functions/create');
	});
</script>
