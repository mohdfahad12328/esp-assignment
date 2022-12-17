// #include <Arduino.h>
// #include <ESP8266WiFi.h>
// #include <ESP8266WiFiMulti.h>

// ESP8266WiFiMulti wifiMulti;

// int ledPin = 2;

// const char *ssid = "AndroidAP_1003";
// const char *pswd = "12345678";

// const char *host = "192.168.29.24";
// const uint16_t port = 5000;

// WiFiClient client;

// void setup()
// {
//   Serial.begin(115200);
//   while (!Serial)
//   {
//     ; // wait for serial port to connect. Needed for native USB port only
//   }
//   // Serial.setDebugOutput(true);
//   // Serial.println();

//   // WiFi.mode(WIFI_STA);
//   // wifiMulti.addAP(ssid, pswd);
//   // Serial.print("Wait for WiFi... ");

//   // while (wifiMulti.run() != WL_CONNECTED)
//   // {
//   //   Serial.print(".");
//   //   delay(500);
//   // }

//   // Serial.println("");
//   // Serial.println("WiFi connected");
//   // Serial.println("IP address: ");
//   // Serial.println(WiFi.localIP());

//   // // connection done
//   // if (!client.connect(host, port))
//   // {
//   //   Serial.println("Connection failed");
//   //   return;
//   // }

//   // const char *url = "GET /loggedIn HTTP/1.1\r\n connection: close\r\n\r\n";
//   // client.print(url);

//   // char c = 1;

//   // while (c != 0)
//   // if(client.available())
//   // {
//   //   char c = client.read();
//   //   Serial.print(c);
//   // }
// }

// void loop()
// {
//   if (Serial.available())
//   {
//     Serial.write(Serial.read());
//   }
// }


#include<SoftwareSerial.h>
SoftwareSerial mySUART(4, 5);  //D2, D1

void setup()
{
  Serial.begin(115200);
  mySUART.begin(115200);
}

void loop()
{
  if(Serial.available()>0)
  {
    byte x = Serial.read();
    mySUART.write(x);
  }
  if(mySUART.available()>0)
  {
    Serial.write((char)mySUART.read());
  }
}