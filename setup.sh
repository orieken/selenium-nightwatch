optn=0
echo "Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch."

if [${PWD##*/} -eq "selenium-nightwatch"]; then
  echo "You're in the selenium-nightwatch directory.  Running launch_nightwatch_from_package script."
  sudo ./launch_nightwatch_from_package.sh
else
  echo "How do you want to install nightwatch [1 or 2]?"
  echo ""
  echo "1. Each time tests are run.  Slightly slower; but handles Meteor resets, updates, and rebundles. (recommended)"
  echo "2. Globally.  Tests run faster as long as you don't reset or update or rebundle your Meteor app.  If you update or rebundle your app, you'll have to rerun this setup script."
  read optn

  if [ $optn -eq 1 ] ; then
      echo "Setting Nightwatch up to install each time tests are run."
      echo "Linking scripts"
      ln -s packages/selenium-nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
  else
      echo "Installing nightwatch globally in .meteor/local/build"
      cd .meteor/local/build && sudo npm install nightwatch@0.5.3 && cd ../../../
      ln -s packages/selenium-nightwatch/install_nightwatch_globally_from_app_root.sh run_nightwatch.sh
  fi
fi


chmod +x run_nightwatch.sh
echo ""
echo ""
echo "An appropriate symlink, run_nightwatch.sh has been added to your app's root."
echo "Simply run that from here forth."
echo ""
