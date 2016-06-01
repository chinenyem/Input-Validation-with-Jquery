// validate form, then submit to server via post request
function validate_form () {
    $("#form2").validate({
                    rules: {
                        category_stepone: "required",
                        select_tool_stepone: "required",
                        selectfieldlevel_stepone: "required",
                        ioc_tool_name_stepone: "required",
                        selectfieldlevel_type_stepone:"required",
                        unique_name_tool_stepone: "required",
                        ticket_type_stepone: "required"
                    },
                    messages: {
                        category_stepone: "Please select a category.",
                        select_tool_stepone: "Please select a tool or select 'No Tool Identified.' ",
                        ioc_tool_name_stepone: "Please complete this required.",
                        selectfieldlevel_stepone: "Please select number, 1- 20.",
                        selectfieldlevel_type_stepone: "Please select level of effort.",
                        unique_name_tool_stepone: "Please type a unique tool name or type 'None'.",
                        ticket_type_stepone : "Please select low and slow or regular ticket."
                    },
                    submitHandler: function(form) {
                        var val_name = $("#pseudo_code_ioc_tool").val()
                            
                        $('#real_ioc_tool_name').val(val_name);
                        
                        var vals = $(" #form2").serializeArray();
                        params = {};
                            for (var val in vals) {
                                var valName = vals[val].name;
                                if (params[valName]) {
                                    if (typeof params[valName] === "string") {
                                        params[valName] = [params[valName], vals[val].value];
                                    }
                                    else {
                                        params[valName].push(vals[val].value);
                                    }
                                }
                                else {
                                    params[valName] = vals[val].value;
                                } 
                            }   
                             var stringthis = JSON.stringify(params)
                            //console.log(stringthis)
                            
                            
                            
                             $.post("/ioc_ticket/set_ioc_ticket_analyst", params, function(data) { 
                                            if( typeof data == 'object' )
                                            {
                                                try {
                                                      var response = jQuery.parseJSON(data); 
                                                       console.log(response); 
                                                    }
                                              catch(e) {
                                                       console.log(e);
                                                   }
                                            } 
                                        }); 
                                         function toaster(){
                                            toastr.success('Thank you for completing this form.', 'The CHTA admin will review the Tactic and Technique and approve or reject IOC ticket.')
                                            toastr.options = {
                                                  "closeButton": false,
                                                  "debug": false,
                                                  "newestOnTop": false,
                                                  "progressBar": true,
                                                  "positionClass": "toast-top-center",
                                                  "preventDuplicates": false,
                                                  "onclick": null,
                                                  "hideDuration": "1000",
                                                  "timeOut": "5000",
                                                  "extendedTimeOut": "1000",
                                                  "showEasing": "swing",
                                                  "hideEasing": "linear",
                                                  "showMethod": "fadeIn",
                                                  "hideMethod": "fadeOut"
                                            }
                                        }
                                             function que(){
                                                setTimeout(function(){location.href = '/ioc_ticket/ioc_ticket_que'; }, 3000);
                                            }
                                                $.when(toaster()).then(que)     
                    }
        });    
}