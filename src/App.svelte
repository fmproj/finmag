<script>
  import stock from '../api/rint.json';
  import { knightApiRequest } from '../api/apiknight.js';

  let knight;
  let error;

  knightApiRequest('opposition agent')
    .then(data => {knight = data})
    .catch(err => {error = err});

</script>

<main>
  {#await knight}
  <p>Loading...</p>
  {:then fetchedData}
    {#if fetchedData}
      <p>Data: {fetchedData}</p>
    {:else}
      <p>{error}</p>
    {/if}
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
  <h1>Day</h1>
  {#each stock.interests.slice(0, 20) as interest}
    {#if interest.interest_type == 'day'}
      <p>{interest.print.name} [{interest.print.rarity}/{interest.print.set_name}]: {interest.present_price}$ / {interest.past_price}$ | {interest.percentage}%</p>
    {/if}
  {/each}
  <h1>Week</h1>
  {#each stock.interests.slice(0, 20) as interest}
    {#if interest.interest_type == 'week'}
      <p>{interest.print.name} [{interest.print.rarity}/{interest.print.set_name}]: {interest.present_price}$ / {interest.past_price}$ | {interest.percentage}%</p>
    {/if}
  {/each}
</main>