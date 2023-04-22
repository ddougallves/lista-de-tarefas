var taskList = []
window.addEventListener('load',load);

const saveButton = document.querySelector('.task__save');
const cancelButton = document.querySelector('.task__cancel');
const editor = document.querySelector('.task__editor');
const taskListArea = document.querySelector('.task__list');
const editorArea = document.querySelector('.task__editor-area');
const showEditor = document.querySelector('.task__item--add');
 
saveButton.addEventListener('click',(e)=>{

  e.preventDefault();
  
  let task;
  let title = editor.querySelector('.task__title').value;
  let desc = editor.querySelector('.task__desc').value;

  switch (editor.dataset.type) {

    case 'new':
        console.log('nova tarefa')
        task = new Task(title,desc);
        task.id = parseInt(taskList.length);
        saveTask(task);
      break;
    case 'update':  
        updateTask();
      break; 

  }

  editor.querySelector('.task__title').value = '';
  editor.querySelector('.task__desc').value = '';

  editorArea.classList.add('hidden')

}) 

cancelButton.addEventListener('click',(e)=>{
  e.preventDefault();
  editor.querySelector('.task__title').value = '';
  editor.querySelector('.task__desc').value = '';
  editorArea.classList.add('hidden')
})
 

showEditor.addEventListener('click',()=>{
    editorArea.classList.remove('hidden')
})

