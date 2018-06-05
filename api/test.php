<?php
//header("content-Type: text/html; charset=utf-8");//字符编码设置
$servername = "";
$username = "";
$password = "";
$dbname = "";

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

$arr = array();
$label_list=array("周边","益智","青春","亲子","番剧","Cosplay","真人","原创","传媒大学作品","短片","搞笑","热血","励志","国漫","ACG","特别版","动作","冒险","剧情","悬疑","科幻","战斗","声控","动态漫","都市","治愈","竞技","出品","奇幻","猎奇","日常","童话","教育","魔幻","漫改","武侠","古风","经典","历史","战争","古代","时泪","致郁","少儿","怀旧","电影版","恋爱","校园","儿童益智","玄幻","同人","惊悚","侦探","神话","神魔","TV版","7-13","宠物","机战","魔法","萌系","言情","LOLI","14-17","电影学院作品","推理","泡面","特摄","动画电影","少女","未来","音乐","体育","偶像","百合","智斗","游戏改","后宫","催泪","OVA版","装逼","基腐","剧场版","运动","萝莉","儿童搞笑","少年","少儿经典","社团","布袋戏","美食");
if($type=="label" and $value=="all"){
	for ($i = 0; $i < sizeof($label_list); $i++) { 
		$sql="select count(*) from three2 where slabel like '%".$label_list[$i]."%'";
		$result = $conn->query($sql);
		while($row = $result->fetch_assoc()) {
			$obj = array("count" => $row["count(*)"],"label"=>$label_list[$i]);
		}
		array_push($arr,$obj);
	}  
}else{
	$sql = "select * from three2";
	if($type=="time" and $value=="all"){
		$sql = "select time,count(*),sum(play),avg(play) from three2 group by time";
	}else if($type=="time" and $value!="all"){
		$sql = "select * from three2 where time='".$value."' order by play desc";
	}else if($type=="label" and $value!="all"){
		$sql = "select * from three2 where label like '%".$value."%' order by play desc" ;
	}else if($type=="score" and $value!="all"){
		$sql = "select name,score from three2 order by score desc limit ".$value;
	}else if($type=="play" and $value!="all"){
		$sql = "select name,play from three2 order by play desc limit ".$value;
	}else if($type=="self" and $value!="all"){
		$sql = "select * from three2 where name='".$value."'";
	}
	$result = $conn->query($sql);
//	$arr = array();
	// 输出每行数据
	while($row = $result->fetch_assoc()) {
		$count=count($row);//不能在循环语句中，由于每次删除row数组长度都减小
		for($i=0;$i<$count;$i++){
			unset($row[$i]);//删除冗余数据
		}
		array_push($arr,$row);
	}
}



echo json_encode($arr,JSON_UNESCAPED_UNICODE);//json编码
$conn->close();

?>