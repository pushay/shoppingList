import * as functions from './functions';

let pair;
let list = []

const retrievedLocalStorage = functions.default.retrieveListFromLocalStorage()
if (retrievedLocalStorage && retrievedLocalStorage.length > 0){
    list = retrievedLocalStorage;
    functions.default.createList(list)
}

functions.default.countItems(list)

const button = document.getElementById('buttonId')

button.addEventListener("click", ()=> {
  const localStorageList = functions.default.retrieveListFromLocalStorage()
  pair = functions.default.getForm();

  if (pair) {
    localStorageList.push(pair)
    functions.default.clearList()
    functions.default.createList(localStorageList);
    functions.default.saveListOnLocalStorage(localStorageList)
    functions.default.countItems(localStorageList)
  }
})
document.getElementById('buttonId').setAttribute('disabled', 'true');