<?php
/**
 * 获取节点的数量
 * 2018-05-22
 */

$nodes_key = $_POST['nodes_key'];
if($nodes_key == 'xw5G12GHWQSGVwXWZSX03VtJHKBfAZzk')
{
	$free_quantity = rand(125,175); //空闲节点
	$busy_quantity = rand(75,125); //繁忙节点
	$number_nodes = $free_quantity + $busy_quantity; //节点总数

    exit(json_encode(
    	array(
    		'number_nodes' => $number_nodes,
    		'free_quantity' => $free_quantity,
    		'busy_quantity' => $busy_quantity
    	)
    ));
}else{
	exit('0');
}