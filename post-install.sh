cd app/cache/
mv zone.js@0.6.12 zone@0.6.12.js
mv reflect-metadata@0.1.3 reflect-metadata@0.1.3.js
cd ../../
sed -i -- 's/zone.js@0.6.12/zone@0.6.12.js/g' index.html
sed -i -- 's/reflect-metadata@0.1.3/reflect-metadata@0.1.3.js/g' index.html
