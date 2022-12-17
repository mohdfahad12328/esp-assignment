export {isSeatAvaliable, slotNumToString}
import { slotDataStore } from "./../stores/store";

function isSeatAvaliable(seat: string, slot: string):boolean {
    return false;
}

function fetchDataForSlot(seat: string, slot: string, date: string){
    let slotDataStoreUnsuscribe = slotDataStore.update(val => val);
}

function slotNumToString(slot: string): string{
    if(slot=="1")
    return "9AM - 10AM";
    else if(slot == "2")
    return "10AM - 11AM";
    else if(slot == "3")
    return "11AM - 12AM";
    else if(slot == "4")
    return "12AM - 1PM";
    else if(slot == "5")
    return "2PM - 3PM";
    else if(slot == "6")
    return "3PM - 4PM";
    else if(slot == "7")
    return "5PM - 6PM";
    else return ""
}