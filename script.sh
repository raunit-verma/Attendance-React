npm install

for var in $(printenv | cut -d "=" -f 1); 
do
    echo '$var=${!var}' >> .env
done

npm run build --production

npm install -g serve

serve -s build