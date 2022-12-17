<script lang="ts">
    import {
        slotSelectedStore,
        seatSelectedStore,
        dateSelectedStore,
        slotDataStore,
        userNameStore,
        rollNumStore,
    } from "./../stores/store";
    import { slotNumToString } from "./funcs";

    let seatSelected: string = "1";
    let slotSelected: string = "1";
    let dateSelected: string = "1";
    let userName: string;
    let rollNum: string;

    let slotData: { id: number; isTaken: boolean, isLoggedIn: boolean }[] = [
                { id: 1, isTaken: false , isLoggedIn:false},
                { id: 2, isTaken: false , isLoggedIn:false},
                { id: 3, isTaken: false , isLoggedIn:false},
                { id: 4, isTaken: false , isLoggedIn:false},
                { id: 5, isTaken: false , isLoggedIn:false},
                { id: 6, isTaken: false , isLoggedIn:false},
                { id: 7, isTaken: false , isLoggedIn:false},
                { id: 8, isTaken: false , isLoggedIn:false},
                { id: 9, isTaken: false , isLoggedIn:false},
                { id: 10, isTaken: false, isLoggedIn:false },
                { id: 11, isTaken: false, isLoggedIn:false },
                { id: 12, isTaken: false, isLoggedIn:false },
                { id: 13, isTaken: false, isLoggedIn:false },
                { id: 14, isTaken: false, isLoggedIn:false },
                { id: 15, isTaken: false, isLoggedIn:false },
            ];

    let idNum: string;

    const seatSelectedStoreUnsuscribe = seatSelectedStore.subscribe((val) => {
        seatSelected = val;
    });

    const slotSelectedStoreUnsuscribe = slotSelectedStore.subscribe((val) => {
        slotSelected = val;
    });

    const dateSelectedStoreUnsuscribe = dateSelectedStore.subscribe((val) => {
        dateSelected = val;
    });

    const slotDataStoreUnsuscribe = slotDataStore.subscribe((val) => {
        slotData = val.slice();
    });

    function userNameHandler() {
        userNameStore.set(userName);
    }

    function rollNumHandler() {
        rollNumStore.set(rollNum);
    }
</script>

<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title text-center">Booking Form</h5>
        {#if true}
            <br />
            <form action="post">
                <div class="mb-3">
                    <label for="inputEmail" class="form-label">Name</label>
                    <input
                        on:click={userNameHandler}
                        on:change={userNameHandler}
                        bind:value={userName}
                        type="text"
                        class="form-control"
                        id="inputEmail"
                        aria-describedby="name"
                    />
                    <br />
                    <label for="inputId" class="form-label">Id</label>
                    <input
                        on:click={rollNumHandler}
                        on:change={rollNumHandler}
                        bind:value={rollNum}
                        type="text"
                        class="form-control"
                    />
                    <br />
                    <label for="slotNum" class="form-label">Slot: </label>
                    {slotNumToString(slotSelected)}
                    <br />
                    <label for="date" class="form-label">Date: </label>
                    {dateSelected}
                    <br />
                    <label for="seatNum" class="form-label">Seat: </label>
                    {seatSelected}
                </div>
            </form>
        {:else}
            <label for="slotNum" class="form-label">Slot: </label>
            {slotNumToString(slotSelected)}
            <br />
            <label for="date" class="form-label">Date: </label>
            {dateSelected}
            <br />
            <label for="seatNum" class="form-label">Seat: </label>
            {seatSelected}
            <br />
            select a free seat and slot
        {/if}
    </div>
</div>
