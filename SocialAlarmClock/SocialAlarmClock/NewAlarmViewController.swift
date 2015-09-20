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