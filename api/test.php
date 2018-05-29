<?php
header("content-Type: text/html; charset=utf-8");//字符编码设置
$servername = "hdm440659420.my3w.com";
$username = "hdm440659420";
$password = "lq671615";
$dbname = "hdm440659420_db";

// 创建连接
$conn =new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    echo "chenggong"
}

$sql = "select time,count(*),sum(play),avg(play) from three2 group by time";
$result = $conn->query($sql);
//print_r($result);
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
print_r(json_encode($arr));
//echo json_encode($arr,JSON_UNESCAPED_UNICODE);//json编码
$conn->close();

?>