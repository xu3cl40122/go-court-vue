yarn build --dest frontend
scp -i D:\Lee\sideProject\god\gc-service.pem -r ./frontend  ec2-user@ec2-52-11-194-84.us-west-2.compute.amazonaws.com:/home/ec2-user/projects/gc-nginx/
ssh -i D:\Lee\sideProject\god\gc-service.pem ec2-user@ec2-52-11-194-84.us-west-2.compute.amazonaws.com sudo bash /home/ec2-user/projects/gc-nginx/deployFrontend.sh