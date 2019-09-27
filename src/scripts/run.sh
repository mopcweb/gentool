#!/bin/bash
########################################################################
#
#                      Run all docker-containers
#
########################################################################
# If os Linux -> parse env.sh and remove empty new lines
if [ `uname -s` = "Linux" ]
then
  sed -i 's/\r$//' run.sh
fi

#----------------------------------------------------------------------#
#                                Vars
#----------------------------------------------------------------------#

### Define OS
os=`uname -s`

#----------------------------------------------------------------------#
#            Set HOST_IP env var to docker host | host ip
#----------------------------------------------------------------------#

if [ -n "$(ifconfig | grep docker0)" ]
then
  export HOST_IP=$(ifconfig docker0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
elif [ -n "$(ifconfig | grep eth0)" ]
then
  export HOST_IP=$(ifconfig eth0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
else
  export HOST_IP=$(ifconfig en0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
fi

#----------------------------------------------------------------------#
#                  SET current launch commit and dateTime
#----------------------------------------------------------------------#

export LAUNCH_COMMIT=`git log --pretty=format:'%h' -n 1`
export LAUNCH_DATE_TIME=`date -u +"%D %T"`
export LAUNCH_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

#----------------------------------------------------------------------#
#                     Launch all script + greetings
#----------------------------------------------------------------------#

all() {
  # Clear console
  clear

  # Echo tool title
  echo "
    ____    _   _   _   _        _      _       _
   |  _ \  | | | | | \ | |      / \    | |     | |
   | |_) | | | | | |  \| |     / _ \   | |     | |
   |  _ <  | |_| | | |\  |    / ___ \  | |___  | |___
   |_| \_\  \___/  |_| \_|   /_/   \_\ |_____| |_____|
  "

  echo "  Your operating system is: $os"
  if [ -n "$HOST_IP" ]
    then
      echo "  Your host IP is: $HOST_IP"
  fi
  if [ -n "$LAUNCH_BRANCH" ]
    then
      echo "  Branch: $LAUNCH_BRANCH"
  fi
  if [ -n "$LAUNCH_COMMIT" ]
    then
      echo "  Running from commit: $LAUNCH_COMMIT"
  fi
  if [ -n "$LAUNCH_DATE_TIME" ]
    then
      echo "  Running since: $LAUNCH_DATE_TIME"
  fi

  # Echo start
  echo "
  ####################################################
                 RUNNING ALL DOCKERS ...
  ####################################################
  "

  # Run
  run

  # Echo end
  echo "
  ####################################################
                        DONE
  ####################################################
  "
}

#----------------------------------------------------------------------#
#                               Run all
#----------------------------------------------------------------------#

run () {
  echo "> RUNNING DOCKER ..."
  echo ""
  cd src/ && docker-compose up -d --build
  echo "
  ----------------------------------------------------
  "

  cd ..;
}

# Follow logs for all
logs () {
  docker ps -q | xargs -P 15 -L 1 docker logs --follow;
}

# Share script into shell
"$@"
