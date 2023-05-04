sudo chmod 600 ./id_ed25519
eval `ssh-agent`
ssh-add ./id_ed25519
cat lesson1.py | ssh -6 student@202:9292:712f:a3ef:4a7e:b2b2:b45b:7e09 python3 -