(function() {
  "use strict";
  return {
    initialize: function() {
      console.log("My First App!");
      if(page_type == "ticket") {
        var requesterName = domHelper.ticket.getTicketInfo()
          .helpdesk_ticket.requester_name;
        var email = domHelper.ticket.getContactInfo().user.email;
        console.log(email);
        jQuery(this.$container).find('#apptext').text("Ticket created by " + requesterName);

        console.log("My API key is : {{iparam.api_key.description}}");
        var self=this;

var options = { Headers: {
                Accept: "application/json"
                }
              };


var url = 'https://demo5.pipedrive.com/v1/persons/find?term=' + email + '&start=0&search_by_email=1&api_token={{iparam.api_key.description}}';
this.$request.get(url, options)
.done(function(data){
  var jsondata=JSON.parse(data.response);
  console.log(jsondata);
console.log(jsondata.data[0].name);
jQuery(self.$container).find('#apptext').text("Ticket created by " + requesterName);
jQuery(self.$container).find('#name').text("Name: " + jsondata.data[0].name);
jQuery(self.$container).find('#phone').text("Phone No: " + jsondata.data[0].phone);
var url2 = 'https://demo5.pipedrive.com/v1/persons/' + jsondata.data[0].id + '/deals?start=0&status=won&api_token={{iparam.api_key.description}}';
self.$request.get(url2, options)
.done(function(data2) {
  console.log(data2,'welcome');
  var jsondata2=JSON.parse(data2.response);
  //console.log(jsondata2);
  //console.log(jsondata2.data[0].title);
  var arraytitle=[];
  var arrayvalue=[];
  var i=0;
  jsondata2.data.forEach(function(obj){

    var t=obj.title;
    var v=obj.value;
    arraytitle.push(t+ ' : ' +v);
    //arrayvalue.push(v);
    i=i+1;
  });
  console.log(arraytitle);
  console.log(arrayvalue);
  jQuery(self.$container).find('#deals').text(arraytitle);
  //jQuery(self.$container).find('#value').text(arrayvalue);
})
.fail(function(err){
  console.log(err);
});

})
.fail(function(err){
  console.log(err);
});



      }

      else if(page_type == "contact"){
        var agentName = domHelper.contact.getContactInfo().user.name;
        jQuery(this.$container).find('#apptext').text("Hello " + agentName);
      }
    }
  };
})();

/*
{%comment%}

## Help: Using iparam (​installation parameters) in code

iparam: The ​settings that you want your users to configure when installing the
app.

iparam definition is made in config/iparam_en.yml file. To use the defined
iparam in code, use Liquid notation like:

- {{iparam.username}}
- {{iparam.country}}

{%endcomment%}
*/
