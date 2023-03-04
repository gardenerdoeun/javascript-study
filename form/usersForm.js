// const users = [];
const usersGet = sessionStorage.getItem('users');
const usersLogical = usersGet || '[]';
const users = JSON.parse(usersLogical);

const usersSubmit = function(event, form) {
    const inputTextObject = form['input-text'];
    try {
      const evalReturn = eval(inputTextObject.value);
      // eval은 보안상문제로 쓰면안된다
      // JSON.parse는 함수호출에 해당되지않기에 eval 대신 쓰면 에러가 뜬다
      console.log(evalReturn);
    } catch(error) {
      console.error(error);
      alert(error);
      event.preventDefault();
    }
  };

const usersSet = function(){
    const usersSet = JSON.stringify(users);
    sessionStorage.setItem('users', usersSet);
    // window.location.reload();
};

const usersCreate = function(user) {
    users.push(user);
    usersSet();
    return 'Created';
};

const usersRead = function(){
    const tagPre = document.getElementById('tag-pre');
for (let index in users) {
    tagPre.innerHTML += users[index] + '\n';
}
    return users;
};

usersRead();

const usersDelete = function(index) {
    users.splice(index, 1);
    usersSet();
    return 'Deleted';
};

const usersUpdate = function(index, user) {
    users[index] = user;
    usersSet();
    return 'Updated';
}