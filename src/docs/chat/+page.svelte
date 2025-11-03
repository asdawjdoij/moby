<script>
import ElizaBot from 'elizabot';

const eliza = new ElizaBot();

var chat = [{ user: 'Eliza', message: eliza.getInitial() }];

async function write(message) {
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 1000));
}

</script>

<main class="flex justify-center p-[10px] w-[60vw] h-[70vh]">
<section class="w-[90%] overflow-y-scroll">
<article class="m-[10px] p-[10px] radius-[10px] bg-stone-800 w-[90%]">
<p>${chat}</p></article>
</section>
<form  method="post"
    use:enhance={({ formElement, formData, action, cancel }) => {
      cancel(); //don't post anything to server
      const text = formData.get("text"); // what does "text" refer to?
      write(text);
      }}>
<input>
</form>
</main>