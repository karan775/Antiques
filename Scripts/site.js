// Creating Antiques object for api json format 
let Antique = { Id: 0, CulteralOrigin: "", Manufacturer: "", Material: "", Condition: 0 }


// when document is ready then populate the data into table fields
$(document).ready(function () {
    PopulateAntiquesData();
});


// show all the Antiques data
function ShowValues(Values) {
    // Iterate over the collection of data
    $("#AT tbody").remove();

    // for each value in values insert it as tr
    $.each(Values, function (index,Value) {
        // Add new row to the Table
        InsertTR(Value);
    });
}
// Add a row to the Table
function InsertTR(Value) {
    // make sure  <tbody> tag exists
    if ($("#AT tbody").length == 0) {
        // add one if not
        $("#AT").append("<tbody></tbody>");
    }
  
    // create a row to append at the end of table
    var tr = "<tr><td><input   class='co form-control' type='text' value='" + Value.CulteralOrigin + "'/></td>" +"<td><input  class='m form-control'  type='text' value='" + Value.Manufacturer + "'/></td>" +
        "<td><input  class='mat form-control' type='text' value='" + Value.Material + "'/></td>" + "<td><input  class='con form-control' type='text' value='" + Value.Condition + "'/></td>" +
        "<td>" + "<button type='button' " + "onclick='Update(this);' " + "class='btn btn-warning' " + "data-id='" + Value.Id + "' " + "data-co='" + Value.CulteralOrigin + "' " + "data-m='" + Value.Manufacturer + "' " + "data-mat='" + Value.Material + "' " + "data-con='" + Value.Condition + "' " + ">" + "Update" + "</button> " + " <button type='button' " + "onclick='Delete(this);'" + "class='btn-danger btn' " + "data-id='" + Value.Id + "'>" + "Delete" + "</button>" + "</td>" +
        "</tr>";

    // at the end Append row
    $("#AT tbody").append(tr);
}

// function to add the data
function Add(Value) {
    // preparing data to send with request
    var _antiquesObj = Antique;
    _antiquesObj.CulteralOrigin = $("#co").val();
    _antiquesObj.Manufacturer = $("#m").val();
    _antiquesObj.Material = $('#mat').val();
    _antiquesObj.Condition = $('#con').val();
    
    // ajax settings for request
    var _oa = {};
    _oa.url = "/api/Antiques";
    _oa.type = "POST";

    _oa.contentType = "application/json";
    _oa.dataType = "html";
    // converting data to json
    _oa.data = JSON.stringify(_antiquesObj);
    _oa.success = function (msg) {
        // update list
        PopulateAntiquesData();
        // show message
        iziToast.show({ title:"success", message:"Added Successfully"});

    },
        _oa.error = function () {
        iziToast.show({ title: "Error", message: "Adding  Error" });
        };
    $.ajax(_oa);
}

// Function to update the data
function Update(Value) {
    var id = $(Value).data("id");
    
    var _oa = {};
    _oa.url = "/api/Antiques/" + id
    _oa.type = "PUT";

    var _antiqueObj = Antique;
    _antiqueObj.Id = id
    _antiqueObj.CulteralOrigin = $(".co", $(Value).parent().parent()).val();
    _antiqueObj.Manufacturer = $(".m", $(Value).parent().parent()).val();
    _antiqueObj.Material = $(".mat", $(Value).parent().parent()).val();
    _antiqueObj.Condition = $(".con", $(Value).parent().parent()).val();

    console.log(_antiqueObj);

    _oa.contentType = "application/json";
    _oa.dataType = "html";
    _oa.data = JSON.stringify(_antiqueObj);
    _oa.success = function (msg) {
        iziToast.show({ title:"Success",message: " item updated successfully"});
    };
    _oa.error = function () {
        iziToast.show({title: "Error", message:"Updating Error"});
    };
    $.ajax(_oa);
}

// function to delete data
function Delete(Value) {
    var id = $(Value).data("id");
    var _oa = {};
    _oa.url = "/api/Antiques/" + id;
    _oa.type = "DELETE";
    _oa.dataType = "html";
    _oa.success = function (msg) {

        iziToast.show({title: "Success", message: " Item deleted Successfully"});
        PopulateAntiquesData();
    };
    _oa.error = function () {
        iziToast.show({ title:"Error",message:"Deleting Error"});
    };
    $.ajax(_oa);
}


//get all the antiques data from Web API
function PopulateAntiquesData() {
    // Calling API AJX
    $.ajax({
        url: '/api/Antiques/',
        type: 'GET',
        dataType: 'json',
        // on success
        success: function (Values) {
            ShowValues(Values);
        },
        // on error
        error: function (request, message, error) {
            var msg = "Code: " + request.status + "\n" + "Text: " + request.statusText + "\n";
            if (request.responseJSON != null) {
                msg += "Message" + request.responseJSON.Message + "\n";
            }
            iziToast.show({ title: "Error", message: msg });
        }
    });
}
