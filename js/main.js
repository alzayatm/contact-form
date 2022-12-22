(function($) {

	"use strict";

  // Form
	var submitToAPI = function(e) {
		if ($('#contactForm').length > 0 ) { 
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				

				submitHandler: function() {		
					var name = $("#name").val();
					var email = $("#email").val();
					var subject = $("#subject").val();
					var message = $("#message").val();
					var data = {
						name : name,
						email : email,
						subject : subject,
						message : message
					};
					
					var $submit = $('.submitting'),
						waitText = 'Submitting...';
					
					$.ajax({   	
				      type: "POST",
				      url: "https://l00t7yjgm9.execute-api.us-east-1.amazonaws.com/stage2/contact-us",
					  contentType: 'application/json',
					  dataType: 'json',
					  data: JSON.stringify(data),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
						console.log(msg["statusCode"]);
		               if (msg["statusCode"] == "200") {
						console.log("in the if");
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeIn();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	setTimeout(function(){
				               $('#form-message-success').fadeOut();   
		               	}, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		               	setTimeout(function(){
		               		$( '#contactForm' ).each(function(){
											    this.reset();
											});
		               	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
						console.log("Failure!")
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	submitToAPI();

})(jQuery);
