$(document).ready(function() {


//     /* retrieving user data in table */
//     $.ajax({
//         url:'http://localhost:3000/v1/users',
//         /* data is not needed
//         contenttype is also not neede */
//         dataType: 'json',
//         success: function(result,status){
// // console.log(result);
//
//             for (key in result){
//                 // console.log(result[key].username);
//
//                 $('#profilelist').append(' <tr>\
// 					<td>'+ result[key].id+'</td>\
// 					<td>'+ result[key].DisplayName+'</td>\
// 					<td>'+ result[key].email+'</td>\
// 				<td><button class="btn btn-success" id="edit" uid='+ result[key].id+' data-toggle="modal" data-target="#EditProject">Edit</button></td>\
// 				\
// 				</tr>')
//             }
//
//         },
//         error:function(jqXHR,status){
//
//         }
//
//     });



    //
    // /*edit profile form data*/
    // $('#profile').append( function() {
    //     //this is the userid
    //
    //
    //     $.ajax({
    //
    //         url: 'http://localhost:3000/v1/users/' + 1,
    //         method: 'GET',
    //         dataType: 'json',
    //         success: function(result) {
    //             console.log(result.Pname);
    //             // console.log(result.username)
    //             $('#pname').val(result.Pname);
    //             $('#pdesc').val(result.Pdesc);
    //             $('#myRange').val(result.Pstatus)
    //
    //
    //         },
    //         error: function() {
    //
    //         }
    //     })
    //
    //
    // });
    //




    /*--------------retrieving data User data*/
    email1 = window.localStorage.getItem('email');
    console.log(email1);
    const data1 = { email: email1 };
    $.ajax({
        url: 'http://localhost:3000/v1/users/'+email1,
        method: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function (result, status) {

            console.log(result);
            for(key in result){
                $('#uname').val(result[key].uname);
                $('#email').val(result[key].email);
                $('#FirstName').val(result[key].FirstName);
                $('#LastName').val(result[key].LastName);
                $('#country').val(result[key].country);
                $('#address').val(result[key].address);
                $('#city').val(result[key].city);
                $('#state').val(result[key].state);
                $('#postalcode').val(result[key].postalcode);
                $('#phoneNumber').val(result[key].phoneNumber)
            }


        },
        error: function (jqXHR) {
            console.log(jqXHR)

        }
    });



    $('#profile').submit(function (e) {

        e.preventDefault();

        var editUser = {
            uname: $("#uname").val(),
            email: $("#email").val(),
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            country: $("#country").val(),
            address: $("#address").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            postalcode: $("#postalcode").val(),
            phoneNumber: $("#phoneNumber").val()


        };
        console.log(editUser);
        var uid = window.localStorage.getItem('id');
        console.log($(this));
        // console.log(uid)
        $.ajax({

            url: 'http://localhost:3000/v1/users/'+uid, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(editUser),
            success: function (result) {
                console.log(result);
                // your logic here , redirect to another page or show message etc
                window.location.href = "Dashboard.html"

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }

        })


    })



});


