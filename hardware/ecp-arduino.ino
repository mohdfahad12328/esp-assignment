#include<SoftwareSerial.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);

int cnt = 0;

bool gotData = false;
SoftwareSerial mySUART(2, 3);

void setup()
{
  Serial.begin(9600);
  mySUART.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
}

void loop()
{
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }

  String content= "";
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  if(!gotData){
    content.toUpperCase();
    String uuid = content.substring(1);
    Serial.print(uuid);
    gotData = true;
    mySUART.write(uuid.c_str());
  }
}