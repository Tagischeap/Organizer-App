$(function() {
  var notesList = [];
  var selectedID = 0;

  //Custom Functions

  //Event Handlers
  $("#btn_addNote").on("click", function() {
    var note = new Object();
    note.title = $("#tf_title").val();
    note.content = $("#tf_content").val();
    notesList.push(note);

    localStorage.notesList = JSON.stringify(notesList);
  });

  $("#btn_editNote").on("click", function() {
    notesList[selectedID].title = $("#tf_title_edit").val();
    notesList[selectedID].content = $("#tf_content_edit").val();
    localStorage.notesList = JSON.stringify(notesList);
  });

  $("#btn_deleteNote").on("click", function() {
    notesList.splice(selectedID, 1);
    localStorage.notesList = JSON.stringify(notesList);
  });

  $("#page_notes").on("pagebeforeshow", function() {
    $("#list_notes").html("");

    if (localStorage.notesList != undefined) {
      notesList = JSON.parse(localStorage.notesList); //undefined for 1st time
    }

    for (i = 0; i < notesList.length; i++) {
      $("#list_notes").append(
        "<li id='" +
          i +
          "'><a href='#page_viewNote'>" +
          notesList[i].title +
          "</a></li>"
      );
    }

    $("#list_notes li").on("click", function() {
      selectedID = this.id;
    });

    $("#list_notes").listview("refresh");
  });

  $("#page_viewNote").on("pagebeforeshow", function() {
    $(this)
      .find(".ui-content h2")
      .html(notesList[selectedID].title);
    $(this)
      .find(".ui-content p")
      .html(notesList[selectedID].content);
  });

  $("#page_editNote").on("pagebeforeshow", function() {
    $(this)
      .find("#tf_title_edit")
      .val(notesList[selectedID].title);
    $(this)
      .find("#tf_content_edit")
      .val(notesList[selectedID].content);
  });
});

$(function() {
  $("#list_notes").sortable();
  $("#list_notes").disableSelection();
});