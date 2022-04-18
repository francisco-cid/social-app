try:
    from backend.models import app, db, User, Group, Photo, SocialHandle, GroupUser, Vote
except:
    from models import app, db, User, Group, Photo, SocialHandle, GroupUser, Vote
from datetime import datetime

#### functions that query db and return a python dictionary. To be called from main.py #####

#fetch data for all users, including photos and social handles
def get_all_users():
    users_list = User.query.order_by(User.user_id).all()
    response = list()
    user_dict = {}
    for user in users_list:
        user_dict["user_id"] = user.user_id
        user_dict["username"] = user.username
        user_dict["email"] = user.email
        user_dict["first_name"] = user.first_name
        user_dict["last_name"] = user.last_name
        user_dict["display_name"] = user.display_name
        user_dict["body_type"] = bod_int_arr(user.body_type)
        user_dict["height"] = user.height
        user_dict["weight"] = user.weight
        user_dict["birth_date"] = user.birth_date.strftime("%Y/%m/%d")
        #calculate user age and add it to user dictionary
        today = datetime.today()
        user_age = today.year - user.birth_date.year -  ((today.month, today.day) < (user.birth_date.month, user.birth_date.day))
        user_dict["age"] = user_age
        ###
        user_dict["gender"] = user.gender
        user_dict["pronouns"] = user.pronouns
        user_dict["gender_pref"] = gen_int_arr(user.gender_pref)
        user_dict["sex_position"] = user.sex_position
        if user.std_date:
            user_dict["std_date"] = user.std_date.strftime("%Y/%m/%d")
        else:
            user_dict["std_date"] = None
        user_dict["have_std"] = user.have_std
        user_dict["std_desc"] = user.std_desc
        user_dict["prof_desc"] = user.prof_desc
        user_dict["avatar_photo"] = user.avatar_photo
        user_dict["socials"] = {}
        user_handles = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
        for entry in user_handles:
            user_dict["socials"][entry.platform] = entry.handle

        user_dict["photos"] = {"public":[], "private":[]}
        user_photos = Photo.query.filter(Photo.user_id==user.user_id)
        for photo in user_photos:
            if photo.private:
                user_dict["photos"]["private"].append(photo.url)
            else:
                user_dict["photos"]["public"].append(photo.url)
        response.append(user_dict.copy())
    return response

def add_user(data):
    #add new users data to user table
    last_user = User.query.order_by(User.user_id.desc()).first()
    #convert body_type array to int
    body_type_int = bod_arr_int(data["body_type"])
    #convert gender_pref array to int
    gender_pref_int = gen_arr_int(data["gender_pref"])
    newUser = User(user_id=last_user.user_id + 1, username=data["username"], email=data["email"],
                password=data["password"], first_name=data["first_name"], last_name=data["last_name"],
                display_name=data["display_name"], body_type=body_type_int,
                height=data["height"], weight=data["weight"], birth_date=data["birth_date"], gender=data["gender"],
                pronouns=data["pronouns"], sex_position=data["sex_position"], gender_pref=gender_pref_int,
                std_date= data["std_date"], have_std=data["have_std"], std_desc=data["std_desc"],
                prof_desc=data["prof_desc"], avatar_photo=data["avatar_photo"])
    db.session.add(newUser)
    db.session.commit()

    #add new users photos to photo entity
    last_photo = Photo.query.order_by(Photo.id.desc()).first()
    photo_id = last_photo.id
    for photo in data["photos"]["public"]:
        #create Photo object
        newPhoto = Photo(id=photo_id, user_id=newUser.user_id, url=photo, private=False)
        photo_id += 1
        #add newPhoto to photo entity
        db.session.add(newPhoto)
        db.session.commit()
    for photo in data["photos"]["private"]:
        #create Photo object
        newPhoto = Photo(id=photo_id, user_id=newUser.user_id, url=photo, private=True)
        photo_id += 1
        #add newPhoto to photo entity
        db.session.add(newPhoto)
        db.session.commit()

    #add new users socials to social_handle entity
    last_social = SocialHandle.query.order_by(SocialHandle.id.desc()).first()
    social_id = last_social.id + 1
    for key in data["socials"]:
        #create SocialHandle object
        newSocialHandle = SocialHandle(id=social_id, user_id=newUser.user_id, platform=key,
            handle=data["socials"][key])
        social_id += 1
        db.session.add(newSocialHandle)
        db.session.commit()
    return newUser.user_id
    #sample request body that works:
# {"username":"newusername", "email":"hillary@gmail.com", "password":"fuckdonaldtrump",
#     "first_name":"Test", "last_name":"Hope", "display_name":"Hillary", "body_type":["thick","thin","athletic"], "height":64, "weight":null,
#     "birth_date":"1947-10-26", "gender":"female", "pronouns":"she/her",
#     "gender_pref":["man", "transm"], "sex_position":null, "std_date":"2021/11/27", "have_std": false, "std_desc":null,
#     "prof_desc": "Looking to get fucked by someone other than the James Comey",
#     "avatar_photo":"https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg",
#     "photos":{
#         "public":["https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg","https://www.washingtonian.com/wp-content/uploads/2020/05/Hillary_Clinton_healthcare_presentation_53520u_cropped1.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGthlZkZsChrTOHvpRXRk8Y9_msYI72YDtw&usqp=CAU","https://media.glamour.com/photos/582514aff3a4c6895754b464/6:7/w_552,h_644,c_limit/hillary-clinton-woods-hiking.jpg"],
#         "private":["https://whyy.org/wp-content/uploads/2020/07/Hillary_Clinton_30648676192.jpg","https://s-media-cache-ak0.pinimg.com/564x/f9/95/d7/f995d7b1c09e8227364c8b1a190ee43c.jpg","https://s7d2.scene7.com/is/image/TWCNews/hillary_clinton_2016jpg"]
#         },
#     "socials":{"twitter":"@HillaryClinton","instagram":"@HillaryClinton"}
#     }
#fetch data from a single user from db
def get_one_user(id):
    user = User.query.get(id)
    if user == None:
        return "404 user not found"
    user_dict = {}
    user_dict["user_id"] = user.user_id
    user_dict["username"] = user.username
    user_dict["email"] = user.email
    user_dict["first_name"] = user.first_name
    user_dict["last_name"] = user.last_name
    user_dict["display_name"] = user.display_name
    user_dict["body_type"] = bod_int_arr(user.body_type)
    user_dict["height"] = user.height
    user_dict["weight"] = user.weight
    user_dict["birth_date"] = user.birth_date.strftime("%Y/%m/%d")
    #calculate user age and add it to user dictionary
    today = datetime.today()
    user_age = today.year - user.birth_date.year -  ((today.month, today.day) < (user.birth_date.month, user.birth_date.day))
    user_dict["age"] = user_age
    ###
    user_dict["gender"] = user.gender
    user_dict["pronouns"] = user.pronouns
    user_dict["gender_pref"] = gen_int_arr(user.gender_pref)
    user_dict["sex_position"] = user.sex_position
    if user.std_date:
        user_dict["std_date"] = user.std_date.strftime("%Y/%m/%d")
    else:
        user_dict["std_date"] = None
    user_dict["have_std"] = user.have_std
    user_dict["std_desc"] = user.std_desc
    user_dict["prof_desc"] = user.prof_desc
    user_dict["avatar_photo"] = user.avatar_photo
    user_dict["socials"] = {}
    user_handles = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
    for entry in user_handles:
        user_dict["socials"][entry.platform] = entry.handle
    user_dict["photos"] = {"public":[], "private":[]}
    user_photos = Photo.query.filter(Photo.user_id==user.user_id)
    for photo in user_photos:
        if photo.private:
            user_dict["photos"]["private"].append(photo.url)
        else:
            user_dict["photos"]["public"].append(photo.url)
    return user_dict

#check that email/username and password pair match with a user in the db
def check_cred(credentials):
    login = credentials["login"]
    password = credentials["password"]
    if "@" in login:
        user = User.query.filter(User.email == login).first()
    else:
        user = User.query.filter(User.username == login).first()
    if user == None:
        return ["404 user not found", None]
    elif user.password == password:
        return [True, user.user_id]
    else:
        return [False, None]
    #sample request body that works:
#     {"login":"bernie99", "password":"fuckbillionaires"}

#retrieve data for all groups in db
def get_all_groups():
    #create list of user dict
    response = list()
    groups = Group.query.all()
    #create group_dict
    group_dict = {}
    for group in groups:
        #add group data to group_dict
        group_dict["group_id"] = group.group_id
        group_dict["group_name"] = group.group_name
        group_dict["time"] = group.time.strftime("%Y/%m/%d %H:%M:%S")
        group_dict["group_desc"] = group.group_desc
        group_dict["gender_pref"] = gen_int_arr(group.gender_pref)
        group_dict["body_pref"] = bod_int_arr(group.body_pref)
        group_dict["size"] = group.size
        group_dict["max_size"] = group.max_size
        group_dict["admins"] = []
        group_dict["user_avatars"] = []
        group_dict["user_photos"] = {"public":[],"private":[]}
        group_dict["users"] = []
        group_users = GroupUser.query.filter(GroupUser.group_id == group.group_id)
        for group_user in group_users:
            #add user_id to "admins" list if user is admin of group
            if group_user.admin:
                group_dict["admins"].append(group_user.user_id)
            #query each user in group, and build user_dict with user data
            user = User.query.get(group_user.user_id)
            user_dict = {}
            if len(group_dict["user_avatars"]) < 4:
                group_dict["user_avatars"].append(user.avatar_photo)
            user_dict["user_id"] = user.user_id
            user_dict["username"] = user.username
            user_dict["email"] = user.email
            user_dict["first_name"] = user.first_name
            user_dict["last_name"] = user.last_name
            user_dict["display_name"] = user.display_name
            user_dict["body_type"] = bod_int_arr(user.body_type)
            user_dict["height"] = user.height
            user_dict["weight"] = user.weight
            user_dict["birth_date"] = user.birth_date.strftime("%Y/%m/%d")
            #calculate user age and add it to user dictionary
            today = datetime.today()
            user_age = today.year - user.birth_date.year -  ((today.month, today.day) < (user.birth_date.month, user.birth_date.day))
            user_dict["age"] = user_age
            ###
            user_dict["gender"] = user.gender
            user_dict["pronouns"] = user.pronouns
            user_dict["gender_pref"] = gen_int_arr(user.gender_pref)
            user_dict["sex_position"] = user.sex_position
            if user.std_date:
                user_dict["std_date"] = user.std_date.strftime("%Y/%m/%d")
            else:
                user_dict["std_date"] = None
            user_dict["have_std"] = user.have_std
            user_dict["std_desc"] = user.std_desc
            user_dict["prof_desc"] = user.prof_desc
            user_dict["avatar_photo"] = user.avatar_photo
            user_dict["socials"] = {}
            user_handles = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
            for entry in user_handles:
                user_dict["socials"][entry.platform] = entry.handle

            user_dict["photos"] = {"public":[], "private":[]}
            user_photos = Photo.query.filter(Photo.user_id==user.user_id)
            private_flag = True
            public_flag = True
            for photo in user_photos:
                if photo.private:
                    user_dict["photos"]["private"].append(photo.url)
                    if private_flag:
                        group_dict["user_photos"]["private"].append(photo.url)
                        private_flag = False
                else:
                    user_dict["photos"]["public"].append(photo.url)
                    if public_flag:
                        group_dict["user_photos"]["public"].append(photo.url)
                        public_flag = False
            group_dict["users"].append(user_dict.copy())
        #append copy of group_dict to list of group dicts
        response.append(group_dict.copy())
    return response

#create a new group
def create_group(data, creator_id):
    #get group with highest group_id
    last_group = Group.query.order_by(Group.group_id.desc()).first()
    #create new Group object and add it to group table
    newGroup = Group(group_id = last_group.group_id + 1, group_name = data["group_name"],
                group_desc = data["group_desc"], time = data["time"], gender_pref = gen_arr_int(data["gender_pref"]),
                body_pref = bod_arr_int(data["body_pref"]), size = 1, max_size = data["max_size"])
    db.session.add(newGroup)
    #get group_user with highest id
    last_group_user = GroupUser.query.order_by(GroupUser.id.desc()).first()
    #create new GroupUser object and add it to group_user table
    newGroupUser = GroupUser(id = last_group_user.id + 1, user_id = creator_id, group_id = newGroup.group_id,
                    admin = True)
    db.session.add(newGroupUser)
    db.session.commit()
    #sample request body that works:
#     {"group_name":"testgroup",
#     "group_desc":"this is a test I expect it to work",
#     "time":"2021/09/11 21:00:00",
#     "gender_pref":["man", "transm","woman"],
#     "body_pref":["athletic","toned","avg"],
#     "max_size": 8}

#retrieve data for a given group
def get_one_group(id):
    group = Group.query.get(id)
    #return error if group does not exist
    if group == None:
        return "404 group not found"
    #create user_dict and populate it with group data
    group_dict = {}
    group_dict["group_id"] = group.group_id
    group_dict["group_name"] = group.group_name
    group_dict["time"] = group.time
    group_dict["group_desc"] = group.group_desc
    group_dict["gender_pref"] = gen_int_arr(group.gender_pref)
    group_dict["body_pref"] = bod_int_arr(group.body_pref)
    group_dict["size"] = group.size
    group_dict["max_size"] = group.max_size
    group_dict["admins"] = []
    group_dict["user_photos"] = {"public":[],"private":[]}
    group_dict["users"] = []
    group_users = GroupUser.query.filter(GroupUser.group_id == group.group_id)
    for group_user in group_users:
        #add user_id to "admins" list if user is admin of group
        if group_user.admin:
            group_dict["admins"].append(group_user.user_id)
        #query each user in group, and build user_dict with user data
        user = User.query.get(group_user.user_id)
        user_dict = {}
        user_dict["user_id"] = user.user_id
        user_dict["username"] = user.username
        user_dict["email"] = user.email
        user_dict["first_name"] = user.first_name
        user_dict["last_name"] = user.last_name
        user_dict["display_name"] = user.display_name
        user_dict["body_type"] = bod_int_arr(user.body_type)
        user_dict["height"] = user.height
        user_dict["weight"] = user.weight
        #calculate user age and add it to user dictionary
        today = datetime.today()
        user_age = today.year - user.birth_date.year -  ((today.month, today.day) < (user.birth_date.month, user.birth_date.day))
        user_dict["age"] = user_age
        ###
        user_dict["birth_date"] = user.birth_date.strftime("%Y/%m/%d")
        user_dict["gender"] = user.gender
        user_dict["pronouns"] = user.pronouns
        user_dict["gender_pref"] = gen_int_arr(user.gender_pref)
        user_dict["sex_position"] = user.sex_position
        if user.std_date:
            user_dict["std_date"] = user.std_date.strftime("%Y/%m/%d")
        else:
            user_dict["std_date"] = None
        user_dict["have_std"] = user.have_std
        user_dict["std_desc"] = user.std_desc
        user_dict["prof_desc"] = user.prof_desc
        user_dict["avatar_photo"] = user.avatar_photo
        user_dict["socials"] = {}
        user_handles = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
        for entry in user_handles:
            user_dict["socials"][entry.platform] = entry.handle

        user_dict["photos"] = {"public":[], "private":[]}
        user_photos = Photo.query.filter(Photo.user_id==user.user_id)
        private_flag = True
        public_flag = True
        for photo in user_photos:
            if photo.private:
                user_dict["photos"]["private"].append(photo.url)
                if private_flag:
                    group_dict["user_photos"]["private"].append(photo.url)
                    private_flag = False
            else:
                user_dict["photos"]["public"].append(photo.url)
                if public_flag:
                    group_dict["user_photos"]["public"].append(photo.url)
                    public_flag = False
        group_dict["users"].append(user_dict.copy())
    return group_dict

#get all groups that a given user (user_id = id) is in
def query_user_groups(id):
    response = []
    #get group users with given user_id
    group_users = GroupUser.query.filter(GroupUser.user_id == id)
    for group_user in group_users:
        group_dict = {}
        group = Group.query.get(group_user.group_id)
        group_dict["group_id"] = group.group_id
        group_dict["group_name"] = group.group_name
        group_dict["time"] = group.time
        group_dict["group_desc"] = group.group_desc
        group_dict["gender_pref"] = gen_int_arr(group.gender_pref)
        group_dict["body_pref"] = bod_int_arr(group.body_pref)
        group_dict["size"] = group.size
        group_dict["max_size"] = group.max_size
        group_dict["admins"] = []
        group_dict["user_avatars"] = []
        group_dict["user_photos"] = {"public":[],"private":[]}
        group_dict["users"] = []
        #get group_users with this group
        group_users2 = GroupUser.query.filter(GroupUser.group_id == group.group_id)
        for group_user2 in group_users2:
            #add user_id to "admins" list if user is admin of group
            if group_user2.admin:
                group_dict["admins"].append(group_user2.user_id)
            #query each user in group, and build user_dict with user data
            user = User.query.get(group_user2.user_id)
            user_dict = {}
            if len(group_dict["user_avatars"]) < 4:
                group_dict["user_avatars"].append(user.avatar_photo)
            user_dict["user_id"] = user.user_id
            user_dict["username"] = user.username
            user_dict["email"] = user.email
            user_dict["first_name"] = user.first_name
            user_dict["last_name"] = user.last_name
            user_dict["display_name"] = user.display_name
            user_dict["body_type"] = bod_int_arr(user.body_type)
            user_dict["height"] = user.height
            user_dict["weight"] = user.weight
            #calculate user age and add it to user dictionary
            today = datetime.today()
            user_age = today.year - user.birth_date.year -  ((today.month, today.day) < (user.birth_date.month, user.birth_date.day))
            user_dict["age"] = user_age
            ###
            user_dict["birth_date"] = user.birth_date.strftime("%Y/%m/%d")
            user_dict["gender"] = user.gender
            user_dict["pronouns"] = user.pronouns
            user_dict["gender_pref"] = gen_int_arr(user.gender_pref)
            user_dict["sex_position"] = user.sex_position
            if user.std_date:
                user_dict["std_date"] = user.std_date.strftime("%Y/%m/%d")
            else:
                user_dict["std_date"] = None
            user_dict["have_std"] = user.have_std
            user_dict["std_desc"] = user.std_desc
            user_dict["prof_desc"] = user.prof_desc
            user_dict["avatar_photo"] = user.avatar_photo
            user_dict["socials"] = {}
            user_handles = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
            for entry in user_handles:
                user_dict["socials"][entry.platform] = entry.handle

            user_dict["photos"] = {"public":[], "private":[]}
            user_photos = Photo.query.filter(Photo.user_id==user.user_id)
            private_flag = True
            public_flag = True
            for photo in user_photos:
                if photo.private:
                    user_dict["photos"]["private"].append(photo.url)
                    if private_flag:
                        group_dict["user_photos"]["private"].append(photo.url)
                        private_flag = False
                else:
                    user_dict["photos"]["public"].append(photo.url)
                    if public_flag:
                        group_dict["user_photos"]["public"].append(photo.url)
                        public_flag = False
            group_dict["users"].append(user_dict.copy())
        response.append(group_dict.copy())
    return response

def edit_user(id, data):
    user = User.query.get(id)
    #return error if group does not exist
    if user == None:
        return "404 user not found"
    for key in data:
        if data[key] == "":
            data[key] = None
        if key == "body_type":
            user.body_type = bod_arr_int(data[key])
            db.session.commit()
        elif key == "gender_pref":
            user.gender_pref = gen_arr_int(data[key])
            db.session.commit()
        elif key == "photos":
            user_photos = Photo.query.filter(Photo.user_id == user.user_id)
            #delete photos in db that are not in response
            for photo in user_photos:
                if photo.private:
                    if photo.url not in data[key]["private"]:
                        db.session.delete(photo)
                        db.session.commit()
                    else:
                        data[key]["private"].remove(photo.url)
                if not photo.private:
                    if photo.url not in data[key]["public"]:
                        db.session.delete(photo)
                        db.session.commit()
                    else:
                        data[key]["public"].remove(photo.url)
            #add new users photos to photo entity
            last_photo = Photo.query.order_by(Photo.id.desc()).first()
            photo_id = last_photo.id + 1
            for photo in data["photos"]["public"]:
                #create Photo object
                newPhoto = Photo(id=photo_id, user_id=user.user_id, url=photo, private=False)
                photo_id += 1
                #add newPhoto to photo entity
                db.session.add(newPhoto)
                db.session.commit()
            for photo in data["photos"]["private"]:
                #create Photo object
                newPhoto = Photo(id=photo_id, user_id=user.user_id, url=photo, private=True)
                photo_id += 1
                #add newPhoto to photo entity
                db.session.add(newPhoto)
                db.session.commit()
        elif key == "socials":
            #get socials for that user that are already in db
            user_socials = SocialHandle.query.filter(SocialHandle.user_id == user.user_id)
            for social in user_socials:
                #if platform is in response body
                if social.platform in data[key].keys():
                    #if handle in body matches handle in db
                    if social.handle == data[key][social.platform]:
                        del data[key][social.platform]
                    #if handles don't match
                    else:
                        social.handle = data[key][social.platform]
                        del data[key][social.platform]
                else:
                    db.session.delete(social)
                    db.session.commit
            #add socials from response body with platforms not already in db
            last_social = SocialHandle.query.order_by(SocialHandle.id.desc()).first()
            social_id = last_social.id + 1
            for entry in data[key]:
                #create SocialHandle object
                newSocialHandle = SocialHandle(id=social_id, user_id=user.user_id, platform=entry, handle=data[key][entry])
                social_id += 1
                db.session.add(newSocialHandle)
                db.session.commit()
        else:
            setattr(user, key, data[key])
            db.session.commit()

    return "200 profile edited"
#response body that works:
# {"display_name":"Dianne", "body_type":["thin", "athletic","plus"], "height":null, "weight":null, "birth_date":"1933-06-22", "gender":"woman","pronouns":"she/hers",
# "gender_pref":["transm", "transw"],
# "std_date":"1998-11-27", "have_std":false, "std_desc":"", "prof_desc":"My description changed!",
# "avatar_photo":"https://cdn.britannica.com/16/115816-050-43698D68/Dianne-Feinstein.jpg",
# "photos":{
#     "public":["https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg","pants"],
#     "private":["butt"]},
# "socials":{"twitter":"@HillaryClinton","instagram":"@HRC", "linked_in":"testhandle"}
# }
######### Functions to convert between int and array for certain preferences ######
gen_bitmask = {"woman": 16, "man": 8, "transw":4, "transm":2, "nonbin":1}
def gen_arr_int(gen_arr):
    gen_int = 0
    for gender in gen_arr:
        gen_int += gen_bitmask[gender]
    return gen_int

def gen_int_arr(gen_int):
    gen_arr = []
    for gender in gen_bitmask:
        if (gen_int & gen_bitmask[gender] == gen_bitmask[gender]):
            gen_arr.append(gender)
    return gen_arr

bod_bitmask = {"thin":128, "avg":64 ,"athletic":32,"toned":16, "muscular":8, "curvy":4, "thick":2, "plus":1}
def bod_arr_int(arr):
    db_val = 0
    for body in arr:
        db_val += bod_bitmask[body]
    return db_val

def bod_int_arr(db_val):
    bod_arr = []
    for body in bod_bitmask:
        if (db_val & bod_bitmask[body] == bod_bitmask[body]):
            bod_arr.append(body)
    return bod_arr

#sample query. Returns users interested in women and transw
def bitwise_test():
#     print(type(User.gender_pref.op("&")(gen_bitmask["woman"])==gen_bitmask["woman"] or User.gender_pref.op("&")(gen_bitmask["man"])==gen_bitmask["man"]))
    users = User.query.filter((User.gender_pref.op("&")(gen_bitmask["woman"])==gen_bitmask["woman"]) & (User.gender_pref.op("&")(gen_bitmask["transw"])==gen_bitmask["transw"]))
#     users= User.query.order_by(User.user_id).all()
#     users = User.query.filter(User.gender_pref.op("&")(gen_bitmask["woman"])==gen_bitmask["woman"])
#     users = User.query.filter(True or False)
    for user in users:
        print(user.user_id, gen_int_arr(user.gender_pref), bin(user.gender_pref))

#invites a user to a group
def create_invitation(group_id, candidate_id, inviter):
    #create GroupUser id
    last_group_user= GroupUser.query.order_by(GroupUser.id.desc()).first()
    group_user_id = last_group_user.id + 1
    newGroupUser = GroupUser(id=group_user_id, group_id=group_id, user_id=candidate_id, status="i", votes=None,
        invited_by=inviter,admin=False)
    db.session.add(newGroupUser)
    db.session.commit()
    return "200 user invited"

#creates application to a group
def create_application(group_id, candidate_id):
    #check if user has already been invited
    inviter_id = False
    invitation = GroupUser.query.filter((GroupUser.group_id==group_id) & (GroupUser.user_id==candidate_id)).first()
    if invitation != None:
        inviter_id = invitation.invited_by
        invitation.status = "a"
        db.session.commit()
    else:
       #create GroupUser id
       last_group_user= GroupUser.query.order_by(GroupUser.id.desc()).first()
       group_user_id = last_group_user.id + 1
       newGroupUser = GroupUser(id=group_user_id, group_id=group_id, user_id=candidate_id, status="a", votes=None,
           invited_by=None,admin=False)
       db.session.add(newGroupUser)
       db.session.commit()
   #create votes for current group members
    current_members = GroupUser.query.filter((GroupUser.group_id == group_id) & (GroupUser.status=="m")).all()
    last_vote = Vote.query.order_by(Vote.id.desc()).first()
    if last_vote:
        vote_id = last_vote.id + 1
    else:
        vote_id = 1
    for member in current_members:
        if member.user_id == inviter_id:
            newVote = Vote(id=vote_id, group_id = group_id, candidate=candidate_id, voter=member.user_id, vote=True)
            vote_id += 1
            invitation.votes = 1
            db.session.add(newVote)
            db.session.commit()
        else:
            newVote = Vote(id=vote_id, group_id = group_id, candidate=candidate_id, voter=member.user_id, vote=False)
            vote_id += 1
            db.session.add(newVote)
            db.session.commit()
    return "200 application created"

def add_vote(group_id, candidate_id, voter_id):
    vote = Vote.query.filter((Vote.group_id == group_id) & (Vote.candidate==candidate_id) &
        (Vote.voter==voter_id)).first()
    if vote == None:
        return "404 group application not found",404
    if vote.vote:
        return "400 user has already voted",400
    print(vote.vote)
    vote.vote = True
    db.session.commit()
    print(vote.vote)
    application = GroupUser.query.filter((GroupUser.group_id==group_id) & (GroupUser.user_id==candidate_id)).first()
    if application.votes:
        application.votes += 1
        db.session.commit()
    else:
        application.votes = 1
        db.session.commit()
    return "200 vote made",200

#vote no and reject applicant from group
def create_rejection(group_id, candidate_id):
    application = GroupUser.query.filter((GroupUser.group_id==group_id) & (GroupUser.user_id==candidate_id)).first()
    if application == None:
        return "404 application not found", 404
    application.status = "r"
    application.votes = None
    application.invited_by = None
    db.session.commit()
    #delete previous votes
    votes = Vote.query.filter((Vote.group_id == group_id) & (Vote.candidate==candidate_id)).all()
    for vote in votes:
        db.session.delete(vote)
        db.session.commit()
    return "200 candidate rejected from group", 200

#query and return group info for those who have invited user
def query_invites(user_id):
    #array of group_id's that have sent invite
    inviters = []
    invitations = GroupUser.query.filter((GroupUser.user_id==user_id) & (GroupUser.status=="i")).all()
    for invitation in invitations:
        inviters.append(invitation.group_id)
    #check if no invitations sent
    if len(inviters) == 0:
        return "no invitations have been sent", 200
    #array with full group info for each group that has sent invitation
    groups = []
    for id in inviters:
        groups.append(get_one_group(id))
    return {'groups':groups},200

#query group applicants, return user info for all applicants
def query_applicants(group_id):
    #array of (user_id, # of votes on that applicant) for each applicant
    ids = []
    applications = GroupUser.query.filter((GroupUser.group_id==group_id) & (GroupUser.status=='a')).all()
    for application in applications:
        ids.append((application.user_id, application.votes))
    #check if no invitations
    if len(ids) == 0:
        return "no applicants found for this group", 200
    #array with user info of each applicants w/ the # of votes on their application
    applicants = []
    for id in ids:
        applicant_info = get_one_user(id[0])
        applicant_info["votes"] = id[1]
        applicants.append(applicant_info)
    return {'applicants':applicants}, 200



