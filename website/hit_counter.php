<?php
$hit_count = @file_get_contents('count.txt');
echo $hit_count;
$hit_count++;
@file_put_contents('count.txt', $hit_count)
?>
