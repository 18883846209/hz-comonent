#!/bin/bash

front_pod_name='mobile-war-room-fe-pod-'

function judge() {
   front_flag=`kubectl get pod | grep ${front_pod_name} | grep -v 'Terminating' | awk '{print $3}'`

   for i in $(seq 1 10)  
   do
      sleep 5
      if [ $front_flag == 'Running' ];then
          exit 0
      fi   
      front_flag=`kubectl get pod | grep ${front_pod_name} | grep -v 'Terminating' | awk '{print $3}'`
   done 
   exit 1
}


judge

