function addProductButtonClicked() {

    $("#productModalTitle").text('Degree Information');
    $("#code").val('');
    $("#name").val('');
    $("#description").val('');
    $("#price").val('');
    $("#quantity").val('');
    $("#myModal5").modal("show");
}

function addProduct() {
    var f = document.getElementsByTagName('form')[0];
    if (!f.checkValidity()) {
        return false;
    }



    $("#submitButton").toggleClass('btn-info');
    $("#submitButton").html('Processing...');
    $("#submitButton").attr('disabled', true);

    var product = {};
    product.Code = $("#code").val();
    product.Name = $("#name").val();
    product.Price = parseFloat($("#price").val());
    product.Quantity = parseFloat($("#quantity").val());
    product.Date = $("#date").val().toString();
    product.Description = $("#description").val();
    product.Usercode = 'tyb';
    if ($("#productModalTitle").text() === 'Add A New Product') {
        $.ajax({
            type: "POST",
            url: "WebService1.asmx/addProduct",
            data: "{product:" + JSON.stringify(product) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                if (response.d === 'OK') {
                    swal({
                        title: "Success!",
                        text: "Product Added Successfully!",
                        type: "success",
                        icon: "success"
                    }).then(function () {
                        window.location.reload();
                    });
                }
                else {
                    swal("Error Occured", response.d, "error");
                }
            },
            error: function (response) {
                swal("Error Occured", response.responseText, "error");
            },
            failure: function (response) {

                swal("Request Failed", response.responseText, "warning");
            },
            complete: function () {
                $("#submitButton").toggleClass('btn-primary');
                $("#submitButton").html('Save changes');
                $("#submitButton").attr('disabled', false);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: "WebService1.asmx/updateProduct",
            data: "{product:" + JSON.stringify(product) + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                if (response.d === 'OK') {
                    swal({
                        title: "Success!",
                        text: "Product Updated Successfully!",
                        type: "success",
                        icon: "success"
                    }).then(function () {
                        window.location.reload();
                    });
                }
                else {
                    swal("Error Occured", response.d, "error");
                }
            },
            error: function (response) {
                swal("Error Occured", response.responseText, "error");
            },
            failure: function (response) {

                swal("Request Failed", response.responseText, "warning");
            },
            complete: function () {
                $("#submitButton").toggleClass('btn-primary');
                $("#submitButton").html('Save changes');
                $("#submitButton").attr('disabled', false);
            }
        });
    }

}

function deleteProduct() {
    var product = {};
    product.Code = $("#code").val();
    product.Name = $("#name").val();
    product.Price = parseFloat($("#price").val());
    product.Quantity = parseFloat($("#quantity").val());
    product.Date = $("#date").val().toString();
    product.Description = $("#description").val();
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/deleteProduct",
        data: "{product:" + JSON.stringify(product) + "}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d === 'OK') {
                getproducts();
                swal({
                    title: "Success!",
                    text: "Product Deleted Successfully!",
                    type: "success",
                    icon: "success"
                }).then(function () {
                    getproducts();
                });
            }
            else {
                swal("Delete Failed", response.d, "error");
            }
        },
        error: function (response) {
            swal("Error Occured", response.responseText, "error");
        },
        failure: function (response) {

            swal("Request Failed", response.responseText, "warning");
        },
        complete: function () {

        }

    });
}
function delpro() {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to see this product again!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
.then((willDelete) => {
    if (willDelete) {
        deleteProduct();
    }
});
}

function getproducts() {
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/getProducts",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $(document).ready(function () {
            var jsonData = JSON.parse(response.d);
                $(document).ready(function () {
                    $('#productTable').dataTable({
                        pageLength: 25,
                        responsive: true,
                        dom: '<"html5buttons"B>lTfgitp',
                        buttons: [
                            { extend: 'copy' },
                            { extend: 'csv' },
                            { extend: 'excel', title: 'ExampleFile' },
                            { extend: 'pdf', title: 'ExampleFile' },

                            {
                                extend: 'print',
                                customize: function (win) {
                                    $(win.document.body).addClass('white-bg');
                                    $(win.document.body).css('font-size', '10px');

                                    $(win.document.body).find('table')
                                            .addClass('compact')
                                            .css('font-size', 'inherit');
                                }
                            }
                        ],
                        "bDestroy": true,
                        data: jsonData,
                        columns: [
                            { data: 'Code' },
                            { data: 'Name' },
                            { data: 'Description' },
                            { data: 'Price' },
                            { data: 'Quantity' },
                            { data: 'Usercode' },
                            
                        ]
                    });
                });
            });

            $(document).ready(function () {
                $('#productTable tbody').on('click',
                    'tr',
                    function () {

                        $("#productModalTitle").text('Update Product');

                        var code = $('td', this).eq(0).text();
                        var name = $('td', this).eq(1).text();
                        var description = $('td', this).eq(2).text();
                        var price = $('td', this).eq(3).text();
                        var quantity = $('td', this).eq(4).text();

                        $("#code").val(code);
                        $("#code").attr('readonly','true');
                        $("#name").val(name);
                        $("#description").val(description);
                        $("#price").val(price);
                        $("#quantity").val(quantity);
                        //DateStart
                        var d = new Date();
                        var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
                        $("#date").attr('type','text');
                        $("#date").val(strDate);
                        $("#date").attr('type', 'date');
                        //Finish
                        $("#myModal5").modal("show");
                    });

            });
        },
        error: function (response) {

            alert('Erorr ' + response.responseText);
        },
        failure: function (response) {

            alert('Fail ' + response.responseText);
        },
        complete: function () {
            //    $("#mynav").load("nav.html");
            //  $('#load').hide();
        }
    });

}