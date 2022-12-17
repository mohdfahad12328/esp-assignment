#include<SoftwareSerial.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

SoftwareSerial mySUART(4, 5);  //D2, D1

const char *ssid = "AndroidAP_1003";
const char *pswd = "12345678";
const char *host = "192.168.197.16";

const uint16_t port = 8000;
WiFiClient client;
ESP8266WiFiMulti wifiMulti;

String inId;
int cnt = 0;

typedef struct table{
  String uuid;
  String name;
  String roll;
  String length;
  }Table;

#define table_size 2
Table arr[table_size];

void init_table()
{
  arr[0].uuid = "21 35 56 1D";
  arr[0].name = "aymen";
  arr[0].roll = "160120735037";
  arr[0].length = "46";

  arr[1].uuid = "21 A2 B8 26";
  arr[1].name = "ram";
  arr[1].roll = "160120735042";
  arr[1].length = "44";    
}

void send_requests(int i)
{
  if (!client.connect(host, port))
  {
    Serial.println("Connection failed");
    return;
  }
  String url = String("POST /loggedIn HTTP/1.1\r\n") +
               String("Content-Type: application/json\r\n") +
               String("Content-Length: ") + arr[i].length + String("\r\n") +
               String("Host: 192.168.29.24:8000\r\n") +
               String("\r\n") +
               String("{\r\n") +
               String("  \"name\":") + String("\"") + arr[i].name + String("\",") + String("\r\n") +
               String("  \"roll\":") + arr[i].roll + String("\r\n") +
               String("}");
                
  Serial.print(url);
  client.print(url);
}

void setup()
{
  Serial.begin(9600);
  Serial.setDebugOutput(true);
  mySUART.begin(9600);
  WiFi.mode(WIFI_STA);
  wifiMulti.addAP(ssid, pswd);
  while (wifiMulti.run() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println(WiFi.localIP());   
  init_table();   
}

void loop()
{

  if(mySUART.available()>0)
  {
    cnt++;
    byte x = mySUART.read();
    inId += String((char)x);
  }
  
  if(cnt==11)
  {
    for(int i=0;i<table_size;i++)
    {
      if(inId.equals(arr[i].uuid)){
        send_requests(i);
        inId.clear();                
        cnt = 0;
        break;
      }
    }
    inId.clear();
    cnt = 0;
  }
}