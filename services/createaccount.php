<?php
require_once('config/dbconnection.php');
$debug = false;

$con = new dbconnection();

if(isset($_POST['username']) && isset($_POST['password']))
{
  $u = strtolower(addslashes($_POST['username']));
  $p = addslashes($_POST['password']);
  $exists = $con->queryObj("SELECT player_id FROM players WHERE username = '".$u."' LIMIT 1;");
  if($exists)
    $con->echoResult(1,"username exists");
  else
  {
    $secret = md5($p.'banana'); // <- for those reading this on github, I'm aware that this is public and have changed it in the live implementation
    $newPlayerId = $con->query("INSERT INTO players (username, password, secret, created) VALUES ('".$u."', '".md5($p)."', '".$secret."', NOW());");
    $loginObj = new stdClass;
    $loginObj->playerId = $newPlayerId;
    $loginObj->secret = $secret;
    $con->echoResult(0,$loginObj);
  }
}
else
  $con->echoResult(1,"you are an idiot");

?>
