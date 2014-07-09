optn=0
echo ""
echo "=============================================================================="
echo "Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch."

if [ ${PWD##*/} == "selenium-nightwatch" ] ; then
  echo "You're in the selenium-nightwatch directory.  Running launch_nightwatch_from_package script."
  sudo ./launch_nightwatch_from_package.sh
else
  echo ""
  echo "How do you want to install Selenium-Nightwatch?"
  #echo "Nightwatch has to attach itself to the compiled application that the Meteor bundler produces; so it gets removed any time you reset or update or rebundle your app.  You can either install Nightwatch globally, in which case it will run faster, but get uninstalled whenever you rebundle the entire app.  Or you can install it each time you run your tests, which will be slightly slower, but more robust."
  echo ""
  echo "1. Each time tests are run.  Slightly slower; more robust. (recommended)"
  echo "2. Once globally.  Slightly faster; more brittle.  Requires reinstalls."
  echo ""
  read optn

  if [ $optn -eq 1 ] ; then
      echo ""
      echo "Setting Nightwatch up to install each time tests are run..."
      echo "Linking scripts..."
      ln -s packages/selenium-nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
  else
      echo ""
      echo "Installing nightwatch globally in .meteor/local/build"
      cd .meteor/local/build && sudo npm install nightwatch@0.5.3 && cd ../../../
      ln -s packages/selenium-nightwatch/install_nightwatch_globally_from_app_root.sh run_nightwatch.sh
  fi
fi


chmod +x run_nightwatch.sh
echo "Adding run_nightwatch.sh symlink to your app's root."
echo "Done!"
echo ""
