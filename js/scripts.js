$(document).ready(function() {
    $("#f-mail-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: "Please enter a valid email address"
        }
    });
});