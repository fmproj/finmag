<script>
  import stock from '../api/rint.json';
</script>

<main>
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