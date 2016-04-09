$(document).ready(function() {

  var tasks = [];  //guardar la data
  var incomplete = 0;
  var done = 0;
  var progress=0;
  var date=0;

//HTMl FUNCTIONS----------------------------------
  htmlTask = function(task) {
    var html = "<div class='row tasks-list-item'> <div class='col-xs-12'> <div class='checkbox'><label><input type='checkbox' id='cbox" + task.id + "' onclick='getDoneCount(" + task.id + ")'> " + task.title + "</label><span>" + task.completed + "</span></div></div></div>";
    return html;
  };

  htmlDate= function() {
    var date= new Date ();
    var html ="<p>"+date.getDate()+"</p>"+ "<span>Saturday </span>";
    return html;
  };

  //console.log(htmlDate);

//GET DATA-------------------------------------------------
  taskData = function() {
    var url = 'http://jsonplaceholder.typicode.com/todos';
    var data = $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response) {
      tasks = response;
      main();
    });
  };

// LOOP THROUGH DATA---------------------------------------
  main = function() {
    var htmlTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      htmlTasks.push(htmlTask(tasks[i]));
    }
    console.log(htmlTasks.join(""));

//INJECT RESULTS-------------------------------------------
  $('.tasks-list').html(htmlTasks.join(""));  //jqueyr es $- lo ata al html original
  for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
          done += 1;
        } else {
          incomplete += 1;
        }
      }

    progress= (done/ tasks.length)*100;

    console.log ('completed', done);
    console.log ('incompleted', incomplete);
    console.log('progress'); //component pattern

    $('#progress').text(progress +"%");
    $('#date').html(htmlDate());
  };

  taskData();
});

//list of to do's:
//1. get data
//2. create html functions- where you embed what you will run within the html structure
//3. loop through data
//4. inject results into each container

//Pending
//watch for events (example click);
// Rerender (steps 2-4);
