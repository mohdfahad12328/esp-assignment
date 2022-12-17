<script lang="ts">
    export let isLoggedIn: boolean;
    export let isTaken: boolean;
    export let num: number;

    import {  slotDataStore ,seatSelectedStore } from "./../stores/store";

    function seatSelectHandler(e: MouseEvent) {
        seatSelectedStore.set(num.toString());
    }
    
</script>

{#if isTaken && isLoggedIn}
    <button class="b" on:click={seatSelectHandler}>
        <div class="card text-bg-danger" style="width: 4rem;">
            <div class="card-body">
                <h6 class="card-text text-center">{num}</h6>
            </div>
        </div>
    </button>
{:else if isTaken}
<button class="b" on:click={seatSelectHandler}>
    <div class="card text-bg-warning" style="width: 4rem;">
        <div class="card-body">
            <h6 class="card-text text-center">{num}</h6>
        </div>
    </div>
</button>
{:else}
    <button class="b" on:click={seatSelectHandler}>
        <div class="card text-bg-success" style="width: 4rem;">
            <div class="card-body">
                <h6 class="card-text text-center">{num}</h6>
            </div>
        </div>
    </button>
{/if}

<style>
    .b {
        background: transparent;
        border: none !important;
        font-size: 0;
    }
</style>
