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
