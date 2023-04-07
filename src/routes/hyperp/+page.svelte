<script lang="ts">
    import NutrientForm from "../../lib/NutrientForm.svelte";
    import Results from "../../lib/Results.svelte";
    let result;
</script>

<div class="w-[20rem] mx-auto">
    <h1 class="text-xl text-center font-extrabold p-2">Hyperpalatability Calculator</h1>
    <p class="my-[0.5rem] text-xs">
        This calculator helps you determine whether or not a given food is hyperpalatable.
        A food's hyperpalatability is based on ratios of fat and sodium, fat and sugar, and carbohydrates.</p>
    <p class="my-[0.5rem] text-xs">
        See the following paper for more information:
        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9672140/pdf/nihms-1808590.pdf" target="_blank"
           class="font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline">
            Change in hyper-palatable food availability in the US food system over 30 years: 1988–2018
        </a>
    </p>
    <NutrientForm bind:result />
    <Results bind:result />
</div>
