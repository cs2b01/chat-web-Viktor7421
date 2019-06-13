var currentUserId = 0;
var currentClickedId = 0;
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
                allusers();
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
                    f = '<a class="list-group-item list-group-item-action" onclick=limpiar();loadMessages('+currentUserId+','+response[i].id+') >';
                    f = f + response[i].username;
                    f = f + '</a>';
                    $('#allusers').append(f);
                    }
                    i = i+1;
                });
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function loadMessages(user_from_id, user_to_id){
        //alert(user_from_id);
        //alert(user_to_id);
        currentClickedId = user_to_id;
        $.ajax({
            url:'/messages/'+user_from_id+"/"+user_to_id,
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                var i = 0;
                $.each(response, function(){
                    if(currentUserId == response[i].user_from_id){
                    f = '<div class="alert alert-primary" role="alert" id="message_'+i+'">';
                    } else {
                    f = '<div class="alert alert-secondary" role="alert" id="message_'+i+'">';
                    }
                    f = f + response[i].content;
                    f = f + '</div>';
                    $('#messages').append(f);
                    i = i+1;
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
                //alert(JSON.stringify(response));
                limpiar();
                loadMessages(currentUserId,currentClickedId);
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });


    }
