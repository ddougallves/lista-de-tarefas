

function load() {

    if(localStorage.getItem('tasks')){
      let json = localStorage.getItem('tasks');
      taskList = JSON.parse(json);
      for(i in taskList){
        let item = createlistItem(taskList[i]._id,taskList[i]._status,taskList[i].title);
        taskListArea.insertBefore(item, taskListArea.lastElementChild);
      }
    }

}
  
function createlistItem(id,status,title) {

    let el = document.createElement('li');
    el.classList.add('task__item');

    el.setAttribute('data-id',id);
    el.setAttribute('data-status',status);

    let content = document.createElement('h2');
    content.innerText = title;
    content.classList.add('task__title');

    let checkbox = document.createElement('span');
    checkbox.classList.add('material-icons-round');
    checkbox.classList.add('task__checkbox');
    checkbox.setAttribute('onclick','toggleCheckbox(this)')

    let edit = document.createElement('span');
    edit.classList.add('material-icons-round');
    edit.classList.add('task__view');
    edit.innerText = 'visibility';
    edit.setAttribute('onclick','editTask(this)')

    let del = document.createElement('span');
    del.classList.add('material-icons-round');
    del.classList.add('task__delete');
    del.innerText = 'delete';
    del.setAttribute('onclick','deleteTask(this)')

    if(status == 'checked'){
        el.classList.add('task__item--checked');
        checkbox.innerText = 'check_box';
    }else {
        checkbox.innerText = 'check_box_outline_blank';
    };

    el.appendChild(checkbox);
    el.appendChild(content);
    el.appendChild(edit);
    el.appendChild(del); 

    return el;

}

function toggleCheckbox(checkbox) {
    
    let listItem = checkbox.parentNode;
    let id = listItem.dataset.id;
    let status = listItem.dataset.status;

    switch (status) {
        case 'checked':
            status = 'unchecked';
            listItem.classList.remove('task__item--checked');
            checkbox.innerText = 'check_box_outline_blank';
            break;  
        case 'unchecked':
            status = 'checked';
            listItem.classList.add('task__item--checked');
            checkbox.innerText = 'check_box';
            break;
    }


    let index = taskList.findIndex(item=>{
        if(item._id == id){
            return true;
        }
    }) 

    listItem.dataset.status = status;
    taskList[index]._status = status;
    localStorage.removeItem('tasks');
    let json = JSON.stringify(taskList);
    localStorage.setItem('tasks',json);

} 

function saveTask(task) {

    if(localStorage.getItem('tasks')){
        taskList.push(task);
        localStorage.removeItem('tasks');
        let json = JSON.stringify(taskList);
        localStorage.setItem('tasks',json);
    }else {
        taskList.push(task);
        let json = JSON.stringify(taskList);
        localStorage.setItem('tasks',json);
    }

    let item = createlistItem(task.id,task.status,task.title);
    taskListArea.insertBefore(item, taskListArea.lastElementChild);   

}   

function updateTask() {

    let id = editor.dataset.id;
    let title = editor.querySelector('.task__title').value;
    let desc = editor.querySelector('.task__desc').value;
    let parent = taskListArea
    .querySelector(`.task__item[data-id='${id}'`)

    parent.querySelector('.task__title').innerText = title;

    let index = taskList.findIndex(item=>{
        if(item._id == id){
            return true;
        }
    })  

    taskList[index].title = title;
    taskList[index].desc = desc;

    localStorage.removeItem('tasks');
    let json = JSON.stringify(taskList);
    localStorage.setItem('tasks',json); 

    editor.dataset.type = 'new';
    editor.dataset.id = '';
   
}

function deleteTask(buttom) {

    let listItem = buttom.parentNode;
    let id = listItem.dataset.id;

    let index = taskList.findIndex(item=>{
        if(item._id == id){
            return true;
        }
    }) 

    taskList.splice(index,1);
    localStorage.removeItem('tasks');
    let json = JSON.stringify(taskList);
    localStorage.setItem('tasks',json); 
    taskListArea.querySelectorAll('.task__item')[index].remove();
 
}
 
function editTask(button) {

    editorArea.classList.remove('hidden')

    let listItem = button.parentNode;
    let id = listItem.dataset.id;

    let index = taskList.findIndex(item=>{
        if(item._id == id){
            return true;
        }
    }) 

    editor.dataset.type = 'update';
    editor.dataset.id = id;

    editor.querySelector('.task__title')
    .value = taskList[index].title;
    editor.querySelector('.task__desc')
    .value = taskList[index].desc;

}