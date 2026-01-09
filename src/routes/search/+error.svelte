<script>
	import { page } from '$app/stores';
</script>

<section>
	<h1>Du sökte efter: {$page.params.slug}</h1>
	<hr />
	<h2>{$page.status}: {$page.error.message}</h2>
</section>