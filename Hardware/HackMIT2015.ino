/*
HackMIT2015.ino
Firmware for a Particle Photon smart alarm device. When a user isn't
waking up on time, friends of the user can employ vaious techniques
to get the user out of bed, including invoking this hardware alarm/buzzer
that has the capacity to interface with other "real world" disruptors
(like LED strips, drone launchers, text-to-speech hardware, etc).
*/

// Variable declrations
int led = D7;
int piezo = D0;
int state=0;

void setup()
{
   pinMode(led, OUTPUT);
   pinMode(piezo, OUTPUT);
   Spark.function("led",stateToggle); // Register stateToggle() with the Spark service
}
void loop()
{
   if (state==1){
     alarm();
   }
}
/*
alarm()
Completes one period of the alarm state (alarm on is state==1).
*/
void alarm(){
  digitalWrite(led,HIGH);
  tone(piezo,440);
  delay(200);
  digitalWrite(led,LOW);
  noTone(piezo);
  delay(200);
}
/*
stateToggle()
Function registered with Spark.function to be called when a toggle
trigger occurs. Updates the current state, and updates hardware states
as needed.
@param command passed through by Spark.function()
*/
int stateToggle(String command) {
    if (command=="toggle") {
        if (state==0){
            state=1;
        }
        else if (state==1){
            digitalWrite(led,LOW);
            noTone(piezo);
            state=0;
        }
        return 1;
    }
    else {
        return -1;
    }
}
