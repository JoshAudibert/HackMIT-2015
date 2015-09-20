

int led = D7;
int piezo = D0;
int state=0;


void setup()
{

   pinMode(led, OUTPUT);
   pinMode(piezo, OUTPUT);
   Spark.function("led",ledToggle);



}

void loop()
{
   // Nothing to do here
}


int ledToggle(String command) {

    if (command=="toggle") {
        if (state==0){
            digitalWrite(led,HIGH);
            tone(piezo,440);
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
