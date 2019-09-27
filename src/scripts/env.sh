#!/bin/bash
########################################################################
#
#  Copy envs
#
########################################################################
# If os Linux -> parse env.sh and remove empty new lines
if [ `uname -s` = "Linux" ]
then
  sed -i 's/\r$//' env.sh
fi

#----------------------------------------------------------------------#
#                                Vars
#----------------------------------------------------------------------#

### Pathed vars
instance="$1"
#
### Current dir
root=`pwd`
#
### Flag var, to define if copying started
started="false"
#
### Define OS
os=`uname -s`
#
#----------------------------------------------------------------------#
#            Set HOST_IP env var to docker host | host ip
#----------------------------------------------------------------------#
#
if [ -n "$(ifconfig | grep docker0)" ]
then
  export HOST_IP=$(ifconfig docker0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
elif [ -n "$(ifconfig | grep eth0)" ]
then
  export HOST_IP=$(ifconfig eth0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
else
  export HOST_IP=$(ifconfig en0 | grep "inet " | grep -Fv 127.0.0.1 | awk '{print $2}';)
fi
#
#----------------------------------------------------------------------#
#                  SET current launch commit and dateTime
#----------------------------------------------------------------------#

export LAUNCH_COMMIT=`git log --pretty=format:'%h' -n 1`
export LAUNCH_DATE_TIME=`date -u +"%D %T"`
export LAUNCH_BRANCH=`git branch | grep \* | cut -d ' ' -f2`

#----------------------------------------------------------------------#
#                            Escape Meta symbols
#----------------------------------------------------------------------#
#

escapeMetaSymbols() {
  echo $1 | sed 's/ /\\ /g' | sed -e 's/(/\\(/g' | sed -e 's/)/\\)/g' | sed -e 's/\]/\\]/g' | sed -e 's/\[/\\[/g'
}

#----------------------------------------------------------------------#
#                            Go to dir and back
#----------------------------------------------------------------------#

goToDir() {
  if [ -d "$root/env/$instance" ]
  then
    # Show
    echo '   CHOOSEN INSTANSE:' $root/env/$instance
    echo ""
    echo "  ----------------------------------------------------"
    echo ""
#
    # Copying started
    started="true"
#
    # Go to instance
    cd "$root/env/$instance"
#
    # List dirs
    findFile "$root/env/$instance"
#
    # Go to root
    cd "$root"
  else
    echo ">>> Aborted: Incorrect instance, please check once more"
    cd "$root"
  fi
}
#
#----------------------------------------------------------------------#
#                            List all dirs
#----------------------------------------------------------------------#
#
findFile() {
  if [ -e "$1/.env" ]
  then
    # Show current dir
    echo ">> CURRENT DIRECTORY: $1"
#
    # Find .env file in dir or its subdirs and echo it
    env=`find "$root/src" -type f -name ".env"`
    echo ""
    echo "- CURRENT ENV: $1/.env"
    echo "- TARGET ENV: $env"
#
    # Copy vars & show result in console
    echo "- DIFFs:"
    echo ""
    copy "$1/.env" "$env"
    echo "  ----------------------------------------------------"
    echo ""
  fi
}
#
#----------------------------------------------------------------------#
#                              Copy .env
#----------------------------------------------------------------------#
#
copy() {
  if [ $# -eq "2" ]
  then
    # Iterate over .env and push lines into new .env
    while IFS= read -r line
    do
      # Save into var current line, where there is '=' and cutted - leave 1st part
      # The var is env variable name
      var=`echo $line | grep -e '=' | grep -v -e '^#' | cut -d'=' -f 1`
#
      # If there is var -> show diff
      if [ -n "$var" ]
      then
        # Find appropriate env vars in both files
        newEnv=$( escapeMetaSymbols `cat "$1" | grep -e "^$var\b"` )
        oldEnv=$( escapeMetaSymbols `cat "$2" | grep -e "^$var\b"` )
#
        # If there is such var in both files
        if [ "$newEnv" != "$oldEnv" ]
        then
          echo "  > FROM: $oldEnv"
          echo "  > TO: $newEnv"
          echo ""
#
          # Run inline replace, specifically for each OS
          if [ "$os" = "Darwin" ]
          then
            sed -i '' "s|"$oldEnv"|"$newEnv"|" "$2"
          elif [ "$os" = "Linux" ]
          then
            sed -i "s|"$oldEnv"|"$newEnv"|" "$2"
          else
            sed -i "s|"$oldEnv"|"$newEnv"|" "$2"
          fi
        fi
      fi
#
    # Finish loop
    done < "$1";
  else
    echo ">>> Aborted: Please, provide correct args"
  fi
}
#
#----------------------------------------------------------------------#
#                            Proceed further
#----------------------------------------------------------------------#
#
proceed() {
  # Clear console
  clear
#
  # Echo tool title
  echo "
                           _                     _
     ___   _ __   __   __ | |_    ___     ___   | |
    / _ \ | '_ \  \ \ / / | __|  / _ \   / _ \  | |
   |  __/ | | | |  \ V /  | |_  | (_) | | (_) | | |
    \___| |_| |_|   \_/    \__|  \___/   \___/  |_|
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
  #                  COPYING ENV ...
  ####################################################
  "
#
  # Go to dir
  goToDir

  # Echo end
  if [ $started == "true" ]
  then
    echo "
  ####################################################
  #                     COPIED
  ####################################################
  "
  fi
}
#
#----------------------------------------------------------------------#
#                            Main condition
#----------------------------------------------------------------------#
#
### If args not provided -> stop
if [ $# -lt "1" ]
then
  echo ">>> Aborted: Please, provide vars: Instance "
else
  proceed
fi
