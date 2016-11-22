# reactiveMaya
A helpful  workflow for getting p5.js (JavaScript) or Processing (Java) and Maya (or any other local socket compatible program) talking to each other.

## Javascript

### To use the JS examples:
1. Download and Install Node.js from <https://nodejs.org>
1. In Maya enter the following in the MEL command bar at the bottom of the screen: `commandPort -n "localhost:4000";`
1. Download this repo
1. Open Terminal and `cd` into the JavaScript directory
1. Then enter `node wsserver/ws.js`
1. Open a new Terminal and `cd` into the same folder and enter `python -m SimpleHTTPServer`
1. Open a browser to 127.0.0.1:8000 and click on either the "mouse" or "colorTracking" example

### To integrate into your own code:
1. Include the socklib.js in your web folder
2. Place `<script src="socklib.js"></script>` in your html file.
3. Inside your the setup function include something like...
```
  sl = new SockLib("127.0.0.1", 9999);
  sl.sendmsg("sphere -n \"new_sphere\";");
```
4. Inside your draw function you can use something like...
```
  sl.sendmsg("move -a -os -wd "+x+" "+y+" 0 \"new_sphere\";");
```
5. You need both files inside the "wsserver" folder. Run them using `node wsserver/ws.js`.

## Java

### Getting Started:
1. Download Processing from http://processing.org
2. In Maya enter the following in the MEL command bar at the bottom of the screen:
```
commandPort -n "localhost:4000";
```
3. In your Processing sketch insert the following lines of code:

  Before the setup function:
  ```
    import processing.net.*;
    Client client;
  ```
  Inside the setup function
  ```
    client = new Client(this, "127.0.0.1", 4000);
  ```
  Then finally do something like the below code in your sketch putting what's in quotes the Maya command you want executed.
  ```
    client.write("CreatePolygonSphere;\n");
  ```

### Java Example:
```
import processing.net.*;

Client client;

void setup(){
  // mel code: commandPort -n "localhost: 4000";
  client = new Client(this, "127.0.0.1", 4000);
  client.write("sphere -n \"new_sphere\";\n");
}

void draw(){
}

void mouseMoved (){
  float x = (mouseX-width/2) *0.1;
  float y = (mouseY-height/2)*0.1;
  client.write("move -a -os -wd "+x+" "+y+" 0 \"new_sphere\";\n");
  println(x+" "+y);
}
```
