//
//  NewAlarmViewController.swift
//  SocialAlarmClock
//
//  Created by Elizabeth Wei on 9/19/15.
//  Copyright © 2015 Elizabeth Wei. All rights reserved.
//

import UIKit

class NewAlarmViewController: UIViewController {
    @IBOutlet weak var timePicker: UIDatePicker!
    
    @IBOutlet weak var friendInput: UITextField!
    
    @IBAction func addAlarm(sender: UIButton) {
        let calendar = NSCalendar.currentCalendar()
        let components = calendar.components([.Year, .Month, .Day, .Hour, .Minute, .Second], fromDate: timePicker.date)
        let hour = components.hour
        let minutes = components.minute
        print("\(hour) : \(minutes)")
        print(friendInput.text!)
        
        let notification = UILocalNotification()
        notification.alertBody = "Wake up!"
        let currcomponents = calendar.components([.Year, .Month, .Day, .Hour, .Minute, .Second], fromDate: NSDate())
        let currhour = currcomponents.hour
        let currminutes = currcomponents.minute
        let timediff = Double(hour-currhour) * 60.0 * 60.0 + Double(minutes - currminutes) * 60.0
        notification.fireDate = NSDate(timeIntervalSinceReferenceDate: timediff)
        UIApplication.sharedApplication().scheduleLocalNotification(notification)
        
        //sends get request at alarm time.
        let alarm = calendar.dateFromComponents(components)
        let queue = NSOperationQueue()
        queue.addOperationWithBlock() {
            while alarm!.compare(NSDate()) == NSComparisonResult.OrderedDescending
            {
                //stall
            }
            NSOperationQueue.mainQueue().addOperationWithBlock{
                //get the buzzer to go off
                self.toggle()
                
                //popup alert
                
                let alertController = UIAlertController(title: "Buzz", message: "Wake up", preferredStyle: UIAlertControllerStyle.Alert)
                alertController.addAction(UIAlertAction(title: "Shut up.", style: UIAlertActionStyle.Default, handler: {action in
                    self.toggle()}
                ))
                self.presentViewController(alertController, animated: true, completion: nil)
                
            }
        }
    }
    
    func toggle()
    {
        let url = NSURL(string: "http://hackmit.suyash.io/api/hardware/buzz")
        let session = NSURLSession.sharedSession()
        
        let dataTask = session.dataTaskWithURL(url!) {(data, response, error) in
            if let data2 = data
            {
                print(NSString(data: data2, encoding: NSUTF8StringEncoding))
            }
        }
        dataTask!.resume()
    }
    
    @IBAction func Toggle() {
        let url = NSURL(string: "http://hackmit.suyash.io/api/hardware/buzz")
        let session = NSURLSession.sharedSession()
        
        let dataTask = session.dataTaskWithURL(url!) {(data, response, error) in
            if let data2 = data
            {
                print(NSString(data: data2, encoding: NSUTF8StringEncoding))
            }
        }
        dataTask!.resume()
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let swipe: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "dismissKeyboard")
        
        swipe.direction = UISwipeGestureRecognizerDirection.Down
        
        self.view.addGestureRecognizer(swipe)
    }
    
    func dismissKeyboard() {
        self.friendInput.resignFirstResponder()
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

extension String
{
    func toDateTime() -> NSDate
    {
        //Create Date Formatter
        let dateFormatter = NSDateFormatter()
        
        //Specify Format of String to Parse
        dateFormatter.dateFormat = "yyyy-MM-dd hh:mm:ss.SSSSxxx"
        
        //Parse into NSDate
        let dateFromString : NSDate = dateFormatter.dateFromString(self)!
        
        //Return Parsed Date
        return dateFromString
    }
}