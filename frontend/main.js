$(document).ready(function(){
    // Date Time Picker
    $('#target_datenew').datepicker({
        uiLibrary: 'bootstrap4',
    });

    $('#target_date_edit').datepicker({
        uiLibrary: 'bootstrap4',
    });

    let featureTemplate = $('#feature_template').html();

    function addFeature(feature) {
        $('#tbody').append(Mustache.render(featureTemplate, feature));
    };

    function getAllFeatures(features) {
        let dats = []
        $.map(features, function(feature, i){
            dats.push(Mustache.render(featureTemplate, feature));
        });
        $('#tbody').html(dats);
    };



    // Get Features
    $.ajax({
        type: 'GET',
        url: 'http://backend:5000/feature',
        success: function(data) {
            getAllFeatures(data);
        },
        error: function() {
            alert('Error Loading Data');
        }
    });


    // Create features
    $("#createFeatures").submit(function(e){
        e.preventDefault();
        const title = $('#titlenew').val();
        const description = $('#descriptionnew').val();
        const client = $('#clientnew').val()
        const priority = $('#prioritynew').val()
        const target_date = $('#target_datenew').val()
        const product_area = $('#product_areanew').val()

        const data = JSON.stringify({'title':title, 'description':description, 'client':client, 'priority':priority, 'target_date':target_date, 'product_area':product_area})

        $.ajax({
            url: 'http://backend:5000/feature',
            dataType: 'json',
            type: "POST",
            contentType: 'application/json',
            data: data,
            processData: false,
            success: function (feature) {
                addFeature(feature)
            },
            error: function() {
                alert("Error Adding Data");
            }
        });

        $('#addFeaturesRequest').modal('hide')
    });


    // sort by client name
    $("#sortClient").css({'cursor':'pointer'})
    $("#sortClient").click(function(e){
        $.ajax({
            type: 'GET',
            url: 'http://backend:5000/feature/order?by=' + e.currentTarget.className,
            success: function(data) {
                getAllFeatures(data);
            },
            error: function() {
                alert('Error Loading Data');
            }
        });
    });


    // sort by priority
    $("#sortPriority").css({'cursor':'pointer'})
    $("#sortPriority").click(function(e){
        $.ajax({
            type: 'GET',
            url: 'http://backend:5000/feature/order?by=' + e.currentTarget.className,
            success: function(data) {
                getAllFeatures(data);
            },
            error: function() {
                alert('Error Loading Data');
            }
        });
    });


    // sort by id
    $("#sortId").css({'cursor':'pointer'})
    $("#sortId").click(function(e){
        $.ajax({
            type: 'GET',
            url: 'http://backend:5000/feature/order?by=' + e.currentTarget.className,
            success: function(data) {
                getAllFeatures(data);
            },
            error: function() {
                alert('Error Loading Data');
            }
        });
    });

    // Delete
    $("#container").delegate('.delete','click',function(e){
        const f = $(this).closest("tr");
        console.log(f);
        $.ajax({
            type: 'DELETE',
            url: 'http://backend:5000/feature/' + e.currentTarget.id,
            success: function(data){
                f.fadeOut(300, function(){
                    f.remove();
                });
            },
            error: function() {
                alert('Error Loading Data');
            }
        });
    });

    // Complete
    $("#container").delegate('.complete','click',function(e){
        const f = $(this).closest("tr");
        $.ajax({
            type: 'PUT',
            url: 'http://backend:5000/feature/' + e.currentTarget.id + '/complete',
            success: function(data){
                $('#complete_tr' + data.id ).html('Done');
            },
            error: function() {
                alert('Error Loading Data');
            }
        });
    });

    // Edit
    $("#container").delegate('.edit','click',function(e){
        console.log(e);
        $('.client').removeAttr('selected');
        const f = $(this).closest("tr");
        const title = f.find('td.title')[0].textContent;
        const description = f.find('td.description')[0].textContent;
        const client = f.find('td.client')[0].textContent;
        const priority = f.find('td.priority')[0].textContent;
        const target_date = f.find('td.target_date')[0].textContent;
        const product_area = f.find('td.product_area')[0].textContent;
        
        $('#id_edit').val( e.currentTarget.id );
        $('#title_edit').val( title.trim() );
        $('#description_edit').val( description.trim() );
        $('select#client_edit option:contains("'+ client.trim() + '")').prop('selected', true);
        $('#priority_edit').val( priority.trim() );
        $('#target_date_edit').val( target_date.trim() );
        $('select#product_area_edit option:contains("'+ product_area.trim() + '")').prop('selected', true);

    });
    

    // Update features
    $("#container").delegate('#editFeatures', 'submit', function(e){
        e.preventDefault();
        console.log(e)
        const id = $('#id_edit').val();
        const title = $('#title_edit').val();
        const description = $('#description_edit').val();
        const client = $('#client_edit').val()
        const priority = $('#priority_edit').val()
        const target_date = $('#target_date_edit').val()
        const product_area = $('#product_area_edit').val()

        const data = JSON.stringify({'title':title, 'description':description, 'client':client, 'priority':priority, 'target_date':target_date, 'product_area':product_area})

        $.ajax({
            url: 'http://backend:5000/feature/' + id,
            dataType: 'json',
            type: "PUT",
            contentType: 'application/json',
            data: data,
            processData: false,
            success: function () {
                $('#title' + id.trim()).html(title);
                $('#description' + id.trim()).html(description);
                $('#client' + id.trim()).html(client);
                $('#priority' + id.trim()).html(priority);
                $('#target_date' + id.trim()).html(target_date);
                $('#product_area' + id.trim()).html(product_area);
            },
            error: function() {
                alert("Error Adding Data");
            }
        });
        $('#editFeaturesRequest').modal('hide')
    });

});