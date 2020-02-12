$('#divmsgg').hide();

$(document).ready(
    function () {
        $('#signup-form').submit(function (event) {
            event.preventDefault();
            var dataUser = {
                name: $('#name').val(),
                email: $('#email').val(),
                password: $('#password').val()
            };

            $.ajax({
                // v1 is the version , users is the route in backend
                url: 'http://localhost:3000/v1/users',
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(dataUser),
                success: function (result, status) {
                    console.log(result);
                    window.location.href="login.html";
                },
                error: function (jqXHR, status) {

                    $('#divmsgg').show();

                    $('#mssg').html(jqXHR.responseJSON.message);

                    // console.log(jqXHR.responseJSON.message);
                    // $('#message').html(jqXHR.responseJSON.message);

                }

            })

        });



        /* login page javascript to connect backend */
        $("#loginForm").submit(function(event){
            event.preventDefault();
            console.log('login button clicked');
            // var token = result.token;
            // ifToken(token);
            const userData = {

                email : $("#email").val(),
                password : $("#password").val()

            };
            $.ajax({
                url:"http://localhost:3000/v1/verify",
                method:"POST",
                contentType : "application/json",
// window.localStorage.setItem('token',result.token);
                data: JSON.stringify(userData),

                success : function(result, status){
                    // window.location.href= "dashboard.html"
                    // console.log(result);
                    // console.log(result.message);
                    console.log(result);

                    // window.localStorage.setItem('token',result.result.token);
                    window.localStorage.setItem('token',result.token);
                    window.localStorage.setItem('email',result.result.email);
                    window.localStorage.setItem('id',result.result.id);

                    window.location.href="Dashboard.html";
// if(token){
// window.location.href="https://www.youtube.com";
// }
                },
                error:function(jqXHR){
                    console.log(jqXHR);
                    $('#divmsgg').show();

                    $('#mssg').html(jqXHR.responseJSON.message);

                    // $("#message").html(jqXHR.responseJSON.message);

                }
            })
        })

        /*--------------retrieving data*/



    });






function ifToken(token){
    if(token){
        window.location.href="Dashboard.html";
    }
}


//Token part










