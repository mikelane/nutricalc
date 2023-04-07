<script lang="ts">


  import {isHyperpalatable} from "./hyperpalatability-calculator";
  import type {HyperpalatableResponse} from "./hyperpalatability-calculator";
  import type {Food} from "./hyperpalatability-calculator";

  /**
   * Set some default values for the form.
   */
  let food: Food = {
    name: 'Quarter Pounder with Cheese',
    brand: "McDonald's",
    servingWeight: 220,
    calories: 530,
    totalCarbohydrates: 39,
    totalSugars: 10,
    totalFat: 28,
    sodium: 1100
  };

  export let result: HyperpalatableResponse;

  const handleSubmit = async () => {
    console.log(JSON.stringify(food));
    result = isHyperpalatable(food);
    console.log(result);
  };

  interface FormData {
    [labelKey: string]: { forValue: string; labelValue: string; type: string }
  }

  let formData: FormData = {
    name: {forValue: 'name', labelValue: 'Food Name (optional):', type: 'text'},
    brand: {forValue: 'brand', labelValue: 'Food Brand (optional):', type: 'text'},
    servingWeight: {forValue: 'servingWeight', labelValue: 'Serving Weight (g):', type: 'number'},
    calories: {forValue: 'calories', labelValue: 'Calories:', type: 'number'},
    totalCarbohydrates: {forValue: 'totalCarbohydrates', labelValue: 'Carbohydrates (g):', type: 'number'},
    totalSugars: {forValue: 'totalSugars', labelValue: 'Sugar (g):', type: 'number'},
    totalFat: {forValue: 'totalFat', labelValue: 'Fat (g):', type: 'number'},
    sodium: {forValue: 'sodium', labelValue: 'Sodium (mg):', type: 'number'}
  }

</script>

<form class="grid grid-cols-1" on:submit|preventDefault={handleSubmit}>
    {#each Object.keys(formData) as labelKey}
        <div class="grid grid-cols-2 content-center my-1">
            <label for={formData[labelKey].forValue} class="text-xs m-1 text-right font-bold">{formData[labelKey].labelValue}</label>
            {#if formData[labelKey].type === 'text'}
                <input id={formData[labelKey].forValue} type='text' bind:value={food[labelKey]}
                       class="p-1 border-2 border-gray-400 rounded-md shadow-md focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"/>
            {:else}
                <input id={formData[labelKey].forValue} type='number' bind:value={food[labelKey]}
                       class="p-1 border-2 border-gray-400 rounded-md shadow-md focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-xs"/>
            {/if}
        </div>
    {/each}
    <button type="submit"
            class="cursor-pointer bg-blue-700 m-2 p-2 rounded-md shadow-md border-slate-800 border-2 text-gray-100 font-bold 2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-sm text-xs">
        Calculate
    </button>
</form>
