FROM ubuntu
LABEL maintainer="Piasy Xu (xz4215@gmail.com)"

WORKDIR /

ENV GAE_VER 1.9.86
ENV GOLANG_VER 1.13.1

RUN apt-get update -y

# Deps
RUN apt-get install -y build-essential vim git curl wget unzip python2.7 python-pil python-webtest python-pip libssl-dev openjdk-8-jdk && \
    rm -rf /usr/lib/python2.7/dist-packages/supervisor* && \
    pip install supervisor requests && \
    pip install git+https://github.com/bendikro/supervisord-dependent-startup

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Golang
ENV GOLANG_TAR go$GOLANG_VER.linux-amd64.tar.gz
RUN wget https://storage.googleapis.com/golang/$GOLANG_TAR
RUN tar -C /usr/local -xzf $GOLANG_TAR
ENV PATH $PATH:/usr/local/go/bin
ENV GOPATH /goWorkspace
RUN mkdir -p $GOPATH/src

# Google App Engine
ENV GAE_ZIP google_appengine_$GAE_VER.zip
RUN wget https://storage.googleapis.com/appengine-sdks/featured/$GAE_ZIP
RUN unzip $GAE_ZIP -d /usr/local
ENV PATH $PATH:/usr/local/google_appengine


# AppRTC
WORKDIR /
RUN git clone https://github.com/webrtc/apprtc.git

WORKDIR apprtc

RUN ln -s /apprtc/src/collider/collider $GOPATH/src
RUN ln -s /apprtc/src/collider/collidermain $GOPATH/src
RUN ln -s /apprtc/src/collider/collidertest $GOPATH/src
RUN go get collidermain
RUN go install collidermain

RUN npm install -g npm
RUN npm install -g grunt-cli

RUN npm install
RUN grunt build

WORKDIR /

COPY constants.py /apprtc/out/app_engine/constants.py

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY apprtc_supervisord.conf /

COPY run.sh /
RUN chmod +x /run.sh
RUN mkdir -p /webrtc_avconf
RUN mkdir -p /cert
COPY *.pem /cert/
EXPOSE 8080 8081 8089
CMD /run.sh

