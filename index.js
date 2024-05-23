/*
Challenge:
Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    appendItemToshoppingListEl(inputValue)
   // console.log(inputValue)

})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToshoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}