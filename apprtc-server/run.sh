sed -i "s/ICE_SERVER_PORT/${ICE_SERVER_PORT}/g" /apprtc/out/app_engine/constants.py
sed -i "s/WSS_SERVER_PORT/${WSS_SERVER_PORT}/g" /apprtc/out/app_engine/constants.py
sed -i "s/RS_SERVER/${RS_SERVER}/g" /apprtc_supervisord.conf
sed -i "s/ROOM_SERVER_PORT/${ROOM_SERVER_PORT}/g" /apprtc_supervisord.conf

supervisord -c /apprtc_supervisord.conf