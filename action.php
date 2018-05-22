<?php
/**
 * 获取节点的数量
 * 2018-05-22
 */

$nodes_key = $_POST['nodes_key'];
if($nodes_key == 'xw5G12GHWQSGVwXWZSX03VtJHKBfAZzk')
{
    exit(json_encode(
    	array(
    		'number_nodes'=>250,
    		'free_quantity'=>150,
    		'busy_quantity'=>100
    	)
    ));
}else{
	exit('0');
}