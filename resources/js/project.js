// Posting Data


$(document).ready(function () {
    $("#newProForm").submit(function (event) {
        event.preventDefault();
        console.log('New Project button clicked');
        const projectData = {

            Pname: $("#pname").val(),
            Pdesc: $("#pdesc").val(),
            Pstatus: $("#myRange").val(),
            // Pimage : $("#pimage").val(),
            UserId:localStorage.getItem("id")

        };
        // for (key in projectData ){
        //     console.log(projectData[key]);
        // }
        $.ajax({

            // *********
            url: "http://localhost:3000/v1/project",
            method: "POST",
            contentType: "application/json",

            data: JSON.stringify(projectData),

            success: function (result, status) {
                window.location.href = "ProjectList.html";
                console.log(result);


            },
            error: function (jqXHR) {
                console.log(jqXHR);
                $("#message").html(jqXHR.responseText);

            }
        })
    });












    /* retrieving project data in table */
    UserId = localStorage.getItem("id");
    $.ajax({
        url: 'http://localhost:3000/v1/project/'+UserId,

        dataType: 'json',
        success: function (result, status) {
            var arr = [];
            var manish = [];
             //console.log(result);

            // chart(result)

            $.each(result, function (index) {
                // console.log(result[index].Pstatus)

                drawChartbar(result);


            });
           // manish.push({result[index].Pstatus});
            console.log(arr);
// console.log(result);


            var xlabels = [];
            var index;
            for (key in result) {
                // console.log(result[key].username);

                $('#projectList').append(' <tr>\
					<td>' + result[key].Pname + '</td>\
					<td>' + result[key].Pdesc + '</td>\
				<td><button class="btn btn-success" id="edit" uid=' + result[key].id + ' data-toggle="modal" data-target="#EditProject">Edit</button></td>\
				<td><button type="button" class="btn btn-danger" uid=' + result[key].id + ' id="delete">Delete</button></td>\
				 \
				</tr>');
//niman sir
//                 arr.push({
//                     stat: result[key].Pstatus
//                 });
//
//                 xlabels.push({
//                     name: result[key]
//
//                 });

            }


        },
        error: function (jqXHR, status) {

        }

    });


    /*edit project form*/
    $('#projectList').on('click', '#edit', function () {
        //this is the userid
        id = $(this)[0].attributes.uid.nodeValue;
        console.log($(this)[0].attributes.uid.nodeValue);

        $.ajax({

            url: 'http://localhost:3000/v1/sproject/' + id,
            method: 'GET',
            dataType: 'json',
            success: function (result) {
                console.log(result.Pname);
                // console.log(result.username)
                $('#pname').val(result.Pname);
                $('#pdesc').val(result.Pdesc);
                $('#myRange').val(result.Pstatus)


            },
            error: function () {

            }
        })


    });


    // update form data starts here
    var id;
    $('#proEditForm').submit(function (e) {


        e.preventDefault();

        var editData = {
            Pname: $("#pname").val(),
            Pdesc: $("#pdesc").val(),
            Pstatus: $("#myRange").val()

        };

        $.ajax({

            url: 'http://localhost:3000/v1/project/' + id, // here uid has already been set to actual userid in previous funciton when edit is clicked, since uid is global
            method: "PUT",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(editData),
            success: function (result) {
                console.log(result);
                window.location.href = "ProjectList.html"
                // your logic here , redirect to another page or show message etc
            },
            error: function () {

            }

        })

    });


    /*delete data */
    $('#projectList').on('click', '#delete', function () {


        console.log($(this)[0].attributes.uid.nodeValue);
        id = $(this)[0].attributes.uid.nodeValue;
        var deleteConfirm = confirm("Are your Sure??");
        if(deleteConfirm == true) {

            $.ajax({
                url: "http://localhost:3000/v1/project/" + id,
                method: "DELETE",
                dataType: 'json',
                success: function (result, status) {
                    console.log('success');
                    window.location.href = "ProjectList.html"
                    console.log(result.message);
                    $("#message").html(result.message);

                },
                error: function () {


                }


            })
        }else {

        }
    });








 function drawChartbar(projectName, projectStatus){
     console.log(projectName);

     var arrayLabel=[];
     var arraydata = [];

     $.each(projectName, function (index) {
         arrayLabel.push(projectName[index].Pname);
         arraydata.push(projectName[index].Pstatus)
     });

     $.each(projectStatus, function (index) {
         arraydata.push(projectStatus[index].Pstatus)
     });


     // Chart
     let myChart = document.getElementById('myChart').getContext('2d');
     // var  xlabels=[];
     var manish = [];
     var arr = [];

     // Global Options
     Chart.defaults.global.defaultFontFamily = 'Lato';
     Chart.defaults.global.defaultFontSize = 18;
     Chart.defaults.global.defaultFontColor = '#777';

     let massPopChart = new Chart(myChart, {
         type:'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
         data:{

             labels:arrayLabel,

             datasets:[{
                 label:'Progress',
                 data:arraydata,
                 //backgroundColor:'green',
                 backgroundColor:[
                     'rgba(255, 99, 132, 0.6)',
                     'rgba(54, 162, 235, 0.6)',
                     'rgba(255, 206, 86, 0.6)',
                     'rgba(155,193,228,0.36)',
                     'rgba(153, 102, 255, 0.6)',
                     'rgba(255, 159, 64, 0.6)',
                     'rgba(255, 99, 132, 0.6)',
                     'rgba(54, 162, 235, 0.6)',
                     'rgba(255, 206, 86, 0.6)',
                     'rgba(155,193,228,0.36)',
                     'rgba(153, 102, 255, 0.6)',
                     'rgba(255, 159, 64, 0.6)',
                     'rgba(255, 99, 132, 0.6)'
                 ],
                 borderWidth:1,
                 borderColor:'#777',
                 hoverBorderWidth:3,
                 hoverBorderColor:'#000'
             }]
         },
         options:{
             title:{
                 display:true,
                 text:'All Project Stat',
                 fontSize:25
             },
             legend:{
                 display:true,
                 position:'right',
                 labels:{
                     fontColor:'#000'
                 }
             },
             layout:{
                 padding:{
                     left:50,
                     right:0,
                     bottom:0,
                     top:0
                 }
             },
             tooltips:{
                 enabled:true
             }
         }
     });

 }






});




