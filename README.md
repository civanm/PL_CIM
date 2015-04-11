# C - I'M

Clone the repository using git:

```
git clone https://github.com/civanm/PL_CIM.git
cd material-start
```

If you just want to start a new project:

```bash
git clone --depth=1 https://github.com/civanm/PL_CIM.git <your-project-name>
```


#### Install Dependencies


```
npm install
```

### Running the App 

Install a node.js tool called [http-server][http-server].  You can install http-server globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by running:

```
cd release
http-server -a localhost -p 8000
