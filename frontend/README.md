todo;

what we have:
   # a collection in firestore user-request
   # we have frontend in react which have firebase store subscribe 

what is needed:
  # we need to show users that they requested movies/series are added to the page so, that user need to know whether that are added or not 

approaches:

  # 1. we can add a attribute in user-request like isUploaded - type boolean then whenever we add upload that movie we will just change that to true so, that way we have a toast notification on frontend with setinterval with every 3 sec it will loop to the [isuploaded: true] this toast notification is example user requested movies/series added with date and time. 

develop steps:
 
 step 1 => create a button in video upload page like user requested. once clicks then fetch the collections from firestore user-request; (done)

 step 2 => when click happens merge the object state and exit the pop up (done)

 step 3 => when user clicks upload to server take a id from stored object and then make a put call to firestore just update a isUploaded to true (done)


next steps : 
  
  step 1 => when the user clicks the request then it should actually takes the user location, ip, isUploaded  (done)

  step 2 => subscribe to the user request on the app component and init a setinterval to show the updated user request data only isuploaded is true; 


