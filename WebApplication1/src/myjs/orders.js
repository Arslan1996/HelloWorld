function getorders() {
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/getOrders",
        contentType: "application/json; charset=utf-8",
        async:false,
        dataType: "json",
        success: function (response) {
            $(document).ready(function () {
                var jsonData = JSON.parse(response.d);
                $(document).ready(function () {

                    $('#orderTable').dataTable({
                        pageLength: 10,
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
                            { data: 'OrderNo' },
                            { data: 'DeliveryDate' },
                            { data: 'OrderDate' },
                            { data: 'TotalItems' },
                            { data: 'TotalCost' },
                            { data: 'Status' },
                            { data: 'OrderUser' },

                        ]
                    });
                });
            });

            $(document).ready(function () {
                $('#orderTable tbody').on('click',
                    'tr',
                    function () {
                       // $('#tempTable').DataTable().clear().draw();
                        //$('#orderInfoTable').DataTable().clear().draw();

                        $("#orderNo").text($('td', this).eq(0).text());
                        $("#ddate").text($('td', this).eq(1).text());
                        $("#odate").text($('td', this).eq(2).text());
                        $("#orderUserName").text($('td', this).eq(6).text());
                        $("#orderTotal").text($('td', this).eq(4).text());

                        $.ajax({
                            type: "POST",
                            url: "WebService1.asmx/getOrderInfo",
                            data: "{order:" + $("#orderNo").text() + "}",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (response) {
                                $(document).ready(function () {
                                    var jsonData = JSON.parse(response.d);
                                    $(document).ready(function () {
                                        $('#tempTable').dataTable({
                                            "bDestroy": true,
                                            data: jsonData,
                                            columns: [
                                                { data: 'productCode' },
                                                { data: 'productName' },
                                                { data: 'productDescription' },
                                                { data: 'productPrice' },
                                                { data: 'productQunatity' },
                                                { data: 'totalAmount' },

                                            ]
                                        });
                                        $("#tempTable tr:gt(0)").each(function () {
                                            var this_row = $(this);
                                            Code = $.trim(this_row.find('td:eq(0)').html());
                                            Name = $.trim(this_row.find('td:eq(1)').html());
                                            Description = $.trim(this_row.find('td:eq(2)').html());
                                            Price = $.trim(this_row.find('td:eq(3)').html());
                                            Quantity = $.trim(this_row.find('td:eq(4)').html());
                                            Amount = $.trim(this_row.find('td:eq(5)').html());

                                            $("#orderInfoTable > tbody").append('<tr><td>' +
                                                        Code +
                                                        '</td><td>' +
                                                        Name +
                                                        '</td><td>' +
                                                        Description +
                                                        '</td><td>' +
                                                        Price +
                                                        '</td>' +
                                                        '<td>' +
                                                        Quantity +
                                                        '</td>' +
                                                        '<td>' +
                                                        Amount +
                                                        '</td>');
                                        });
                                        
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

                        $("#myModal7").modal("show");
                        $('#myModal7').on('hidden.bs.modal', function () {
                            window.location.reload();
                        })
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

function updateOrder()
{
    var order = {};
    order.orderNo = $("#orderNo").text();
    order.status = $("#ostatus").val();
    $.ajax({
        type: "POST",
        url: "WebService1.asmx/updateOrder",
        data: "{order:" + JSON.stringify(order) + "}",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (response) {
            swal({
                title: "Success!",
                text: "Changes Saved Successfully!",
                type: "success",
                icon: "success"
            }).then(function () {
                window.location.reload();
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

function viewInvoice()
{

    $("#invTotal").text($("#orderTotal").text());
    $("#invoiceNo").text($("#orderNo").text());
    $("#iodate").text($("#odate").text());
    $("#iddate").text($("#ddate").text());
    $("#tempTable tr:gt(0)").each(function () {
        var this_row = $(this);
        Code = $.trim(this_row.find('td:eq(0)').html());
        Name = $.trim(this_row.find('td:eq(1)').html());
        Description = $.trim(this_row.find('td:eq(2)').html());
        Price = $.trim(this_row.find('td:eq(3)').html());
        Quantity = $.trim(this_row.find('td:eq(4)').html());
        Amount = $.trim(this_row.find('td:eq(5)').html());

        $("#invoiceTable > tbody").append('<tr><td>' +
                    Code +
                    '</td><td>' +
                    Name +
                    '</td><td>' +
                    Description +
                    '</td><td>' +
                    Price +
                    '</td>' +
                    '<td>' +
                    Quantity +
                    '</td>' +
                    '<td>' +
                    Amount +
                    '</td>');
    });

    $("#myModal8").modal("show");
    $('#myModal8').on('hidden.bs.modal', function () {
        window.location.reload();
    })
}

