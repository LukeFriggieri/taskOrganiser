document.addEventListener("DOMContentLoaded", function(){
    const clearAllButton = document.getElementById('clearButton');
    const indicatorIcons = document.getElementById('indicatorIcons');
    
    let taskCounts = {
        school: 0,
        personal: 0,
        church: 0
    };

    function updateIndicators(){
        indicatorIcons.innerHTML = '';

        if(taskCounts.personal > 0){
            const personalIndicator = document.createElement('div');
            personalIndicator.className = 'indicator';
            personalIndicator.innerHTML = '&#x1F464; <span>' + taskCounts.personal + '</span>';
            indicatorIcons.appendChild(personalIndicator);
        }

        if(taskCounts.school > 0){
            const schoolIndicator = document.createElement('div');
            schoolIndicator.className = 'indicator';
            schoolIndicator.innerHTML = '&#x1F3EB; <span>' + taskCounts.school + '</span>';
            indicatorIcons.appendChild(schoolIndicator);
        }

        if(taskCounts.church > 0 ){
            const churchIndicator = document.createElement('div');
            churchIndicator.className = 'indicator';
            churchIndicator.innerHTML = '&#x26EA; <span>' + taskCounts.church + '</span>';
            indicatorIcons.appendChild(churchIndicator);
        }
    }

    document.getElementById('newTaskButton').addEventListener('click', function(){
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.placeholder = 'Task Name';
    
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
    
        taskDiv.appendChild(taskInput);
        taskDiv.appendChild(saveButton);
        taskDiv.appendChild(deleteButton);

        deleteButton.addEventListener('click', function(){
            const taskType = taskDiv.getAttribute('data-type');
            if(taskType && taskCounts[taskType] > 0){
                taskCounts[taskType]--;
                updateIndicators();
            }
            taskDiv.remove();
        });
    
        document.getElementById('taskContainer').appendChild(taskDiv);
    
        saveButton.addEventListener('click', function(){
            const taskName = taskInput.value;
    
            if(taskName.trim() == ''){
                alert('Task name cannot be empty');
                return;
            }
    
            taskInput.remove();
            
            const taskNameSpan = document.createElement('span');
            taskNameSpan.textContent = taskName;
            taskDiv.insertBefore(taskNameSpan, saveButton); 
    
            saveButton.remove();
            deleteButton.remove();
            deleteButton.innerHTML = '&#10060;';
            
            const emojiButtons = document.createElement('div');
            emojiButtons.classList = 'emojiButtons';
    
            const schoolButton = document.createElement('button');
            schoolButton.innerHTML = '&#x1F3EB;';
    
            const personalButton = document.createElement('button');
            personalButton.innerHTML = '&#x1F464;';
    
            const churchButton = document.createElement('button');
            churchButton.innerHTML = '&#x26EA;';
    
            emojiButtons.appendChild(personalButton);
            emojiButtons.appendChild(schoolButton);
            emojiButtons.appendChild(churchButton);
            taskDiv.appendChild(emojiButtons);
    
            const completeButton = document.createElement('button');
            completeButton.innerHTML = '&#10003;';
    
            function removeEmojiButtons(){
                personalButton.remove();
                schoolButton.remove();
                churchButton.remove();
            } 
    
            schoolButton.addEventListener('click', function(){
                taskNameSpan.innerHTML ='&#x1F3EB; '+taskNameSpan.textContent;
                taskDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                taskDiv.setAttribute('data-type', 'school');
                
                taskDiv.classList.add('add');
                taskDiv.addEventListener('animationend', function () {
                    taskDiv.classList.remove('add');
                });
                
                taskDiv.appendChild(completeButton);
                taskDiv.appendChild(deleteButton);
                removeEmojiButtons();
                taskCounts.school++;
                updateIndicators();
            });
    
            personalButton.addEventListener('click', function(){
                taskNameSpan.innerHTML = '&#x1F464; '+taskNameSpan.textContent;
                taskDiv.style.backgroundColor = 'rgba(0, 0, 255, 0.1)'; 
                taskDiv.setAttribute('data-type', 'personal');
                
                taskDiv.classList.add('add');
                taskDiv.addEventListener('animationend', function(){
                    taskDiv.classList.remove('add');
                });

                removeEmojiButtons();
                taskDiv.appendChild(completeButton);
                taskDiv.appendChild(deleteButton);
                taskCounts.personal++;
                updateIndicators();
            });
    
            churchButton.addEventListener('click', function(){
                taskNameSpan.innerHTML = '&#x26EA; '+taskNameSpan.textContent;
                taskDiv.style.backgroundColor = 'rgba(0, 128, 0, 0.1)';
                taskDiv.setAttribute('data-type', 'church');
                
                taskDiv.classList.add('add');
                taskDiv.addEventListener('animationend', function(){
                    taskDiv.classList.remove('add');
                });

                removeEmojiButtons();
                taskDiv.appendChild(completeButton);
                taskDiv.appendChild(deleteButton);
                taskCounts.church++;
                updateIndicators();
            });

            completeButton.addEventListener('click', function markAsComplete(){
                taskNameSpan.style.textDecoration = 'line-through';
                completeButton.remove();
                deleteButton.remove();
                
                completeButton.removeEventListener('click', markAsComplete);
                taskDiv.classList.add('completed');
                taskDiv.addEventListener('animationend', function(){
                    const taskType = taskDiv.getAttribute('data-type');
                    taskDiv.remove();
                    
                    if(taskType && taskCounts[taskType] > 0){
                        taskCounts[taskType]--;
                        updateIndicators();
                    }
                });
            });
        });
    });

    clearAllButton.addEventListener('click', function () {
        taskCounts.school = 0;
        taskCounts.church = 0;
        taskCounts.personal = 0;
        updateIndicators();
        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            task.classList.add('clearing');
            task.addEventListener('animationend', function(){
                task.remove();
            });
        });
    });

    updateIndicators(); // Initial update when DOM is loaded
});
