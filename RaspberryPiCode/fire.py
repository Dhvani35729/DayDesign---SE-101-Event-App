import pyrebase

# Dhvani Patel 2018

config = {
  	"apiKey": "AIzaSyCwgogOI0rJDijj-r97dbWjEinKkrBH1Ok",
    "authDomain": "daydesign-a277f.firebaseapp.com",
    "databaseURL": "https://daydesign-a277f.firebaseio.com",
    "projectId": "daydesign-a277f",
    "storageBucket": "daydesign-a277f.appspot.com",
    "messagingSenderId": "758132951647"
}

firebase = pyrebase.initialize_app(config)

file = open("users.txt", "r")
 
db = firebase.database()

#print(file.readline())
uidRead = repr(file.readline())
uid = uidRead[1:-3]


status = db.child("velocity").child("event_1").child(uid).child("checked_in").get()
#print(status)
if(status.val()):
	if(status.val() == "true"):
		data = {"checked_in": "false"}
		db.child("velocity").child("event_1").child(uid).set(data)
	elif(status.val() == "false"):
		data = {"checked_in": "true"}
		db.child("velocity").child("event_1").child(uid).set(data)
else:
	data = {"checked_in": "true"}
	db.child("velocity").child("event_1").child(uid).set(data)

file.close()
