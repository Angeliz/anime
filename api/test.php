<?php
//header("content-Type: text/html; charset=utf-8");//字符编码设置
$servername = "hdm440659420.my3w.com";
$username = "hdm440659420";
$password = "lq671615";
$dbname = "hdm440659420_db";

// 创建连接
$conn =new mysqli($servername, $username, $password, $dbname);
mysqli_query($conn, "SET NAMES UTF8");

// 检测连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$url = $_SERVER['REQUEST_URI'];
$url_arr = explode("?", $url);
$url_arr1=explode("&", $url_arr[1]);
$type0 = explode("=", $url_arr1[0]);
$type=$type0[1];
$value0 = explode("=", $url_arr1[1]);
$value=$value0[1];
$value=urldecode($value);

$sql = "select * from three2";
if($type=="time" and $value=="all"){
	$sql = "select time,count(*),sum(play),avg(play) from three2 group by time";
}else if($type=="time" and $value!="all"){
	$sql = "select * from three2 where time='".$value."' order by play desc";
}else if($type=="label" and $value!="all"){
	$sql = "select * from three2 where label like '".$value."'";
}else if($type=="score" and $value!="all"){
	$sql = "select name,score from three2 order by score desc limit ".$value;
}else if($type=="play" and $value!="all"){
	$sql = "select name,play from three2 order by play desc limit ".$value;
}else if($type=="self" and $value!="all"){
	$sql = "select * from three2 where name='".$value."'";
}

$result = $conn->query($sql);
$arr = array();
// 输出每行数据
while($row = $result->fetch_assoc()) {
    $count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
    for($i=0;$i<$count;$i++){
        unset($row[$i]);//删除冗余数据
    }
    array_push($arr,$row);

}
//print_r($arr);
//$arr1=urlencode($arr);
//$arr2=json_encode($arr1);
//echo urldecode($arr2);

//print_r(json_encode($arr));
echo json_encode($arr,JSON_UNESCAPED_UNICODE);//json编码
$conn->close();

?>