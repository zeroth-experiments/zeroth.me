---
title: "Process state check using bash script"
slug: process-state-check-using-bash-script
layout: page
published_at: 2010-09-19
article: true
tags:
    - process
    - bash
    - experiment
---

Recently I came across a situation where my server application use to crash randomly, so to keep it always alive I wrote a small bash scrip. Well I know, I have to check my Server application code and fix it but that was the demo time so 1st make it work as it is then we will fix the corner cases ;) .

but bash script is a fun..

This is how my script looks:
```
#!/bin/sh

while true; do
    
    # If process is not running we will get only 1 else 1 + number of instances
    check=`ps ax| grep -c TCPServer`
    if [ "$check" -lt 2 ]; then
        
        echo "not running"
        
        # Start the server again
        
        cd ~/TCPServer/
        
        ./TCPServer > /dev/null 2>&1 &
        
    else
        
        echo "running"
        
    fi
    
    sleep 1m
    
done
```
