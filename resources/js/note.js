
// Posting Data------------------------------------------------------------
$(document).ready(function() {


$('#newNoteForm').submit(function (e) {
    e.preventDefault();
    console.log('Submit button clicked');
    // window.location.href = "NoteList.html";
    var formdata = new FormData();
    const data = {

        Nname: $("#nname").val(),
        Ndesc: $("#ndesc").val(),
        Nimage: $('#nimage')[0].files[0],
        UserId:localStorage.getItem("id")

    };

    for (key in data) {
        formdata.append(key, data[key]);
        console.log(data[key]);

    }

    $.ajax({
        url: 'http://localhost:3000/v1/upload/',
        method: 'POST',
        processData: false,
        contentType: false,
        data: formdata,
        dataType: 'json',

        success: function (result, status) {
            window.location.href = "NoteList.html";
            console.log(result.message);

        },
        error: function (jqXHR, status) {
            console.log(jqXHR);
            console.log('error')
        }
    })
});


    /* retrieving ----------------------------Note*/
    UserId = localStorage.getItem("id");
    $.ajax({
        url: 'http://localhost:3000/v1/note/'+UserId,
        /* data is not needed
        contenttype is also not neede */
        dataType: 'json',
        success: function (result, status) {
            // console.log(result);

            for (key in result) {
                // console.log(result[key].Nname);

                $('#noteList').append(' <tr>\
                        <td>'+ result[key].Nname + '</td>\
                        <td> <img src="file:///home/manish/Desktop/t2-backend-api-manishmhr/upload/' + result[key].Nimage +'"+alt="img" height="150px" width="200px">\
                        <td>'+ result[key].Ndesc + '</td>\
                        \
                    \
                    <td><button class="btn btn-primary" id="edit" uid='+ result[key].id + ' data-toggle="modal" data-target="#EditNote">Edit</button></td>\
                    <td><button type="button" class="btn btn-danger" uid='+ result[key].id + ' id="delete">Delete</button></td>\
                    </tr>');
                // console.log(result[key].Ndesc);
            }


        },
        error: function (jqXHR, status) {

        }

    });


// <td><button class="btn btn-warning" id="edit" uid='+ result[key].id+' data-toggle="modal" data-target="#EditNote">Edit</button></td>\

    /*delete data */
    $('#noteList').on('click', '#delete', function () {
        // console.log($(this));
        // console.log($(this)[0].attributes.uid.nodeValue);
        id = $(this)[0].attributes.uid.nodeValue;
        var deleteConfirm = confirm("Are your Sure??");
        if(deleteConfirm == true) {

        $.ajax({
            url: "http://localhost:3000/v1/note/" + id,
            method: "DELETE",
            dataType: 'json',
            success: function (result, status) {
                window.location.href = "NoteList.html";
                console.log(result.message);
                $("#message").html(result.message);

            },
            error: function () {
            }


        })
        }else {

        }
    });



    /*edit note form*/
    $('#noteList').on('click', '#edit', function() {



        id = $(this)[0].attributes.uid.nodeValue;
        // console.log($(this)[0].attributes.uid.nodeValue);

        $.ajax({

            url: 'http://localhost:3000/v1/snote/' + id,
            method: 'GET',
            dataType: 'json',
            success: function(result) {
                console.log(result.Nname);

                $('#nname').val(result.Nname);
                $('#ndesc').val(result.Ndesc);
            },
            error: function() {

            }
        })


    });






    // update note data starts here
    var id;
    $('#NoteEditForm').submit(function (e) {


        e.preventDefault();

        var editData = {
            Nname: $("#nname").val(),
            Ndesc: $("#ndesc").val(),


        };

        $.ajax({

            url: 'http://localhost:3000/v1/note/' + id, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(editData),
            success: function (result) {
                console.log(result);
                window.location.href = "NoteList.html"
                // your logic here , redirect to another page or show message etc
            },
            error: function () {

            }

        })

    });





});