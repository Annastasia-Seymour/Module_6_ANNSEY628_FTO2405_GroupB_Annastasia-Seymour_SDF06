/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push ,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings ={
    databaseURL:"https://realtime-database-4be1a-default-rtdb.asia-southeast1.firebasedatabase.app/"
} // note : always create your own project on firebase under Build/Realtime Database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)//accidentally put pushManager instead of push . kept getting errors
    shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    clearInputFieldEl()
    // refactor this inputFieldEl.value = ""to instead append "+=" 


})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.entries (snapshot.val())
    clearShoppingListEl()
    //shoppingListEl.innerHTML = ""
        for (let i = 0; i < itemsArray.length ; i++){
            let currentItem = itemsArray[i]
           
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItemValue)
        }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToshoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}