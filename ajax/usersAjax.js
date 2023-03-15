// 주소에 쿼리스트링 받아오기
const queryString = new URLSearchParams(window.location.search);
const nameText = queryString.get('user-name');

// html name에 접근
const inputTextObjects = document.getElementsByName('user-name');
inputTextObject = inputTextObjects[0];

// input value 값 넣기
inputTextObject.value = nameText;

// 주소에 쿼리스트링 배열로 받기
const inputHiddenList = queryString.getAll('input-hidden');
const inputHidden = inputHiddenList[0];

const todoList = 1;

inputTextObject.focus();
inputTextObject.blur();

// const users = [];
const usersGet = sessionStorage.getItem('users');
const usersLogical = usersGet || '[]';
const users = JSON.parse(usersLogical);

const usersSet = function(){
    const usersSet = JSON.stringify(users);
    sessionStorage.setItem('users', usersSet);
    // window.location.reload();
};

const usersCreate = function(form) {
  const userNameObject = form['user-name'];
  const userAgeObject = form['user-age'];
  const user = {
    name: userNameObject.value,
    age: userAgeObject.value
  };
  const successFunction = function() {
    userNameObject.value = '';
    userAgeObject.value = '';
    usersRead();
  }
  const xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState !== 4) return;
    if (xhrObject.status === 200) {
      successFunction();
    } else {
      const error = {
        status: xhrObject.status,
        statusText: xhrObject.statusText,
        responseText: xhrObject.responseText
      }
      console.error(error);
    }
  };
  xhrObject.open('POST', 'http://localhost:3100/api/v1/users');
  xhrObject.setRequestHeader('Content-Type', 'application/json');
  xhrObject.send(JSON.stringify(user));
};
  const usersRead = function() {
    const tagDivParent = document.getElementById('tag-div-parent');
    tagDivParent.innerHTML = '';
    const tagDivChild = document.getElementById('tag-div-child');
    for (let index in users) {
      const newDivChild = tagDivChild.cloneNode(true); //cloneNode 함수는 똑같은 것을 복사하여 메모리에 저장, true는 하위요소까지 복사하겠다, 안쓰면 자신만 복사하겠다.
      tagDivParent.appendChild(newDivChild);

      const usersNameObject = document.getElementsByName('users-name')[index];
      const usersAgeObject = document.getElementsByName('users-age')[index];
      const usersUpdateObject = document.getElementsByName('users-update')[index];
      const usersDeleteObject = document.getElementsByName('users-delete')[index];
      usersNameObject.value = users[index].name;
      usersAgeObject.value = users[index].age;
      usersUpdateObject.index = index;
      usersDeleteObject.index = index;
    }
    console.log('Read', users);
    return users;
  };

usersRead();

const usersDelete = function(index) {
    users.splice(index, 1);
    usersSet();
    return usersRead();
};

const usersUpdate = function(index) {
    const name = document.getElementsByName('users-name')[index].value;
    const age = document.getElementsByName('users-age')[index].value;
    users[index] = {
      name: name,
      age: age
    };
    usersSet();
    return usersRead();
}