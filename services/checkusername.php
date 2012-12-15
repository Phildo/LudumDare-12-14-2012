<?php
require_once('config/dbconnection.php');
$debug = false;

$con = new dbconnection();

if(isset($_POST['username']))
{
  $u = strtolower(addslashes($_POST['username']));
  $exists = $con->queryObj("SELECT player_id FROM players WHERE username = '".$u."' LIMIT 1;");
  if($exists)
    $con->echoResult(0,"username exists");
  else
    $con->echoResult(0,"username does not exist");
}
else
  $con->echoResult(1,"you are an idiot");

?>
