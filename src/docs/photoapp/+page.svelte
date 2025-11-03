<script>
	export let data;
	import { base } from '$app/paths';
</script>

<h1 class="text-white">Devblog</h1>

<ul class="text-white">
	{#each data.posts as post}
		<li>
			<a href="{base}/photoapp/{post.slug}">
				{post.title} — {post.date}
			</a>
		</li>
	{/each}
</ul>