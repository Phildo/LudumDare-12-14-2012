<?php
require_once('config/dbconnection.php');
$debug = false;

$con = new dbconnection();

if(isset($_POST['playerId']) && isset($_POST['secret']))
{
  $pid = addslashes($_POST['playerId']);
  $s = addslashes($_POST['secret']);
  $exists = $con->queryObj("SELECT player_id FROM players WHERE player_id = '".$pid."' AND secret = '".$s."' LIMIT 1;");
  if(!$exists)
    $con->echoResult(1,"invalid user");
  $saveObjs = $con->queryArray("SELECT save_id, save_number, created, last_active FROM saves WHERE player_id = '".$playerId."';");
  $saves = array();
  for($i = 0; $i < count($saveObjs); $i++)
  {
    $saves[$i] = new stdClass;
    $saves[$i]->saveId = $saveObjs[$i]->save_id;
    $saves[$i]->saveNumber = $saveObjs[$i]->save_number;
    $saves[$i]->created = $saveObjs[$i]->created;
    $saves[$i]->lastActive = $saveObjs[$i]->last_active;
  }
  $con->echoResult(0,$saves);
}
else
  $con->echoResult(1,"you are an idiot");

?>
