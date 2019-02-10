$("#button_join").click(function (event) {
    event.preventDefault();
    var displayname = $("#dpname").val();
    var roomname = $("#rname").val();
    $.ajax({
        url: "/user/join",
        type: "post",
        dataType: "json",
        data: {
            displayName: displayname,
            roomName: roomname
        },
        success: function(data){
            if (data.code === 100) {
                // alert("Success");
                $("#msgbox").text("Joining room ... ");
                window.location.href = `/chat.html?name=${displayname}&room=${roomname}`;
            }
            else {
                // alert(data.msg);
                $("#msgbox").text("Invalid display name or room name.");
            }
        },
        error: function(err) {
            console.log(err);
        }
    });
});