function getURLParam(param)
{
  var params = location.search.substr(location.search.indexOf("?")+1);
  params = params.split("&");
  var value = "";
  for (var i = 0; i < params.length; i++)
  {
    temp = params[i].split("=");
    if ( [temp[0]] == param ) { value = temp[1]; }
  }
  return value;
}

function callService(serviceName, callback, GETparams, POSTparams)
{
  var url;
  vc.incrementLoadingCount();
  if(GETparams)
    url = 'services/'+serviceName+'.php'+GETparams;
  else
    url = 'services/'+serviceName+'.php';
  var request = new XMLHttpRequest();
  request.onreadystatechange = function()
  {
    if(request.readyState == 4)
    {
      vc.decrementLoadingCount();
      if(request.status == 200)
        callback(request.responseText);
      else
        callback(false);
    }
  };
  if(POSTparams)
  {
    request.open('POST', url, true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(POSTparams);
  }
  else
  {
    request.open('GET', url, true);
    request.send();
  }
}
