<?php
require_once('config/dbconnection.php');
$debug = false;

$con = new dbconnection();

if(isset($_POST['username']) && isset($_POST['password']))
{
  $u = strtolower(addslashes($_POST['username']));
  $p = addslashes($_POST['password']);
  $exists = $con->queryObj("SELECT player_id, secret FROM players WHERE username = '".$u."' AND password = '".md5($p)."' LIMIT 1;");
  if(!$exists)
    $con->echoResult(1,"not in here");
  else
  {
    $loginObj = new stdClass;
    $loginObj->playerId = $exists->player_id;
    $loginObj->secret = $exists->secret;
    $con->echoResult(0,$loginObj);
  }
}
else
  $con->echoResult(1,"you are an idiot");

?>
