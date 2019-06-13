var currentUserId = 0;
function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id']
                $('#cu_name').html(name);
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }
function allusers(){
        $.ajax({
            url:'/users',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    if(currentUserId != response[i].id){
                        f = '<a onclick="limpiar();load_messages('+currentUserId+','+response[i].id+')" class="list-group-item list-group-item-action">';
                        f = f + response[i].username;
                        f = f + '</a>';
                        $('#allusers').append(f);}
                    i = i+1;
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

function load_messages(user_from_id,user_to_id){
    $.ajax({
        url:'/messages/'+user_from_id+'/'+user_to_id,
        type:'GET',
        contentType: 'application/json',
        dataType:'json',
        success: function(response){
                var i = 0;
                for()
                $.each(response, function(){
                    f = '<div class="alert alert-primary" role="alert" id="'+i+'">';
                    f = f + response[i].content;
                    f = f + '</div>';
                    i = i+1;
                    $('#messages').append(f);
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
    });
}

function limpiar(){
    document.getElementById('messages').innerHTML="";
}

function sendMessage(){
        var message = $('#postmessage').val();
        $('#postmessage').val('');

        var data = JSON.stringify({
                "user_from_id": currentUserId,
                "user_to_id": currentClickedId,
                "content": message
            });

        $.ajax({
            url:'/send_messages',
            type:'POST',
            contentType: 'application/json',
            data : data,
            dataType:'json',
            success: function(response){
                limpiar();
                load_messages(currentUserId,currentClickedId);
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });


    }
