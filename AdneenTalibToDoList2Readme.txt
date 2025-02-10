
### Functions Overview
- **addName()**: Adds a teammate's name to the dropdown if it's not already present.
- **sortDropdownOptions()**: Sorts the teammate dropdown options alphabetically.
- **addTask()**: Validates and adds a new task to the selected teammate's section.
- **createTeammateSection(name)**: Creates a section for a teammate.
- **createTaskRow(taskDescription, dueDate)**: Creates a row for a task with its description and due date.
- **sortTeammateSections()**: Sorts the teammate sections alphabetically.
- **sortTasksByDate(section)**: Sorts tasks within a teammate's section by due date.
- **strikeTask()**: Strikes through the task description when marked as completed.
- **clearCompleted()**: Clears completed tasks and removes any empty teammate sections.
- **reset()**: Resets the entire task list and clears the input fields.
- **checkAndShowNoTasksMessage()**: Checks if there are no tasks and shows a message if necessary.
- **showNoTasksMessage()**: Displays a message indicating there are no tasks currently.
- **hideNoTasksMessage()**: Hides the "No tasks right now" message when tasks are added.


I used some code ( but changed it to fit my schema), here are the sources: 
striking through text: https://stackoverflow.com/questions/76831719/striking-through-text-when-checkbox-is-checked
checking if the date is the same as today: https://stackoverflow.com/questions/8215556/how-to-check-if-input-date-is-equal-to-todays-date
disable drop down : https://stackoverflow.com/questions/13149228/disable-drop-down-options-once-chosen-in-other-dropdown


