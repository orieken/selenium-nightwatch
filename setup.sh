optn=0
echo "Dead-easy acceptance testing for your Meteor app with Selenium and Nightwatch."
echo "How do you want to run nightwatch in the future [1, 2 or 3]?"
echo "1. As a Package"
echo "2. From App Root"
echo "3. With Velocity"
read optn


if [ $optn -eq 1 ] ; then

     echo "From Package"
     echo "installing nightwatch in .meteor/local/build"
     cd ../../.meteor/local/build && sudo npm install nightwatch@0.5.3 && cd ../../../packages/selenium-nightwatch
     ln -s packages/selenium-nightwatch/launch_nightwatch_from_package.sh run_nightwatch.sh


else

       if [ $optn -eq 2 ] ; then
             echo "From App's root (I prefer this too!)"
             echo "installing nightwatch in .meteor/local/build"
             cd .meteor/local/build && sudo npm install nightwatch@0.5.3 && cd ../../../
             ln -s packages/selenium-nightwatch/launch_nightwatch_from_app_root.sh run_nightwatch.sh
       else
             if [ $optn -eq 3 ] ; then
                   echo "Along with Velocity"
                   echo "installing nightwatch in .meteor/local/build"
                   cd .meteor/local/build && sudo npm install nightwatch@0.5.3 && cd ../../../
                   ln -s packages/selenium-nightwatch/launch_nightwatch_from_velocity.sh run_nightwatch.sh
             else
                   echo "Invalid option chosen"
                   exit 1
             fi
       fi
fi

chmod +x run_nightwatch.sh
echo ""
echo ""
echo ""
echo "An appropriate symlink, run_nightwatch.sh has been added to your app's root."
echo "Simply run that from here forth."
echo ""
echo ""
