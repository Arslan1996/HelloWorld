function addOrderButtonClicked()
{

    $("#myModal5").modal("show");
}

var item = {};

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
                        item.code = $('td', this).eq(0).text();
                        item.name = $('td', this).eq(1).text();
                        item.description = $('td', this).eq(2).text();
                        item.price = $('td', this).eq(3).text();
                        $("#myModal6").modal("show");
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
function addToCart()
{
    var f = document.getElementsByTagName('form')[0];
    if (!f.checkValidity()) {
        return false;
    }

    item.quantity = $("#qty").val();
    $("#cartTable > tbody").append('<tr><td>' +
            item.code +
            '</td><td>' +
            item.name +
            '</td><td>' +
            item.description +
            '</td><td>' +
            item.price +
            '</td>' +
            '<td>' +
            item.quantity +
            '</td>' +
            '<td class="amnt">' +
            (item.quantity * item.price).toFixed(2) +
            '</td>' +
            '<td><i class="del fa fa-trash" style="color:red;"></i></></tr>');
    var grandTotal = parseFloat($("#grandTotal").text());
    grandTotal += (item.quantity * item.price);
    grandTotal = grandTotal.toFixed(2);
    $("#grandTotal").text(grandTotal);
    $("#myModal5").modal("hide");
    $("#myModal6").modal("hide");
    $('.del').on('click',
    function () {
        $(this).parent().closest('tr').remove();
        grandTotal = 0.0;
        $(".amnt").each(function () {

            var value = $(this).text();
            // add only if the value is number
            if (!isNaN(value) && value.length !== 0) {
                grandTotal += parseFloat(value);
            }
        });
        grandTotal = grandTotal.toFixed(2);
        $("#grandTotal").text(grandTotal);
    });
}

function submitOrder()
{
    
    if (!$('#cartTable').DataTable().data().any()) {
        $('#cartTable').DataTable().destroy();
        swal("Empty Cart", "Please Add Atleast One Product To Cart", "info");
        return false;
    }

    var f = document.getElementById('deliveryDate');
    if (!f.checkValidity() || !document.getElementById('deliveryDate')) {
        swal("Wrong Date", "Please Choose A Correct Delivery Date!", "error");
        return false;
    }

    var order = {};

    order.orderNo = $.now();
    order.deliveryDate = $("#deliveryDate").val();

    var d = new Date();
    var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    order.orderDate = strDate;
    order.totalItems = 0;
    order.totalCost = $("#grandTotal").text();
    order.status = 'Pending';
    order.orderUser = 'tyb';

    var orderinfo = $('#cartTable').tableToJSON();

    $.ajax({
        type: "POST",
        url: "WebService1.asmx/submitOrder",
        data: "{order:" + JSON.stringify(order) + ",orderInfo: '" + JSON.stringify(orderinfo) + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d === 'OK') {
               // alert('OK');
                swal({
                    title: "Success!",
                    text: "Product Added Successfully!",
                    type: "success",
                    icon: "success"
                }).then(function () {
                    $("#invTotal").text(order.totalCost);
                    $("#invoiceNo").text(order.orderNo);
                    $("#odate").text(order.orderDate);
                    $("#ddate").text(order.deliveryDate);
                    $("#cartTable tr:gt(0)").each(function () {
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

                    $("#myModal7").modal("show");
                    $('#myModal7').on('hidden.bs.modal', function () {
                        window.location.reload();
                    })
                });
            }
            else {
               // alert('error');
                swal("Error Occured", response.d, "error");
            }
        },
        error: function (response) {
            //alert('error1');
            swal("Error Occured", response.responseText, "error");
        },
        failure: function (response) {
            //alert('error2');
            swal("Request Failed", response.responseText, "warning");
        },
        complete: function () {
        }
    });
}



function saveInvoice() {
    var options = {};
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addHTML($("#Invoice"), 100, 100, options, function () {
        pdf.save('pageContent.pdf');
    });
}
function printInvoice() {
        var options = {};
        var pdf = new jsPDF('p', 'pt', 'a4');
            pdf.addHTML($("#Invoice"), 100, 100, options, function () {
            pdf.save('pageContent.pdf');
        });
    
    var paths = ["TCMeats%202.0/css/bootstrap.min.css",
        "TCMeats%202.0/font-awesome/css/font-awesome.css",
        "TCMeats%202.0/css/plugins/dataTables/datatables.min.css",
        "TCMeats%202.0/css/animate.css",
        "TCMeats%202.0/css/style.css"];
    $("#Invoice").printThis({
        debug: false,               // show the iframe for debugging
        importCSS: true,            // import page CSS
        importStyle: true,         // import style tags
        printContainer: true,       // grab outer container as well as the contents of the selector
        loadCSS: paths,  // path to additional css file - use an array [] for multiple
        pageTitle: "TC Meats Invoice",              // add title to print page
        removeInline: false,        // remove all inline styles from print elements
        printDelay: 100,            // variable print delay
        header: null,               // prefix to html
        footer: null,               // postfix to html
        base: false,               // preserve the BASE tag, or accept a string for the URL
        formValues: true,           // preserve input/form values
        canvas: false,              // copy canvas elements (experimental)
        doctypeString: "",       // enter a different doctype for older markup
        removeScripts: false,       // remove script tags from print content
        copyTagClasses: false       // copy classes from the html & body tag
    });

}