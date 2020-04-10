#!/bin/bash

#删除topic
function delete_topic() {
   #判断toipic是否存在
   topic_name=$(kubectl exec -it kafka-0 -- /bin/bash -c "sh /opt/kafka/bin/kafka-topics.sh --zookeeper zookeeper-cs:2181 --list"|grep $1)
   if [ "$topic_name" != "" ];then
       echo "$1 存在,删除"
       kubectl exec -it kafka-0 -- /bin/bash -c "sh /opt/kafka/bin/kafka-topics.sh --delete --zookeeper zookeeper-cs:2181 --topic $1"
   fi
}

#delete_topic "mg-ac-operator-topic"

