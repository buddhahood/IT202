    jQuery.fn.loadProjects = function() 
    { this.html("<span>Refreshing IT202 Project list...</span>");
      var projects = 
        [
          { "name": "My Really Cool Project",
            "display": true,
            "description" : "dooie",
            "technologies": "AJAX,ial Components",
            "folder": "project4",
            "image" : "<some image url>"
          },
          { "name": "My Otheroject",
            "display" : true,
            "description" : "A really cool restaurant project using AJAX, Canvas, Service Workers and funny animal sounds.", 
            "technologies": "AJAX, Responsive Design, Material Components",
            "image" : "<some image url>"
          }
        ];

        var list = $('<d1/>');//make a new list
        this.empty().append(list);//set that new list as target to append retrieved data

        for (var key in projects) 
        { if (projects[key].display == true)
          {
          list.append('<dt>' + projects[key].name + '<dt>');
          list.append('<dd>' + projects[key].description + '<dd>');
          list.append('<dd>' + '<em>' + projects[key].technologies + '</em>' + '<dd>');
          //list.append('<dd> <a href = "   "   '+     project[key].folder + '"' +  </dd>');
          list.append(  '<dd>   <a href="https://buddhahood.github.io/IT202/">' + "[" + '<em>' +   "view" + '</em>' + "]" + '</a> ' + '[' + '<em>'+ 
                                                                      "source" +      '</em>' + "]" +
                        '</dd>');
          list.append('<dd><br/></dd>');
          }
        }
    };
//todo:  add var for app/project/lab, separate sections