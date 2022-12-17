<script lang="ts">
    import Registration from "./../components/registration.svelte";
    import Seats from "./../components/seats.svelte";
    import {
        slotSelectedStore,
        seatSelectedStore,
        dateSelectedStore,
        slotDataStore,
        userNameStore,
        rollNumStore,
    } from "./../stores/store";

    import axios from "axios";

    let seats: { id: number; isTaken: boolean; isLoggedIn: boolean }[] = [
        { id: 1, isTaken: false, isLoggedIn: false },
        { id: 2, isTaken: false, isLoggedIn: false },
        { id: 3, isTaken: false, isLoggedIn: false },
        { id: 4, isTaken: false, isLoggedIn: false },
        { id: 5, isTaken: false, isLoggedIn: false },
        { id: 6, isTaken: false, isLoggedIn: false },
        { id: 7, isTaken: false, isLoggedIn: false },
        { id: 8, isTaken: false, isLoggedIn: false },
        { id: 9, isTaken: false, isLoggedIn: false },
        { id: 10, isTaken: false, isLoggedIn: false },
        { id: 11, isTaken: false, isLoggedIn: false },
        { id: 12, isTaken: false, isLoggedIn: false },
        { id: 13, isTaken: false, isLoggedIn: false },
        { id: 14, isTaken: false, isLoggedIn: false },
        { id: 15, isTaken: false, isLoggedIn: false },
    ];

    let seatSelect: string = "";
    let slotSelect: string = "";
    let dateSelect: string = "2022-12-03";
    let userName: string;
    let rollNum: string;

    let isError: boolean = false;
    let errorMsg: string = "";

    let serverUrl = "http://127.0.0.1:8000";

    const seatSelectUnscribe = seatSelectedStore.subscribe((value) => {
        seatSelect = value;
    });

    const rollNumStoreU = rollNumStore.subscribe((val) => (rollNum = val));
    const userNameStoreU = userNameStore.subscribe((val) => (userName = val));

    function onSlotChange() {
        slotSelectedStore.set(slotSelect);
    }

    function onDateChange() {
        dateSelectedStore.set(dateSelect);
    }

    async function onRefreshClicked() {
        dateSelectedStore.set(dateSelect);
        slotSelectedStore.set(slotSelect);

        if (slotSelect == undefined || dateSelect == undefined) {
            isError = true;
            errorMsg = "please select slot and seat and refresh";
        } else {
            isError = false;
        }
        const res = await axios(serverUrl + "/getSlotData", {
            method: "get",
            params: {
                slot: slotSelect,
                date: dateSelect,
            },
        });
        seats = res.data;
        slotDataStore.update((data) => [...seats]);
        console.log(seats);
    }

    async function onSubmitClicked() {
        onRefreshClicked();
        if ($slotDataStore[parseInt(seatSelect) - 1].isTaken || $slotDataStore[parseInt(seatSelect) - 1].isLoggedIn) {
            isError = true;
            errorMsg = "please select free slot and seat and submit";
            return;
        } else if (userName == undefined || rollNum == undefined || slotSelect == undefined) {
            isError = true;
            errorMsg = "please enter name, roll number and submit";
            return;
        } else {
            isError = false;
        }

        const res = await axios.post(serverUrl + "/bookSeatAndSlot", {
            date: dateSelect,
            slot: slotSelect,
            seat: seatSelect,
            name: userName,
            roll: rollNum,
        });
        console.log(res);
        onRefreshClicked();
    }
</script>

<div class="container-sm">
    <br />
    <form action="post">
        <div class="input-group mb-3">
            <select
                name="floatingSelect"
                bind:value={slotSelect}
                class="form-select mb-3"
                aria-label=".form-select-lg example"
                on:change={onSlotChange}
            >
                <option value="1">9AM - 10AM</option>
                <option value="2">10AM - 11AM</option>
                <option value="3">11AM - 12AM</option>
                <option value="4">12AM - 1PM</option>
                <option value="5">2PM - 3PM</option>
                <option value="6">3PM - 4PM</option>
                <option value="7">5PM - 6PM</option>
            </select>
            <input
                bind:value={dateSelect}
                on:change={onDateChange}
                class="form-control mb-3"
                type="date"
                name="dateSelectId"
                id="dateSelectId"
            />
        </div>
    </form>
    <div class="container row">
        <div class="col col-8">
            <div class="row">
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[0].isLoggedIn}
                        num={seats[0].id}
                        isTaken={seats[0].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[1].isLoggedIn}
                        num={seats[1].id}
                        isTaken={seats[1].isTaken}
                    />
                </div>
                <div class="col col-lg-2">
                    <Seats
                        isLoggedIn={seats[2].isLoggedIn}
                        num={seats[2].id}
                        isTaken={seats[2].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[3].isLoggedIn}
                        num={seats[3].id}
                        isTaken={seats[3].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[4].isLoggedIn}
                        num={seats[4].id}
                        isTaken={seats[4].isTaken}
                    />
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[5].isLoggedIn}
                        num={seats[5].id}
                        isTaken={seats[5].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[6].isLoggedIn}
                        num={seats[6].id}
                        isTaken={seats[6].isTaken}
                    />
                </div>
                <div class="col col-lg-2">
                    <Seats
                        isLoggedIn={seats[7].isLoggedIn}
                        num={seats[7].id}
                        isTaken={seats[7].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[8].isLoggedIn}
                        num={seats[8].id}
                        isTaken={seats[8].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[9].isLoggedIn}
                        num={seats[9].id}
                        isTaken={seats[9].isTaken}
                    />
                </div>
            </div>
            <br />
            <div class="row">
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[10].isLoggedIn}
                        num={seats[10].id}
                        isTaken={seats[10].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[11].isLoggedIn}
                        num={seats[11].id}
                        isTaken={seats[11].isTaken}
                    />
                </div>
                <div class="col col-lg-2">
                    <Seats
                        isLoggedIn={seats[12].isLoggedIn}
                        num={seats[12].id}
                        isTaken={seats[12].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[13].isLoggedIn}
                        num={seats[13].id}
                        isTaken={seats[13].isTaken}
                    />
                </div>
                <div class="col col-lg-1">
                    <Seats
                        isLoggedIn={seats[14].isLoggedIn}
                        num={seats[14].id}
                        isTaken={seats[14].isTaken}
                    />
                </div>
            </div>
        </div>
        <div class="container col">
            <Registration />
            <br />
            <div class="text-center" style="width: 80%;">
                <button
                    on:click={onSubmitClicked}
                    class="btn btn-primary btn-md">submit</button
                >
                <button
                    on:click={onRefreshClicked}
                    class="btn btn-outline-primary btn-md">refresh</button
                >
            </div>
        </div>
    </div>
    <br />
    <br />
</div>
{#if isError}
    <div class="alert alert-primary" role="alert">
        {errorMsg}
    </div>
{/if}
