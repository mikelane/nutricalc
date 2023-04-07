<script lang="ts">
  export let result;
</script>

{#if result === undefined || result === null}
    <div class="text-center h-full p-[2rem] text-sm font-bold">
        Please enter the food information in the form
    </div>
{:else}
    <h1 class="pt-5 text-center font-extrabold leading-none tracking-tight text-gray-900 text-xl">{result.name}</h1>
    {#if result.isHyperpalatable}
        <div class="font-extrabold underline text-center text-red-500 leading-none tracking-tight uppercase py-5">
            This food is hyperpalatable
        </div>
    {:else}
        <div class="font-extrabold underline text-center text-green-500 leading-none tracking-tight py-5">
            This food is <em>NOT</em> hyperpalatable
        </div>
    {/if}
    <ul class="list-disc pl-[2rem] pr-[1rem]">
    {#each result.notes as note}
        <li class="text-sm font-bold">
            {note}
        </li>
    {/each}
    </ul>
{/if}