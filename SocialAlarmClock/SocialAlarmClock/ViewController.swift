//
//  ViewController.swift
//  SocialAlarmClock
//
//  Created by Elizabeth Wei on 9/19/15.
//  Copyright © 2015 Elizabeth Wei. All rights reserved.
//

import UIKit

class ViewController: UIViewController, FBSDKLoginButtonDelegate {
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var profileImage: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if (FBSDKAccessToken.currentAccessToken() != nil)
        {
            print("user is already logged in")
            getUserData()
            getFriends()
        }
        else
        {
            let loginView : FBSDKLoginButton = FBSDKLoginButton()
            self.view.addSubview(loginView)
            loginView.center = CGPoint(x: self.view.bounds.width/2, y: self.view.bounds.height * 0.8)
            loginView.readPermissions = ["public_profile", "email", "user_friends"]
            loginView.delegate = self
        }
    }
    
    func loginButton(loginButton: FBSDKLoginButton!, didCompleteWithResult result: FBSDKLoginManagerLoginResult!, error: NSError!) {
        print("User Logged In")
        
        if ((error) != nil)
        {
            // Process error
        }
        else if result.isCancelled {
            // Handle cancellations
        }
        else {
            // If you ask for multiple permissions at once, you
            // should check if specific permissions missing
            if result.grantedPermissions.contains("email")
            {
                // Do work
            }
        }
    }
    
    func loginButtonDidLogOut(loginButton: FBSDKLoginButton!) {
        print("User Logged Out")
    }
    
    func getUserData()
    {
        let graphRequest : FBSDKGraphRequest = FBSDKGraphRequest(graphPath: "me", parameters: nil)
        graphRequest.startWithCompletionHandler({ (connection, result, error) -> Void in
            
            if ((error) != nil)
            {
                // Process error
                print("Error: \(error)")
            }
            else
            {
                print("fetched user: \(result)")
                let userName : NSString? = result.valueForKey("name") as? NSString
                print("User Name is: \(userName)")
                let userEmail : NSString? = result.valueForKey("email") as? NSString
                print("User Email is: \(userEmail)")
                
                self.usernameLabel.text = userName as? String
                
                let userID = result["id"] as! NSString
                let facebookProfileUrl = "http://graph.facebook.com/\(userID)/picture?type=large"
                
                if let url = NSURL(string: facebookProfileUrl) {
                    if let data = NSData(contentsOfURL: url){
                        self.profileImage.contentMode = UIViewContentMode.ScaleAspectFit
                        self.profileImage.image = UIImage(data: data)
                    }
                }
            }
        })
    }

    func getFriends() {
        let graphRequest: FBSDKGraphRequest = FBSDKGraphRequest(graphPath: "/me/friends", parameters: nil)
        graphRequest.startWithCompletionHandler({ (connection, result, error) -> Void in
            
            if ((error) != nil)
            {
                // Process error
                print("Error: \(error)")
            }
            else
            {
                let resultdict = result as! NSDictionary
                print("Result Dict: \(resultdict)")
                let data : NSArray = resultdict.objectForKey("data") as! NSArray
                
                for i in 0..<data.count {
                    let valueDict : NSDictionary = data[i] as! NSDictionary
                    let id = valueDict.objectForKey("id") as! String
                    print("the id value is \(id)")
                }
                
                let friends = resultdict.objectForKey("data") as! NSArray
                print("Found \(friends.count) friends")
            }
        })

    }
    
 
}

