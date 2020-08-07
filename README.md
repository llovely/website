# website

This is the source code for my personal website: [luislove.dev](https://luislove.dev)

The following were used to create this website:

* [Node.js](https://nodejs.org/en/about/)
* [React](https://reactjs.org/) (Front-end)
* [Express](https://expressjs.com/) (Back-end)
* [Google Domains](https://domains.google/)
* [Amazon Lightsail](https://aws.amazon.com/lightsail/) (Hosting)

Since my website uses the *.dev* top-level domain, it required the use of HTTPS and an SSL certificate to load. Luckily, Amazon Lightsail was able to provide an SSL certificate quickly and easily. More information on this can be found [here](https://aws.amazon.com/premiumsupport/knowledge-center/linux-lightsail-ssl-bitnami/).

For those wishing to clone/fork this repository for their own personal use, see the sections below for installation and usage details.


## Installation:

Make sure that your have installed [Node.js](https://nodejs.org/en/) on your system, before continuing. Details on this can be found [here](https://nodejs.org/en/download/).

Download and enter the newly cloned repository by executing:
```bash
$ git clone https://github.com/llovely/website.git website 
$ cd website
```

Execute the following commands from the root of this repository in order to install dependancies:
```bash
$ npm install 
$ npm run server-install
$ npm run client-install
```

## Usage:

Before launching this website, three items must be addressed:

1. The ports used by the server and client are specified in Line #10 of [package.json](https://github.com/llovely/website/blob/master/package.json). Change these port numbers, if you wish.
   
   ```
   "start": "concurrently \"PORT=9000 npm run server\" \"PORT=3000 npm run client\""
   ```

2. A *.env* file needs to be created in the [client](https://github.com/llovely/website/blob/master/client) directory (this file will not be under version control) in order for to provide it the server's address and relevant hyperlinks. An example *.env* file is shown below:

   ```bash
   # Server's URL
   REACT_APP_SERVER_URL=http://localhost:9000

   # Your Email Address
   REACT_APP_EMAIL=me@example.com

   # Your Github Page URL
   REACT_APP_GITHUB=https://github.com/my_profile

   # Your LinkedIn Page URL
   REACT_APP_LINKEDIN=https://www.linkedin.com/in/my_profile
   ```

3. A *.env* file needs to be created in the [server](https://github.com/llovely/website/blob/master/server) directory (this file will not be under version control) in order for it to be able to send emails, on request from the client's contact form. An example *.env* file is shown below:

   ```bash
   # Credentials for your SMTP Server
   USER_EMAIL=my_email@example.com
   USER_PASS=PASSWORD

   # You may wish to send email as a differnt user (otherwise, just use the same
   # email address as above)
   SEND_AS_EMAIL=my_email@example.com
   ```

From within the root of this repository, the commands listed below can be used to run the client and/or server:
```bash
# Launches the server (Back-end)
npm run server

# Launches the client (Front-end)
npm run client

# Launches both the server and client
npm start
```
