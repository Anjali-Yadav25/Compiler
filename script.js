var mainurl = "https://codequotient.com/api/";
var langselect = document.getElementById("langselect");
var editor = document.getElementById("inp");
var output =document.getElementById("output");
var sendlangID;

function fun(){
  var lang = document.getElementById("langselect").value;
  console.log(lang);
  switch(lang){
    case "C":
      sendlangID = "7";
      break;
    case "CPP":
      sendlangID = "77";
      break;
    case "Python":
      sendlangID = "0";
      break;
    case "Java":
      sendlangID = "8";
      break;
    case "JavaScript":
      sendlangID = "4";
      break;
    default:
      sendlangID = "4";    
  }
  sendcode = editor.value;
  //console.log(sendcode);
  sendrequset();
}

function getresponse(codeId){
  var url = mainurl + "codeResult/" + codeId;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
  //console.log("bye")
  //console.log(request.responseText);

  request.addEventListener("load", function () {
    var response = JSON.parse(request.responseText);
    console.log(response.data);
    var data = JSON.parse(response.data);
    if(data.status == "Pending"){
      getresponse(codeId);
    }
    else if(data.errors != ""){
      output.innerText = "error";
    }
    else{
      output.innerText = data.output;
    }
    //console.log(data);
  })
  //console.log("end");
  
}

function sendrequset(){
  var url = mainurl + "executeCode";
  var obj = {
    code : sendcode,
    langId : sendlangID
  };

  // AJAX request
  var request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(obj));
  console.log("ok");

  //response
  request.addEventListener("load",function(){
    console.log("done");
    var response = JSON.parse(request.responseText);
    if ("codeId" in response){
      console.log(response.codeId);
      getresponse(response.codeId);
    }
    else{
      console.log("error");
    }
  });
}  

