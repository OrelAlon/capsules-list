const usersApi = 'https://apple-seeds.herokuapp.com/api/users/';
let usersData = [];
let dataTable = document.querySelector('.dataTable');
// set  query + create
const set = (e) => document.querySelector(e);
const setAll = (e) => document.querySelectorAll(e);

// fetch data from api

async function getUsersData() {
  // try{
  let fetchData = await fetch(`${usersApi}`);
  fetchData = await fetchData.json();

  for (i = 0; i < fetchData.length; i++) {
    const userExtra = {};

    const fetchExtra = await fetch(
      'https://apple-seeds.herokuapp.com/api/users/' + i
    );
    const responseExtra = await fetchExtra.json();
    fetchData[i].age = responseExtra.age;
    fetchData[i].city = responseExtra.city;
    fetchData[i].gender = responseExtra.gender;
    fetchData[i].hobby = responseExtra.hobby;
    // }
  }
  usersData.push(fetchData);
  refreshTable(usersData);
}
///
///
///

// This function reflecs the array in the UI (table)
function refreshTable(usersData) {
  let dataTable = document.querySelector('.dataTable');
  // 1) Delete table content
  dataTable.innerHTML = '';
  //2) Create a line for each person-add id line
  usersData[0].forEach((person) => {
    infoDIv = document.createElement('div');

    infoDIv.setAttribute('class', 'infoDiv');
    infoDIv.setAttribute('data-key', person.id);
    infoDIv.innerHTML = `
    <td><p class = textContentId id= byId>${person.id}</p></td>
    <td><p class = textContent id= byFirst>${person.firstName}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byLast>${person.lastName}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byAge>${person.age}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byGender>${person.gender}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byCapsule>${person.capsule}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byCity>${person.city}</p><input type="text" class="inputField" hidden /></td>
    <td><p class = textContent id= byHobby>${person.hobby}</p><input type="text" class="inputField" hidden /></td>
    <td><button class="editBtn" id= byLast>Edit</button></td>
    <td><button class="deleteBtn" id= byLast>Delete</button></td>

    <td><button class="saveBtn" hidden>Save</button></td>

    <td><button class="cancelBtn" hidden>Cancel</button></td>
    `;
    dataTable.appendChild(infoDIv);
  });
  // console.log(dataTable);
}
/////handle all the event
dataTable.addEventListener('click', function (event) {
  // console.log(dataTable);
  //=============IF EDIT
  if (event.target.classList.contains('editBtn')) {
    findInfoEditEl(event.target.parentElement.getAttribute('data-key'));
  }
  //=============IF CANCEL

  if (event.target.classList.contains('cancelBtn')) {
    findInfoCancelEl(event.target.parentElement.getAttribute('data-key'));
  }
  //=============IF SAVE

  if (event.target.classList.contains('saveBtn')) {
    findInfoSaveEl(event.target.parentElement.getAttribute('data-key'));
  }
  //=============IF DELETE
  if (event.target.classList.contains('deleteBtn')) {
    findInfoDeleteEl(event.target.parentElement.getAttribute('data-key'));
  }
});

///////to the div!  ======OF CANCEL
function findInfoCancelEl(dataKey) {
  const taskEl = document.querySelector(`[data-key = '${dataKey}']`);
  handleCancelBtnClick(taskEl);
}
///////to the div!  ======OF EDIT

function findInfoEditEl(dataKey) {
  const taskEl = document.querySelector(`[data-key = '${dataKey}']`);
  handleEditBtnClick(taskEl);
}
///////to the div!  ======OF SAVE

function findInfoSaveEl(dataKey) {
  const taskEl = document.querySelector(`[data-key = '${dataKey}']`);
  handleSaveBtnClick(taskEl);
}
///////to the div!  ======OF SAVE
function findInfoDeleteEl(dataKey) {
  const taskEl = document.querySelector(`[data-key = '${dataKey}']`);
  handleDeleteBtnClick(taskEl);
}
//////HANDLE DELETE
const handleDeleteBtnClick = (taskEl) => taskEl.remove();

///////handle save
function handleSaveBtnClick(taskEl) {
  console.log('push save');
  taskEl.querySelector('.editBtn').hidden = false;
  taskEl.querySelector('.deleteBtn').hidden = false;
  //add btn
  taskEl.querySelector('.cancelBtn').hidden = true;
  taskEl.querySelector('.saveBtn').hidden = true;

  ////save new input
  lineTextContent = taskEl.querySelectorAll('.textContent');
  lineinputField = taskEl.querySelectorAll('.inputField');

  for (let i = 0; i < lineTextContent.length; i++) {
    lineTextContent[i].innerHTML = lineinputField[i].value;
    lineTextContent[i].hidden = false;
    lineinputField[i].hidden = true;
  }
}

//////HANDLE CANCEL
function handleCancelBtnClick(taskEl) {
  console.log('push cancel');
  //add btn

  taskEl.querySelector('.cancelBtn').hidden = true;
  taskEl.querySelector('.saveBtn').hidden = true;

  //remove btn
  taskEl.querySelector('.editBtn').hidden = false;
  taskEl.querySelector('.deleteBtn').hidden = false;

  ////cancel input
  lineTextContent = taskEl.querySelectorAll('.textContent');
  lineinputField = taskEl.querySelectorAll('.inputField');
  for (let i = 0; i < lineTextContent.length; i++) {
    // lineinputField[i].value = lineTextContent[i].innerHTML;
    lineTextContent[i].hidden = false;
    lineinputField[i].hidden = true;
  }
}
//////HANDLE EDIT

function handleEditBtnClick(taskEl) {
  console.log('edit push');
  //hide btn
  taskEl.querySelector('.editBtn').hidden = true;
  taskEl.querySelector('.deleteBtn').hidden = true;
  //add btn
  taskEl.querySelector('.cancelBtn').hidden = false;
  taskEl.querySelector('.saveBtn').hidden = false;
  //for each to alot of input
  lineTextContent = taskEl.querySelectorAll('.textContent');
  lineinputField = taskEl.querySelectorAll('.inputField');
  for (let i = 0; i < lineTextContent.length; i++) {
    lineinputField[i].value = lineTextContent[i].innerHTML;
    lineTextContent[i].hidden = true;
    lineinputField[i].hidden = false;
  }
}
//////////SELECT OPTION
(function () {
  // get references to select list and display text box
  const selectType = document.querySelector('#selectType');
  const searchInput = document.querySelector('.searchInput');

  // assign onclick handlers to the buttons
  searchInput.onkeyup = function () {
    filterByInput(selectType.value);
  };
})();

/////////////////FILTER FUNCCCC
function filterByInput(idOption) {
  console.log('acrive serch');
  console.log(idOption);
  let searchInput, filterInput, myData, everyLine, pInfo, i, txtValue;

  searchInput = document.querySelector('.searchInput');
  filterInput = searchInput.value.toUpperCase(); ////this input
  myData = document.querySelector('.dataTable');
  everyLine = myData.getElementsByTagName('div'); ///this div

  for (i = 0; i < everyLine.length; i++) {
    pInfo = everyLine[i].querySelector(`#${idOption}`);
    if (pInfo) {
      txtValue = pInfo.textContent || pInfo.innerText;
      if (txtValue.toUpperCase().indexOf(filterInput) > -1) {
        everyLine[i].style.display = '';
      } else {
        everyLine[i].style.display = 'none';
      }
    }
  }
}

///active function
async function runFunction() {
  await getUsersData().catch(handleErorr);
}
runFunction();
///// catch error
function handleErorr(error) {
  console.log(`CATCH error with:${error}`);
}
