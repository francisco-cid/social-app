from models import app, db, User, Photo, SocialHandle, GroupUser, Group
from queries import gen_int_arr, gen_arr_int, bod_int_arr, bod_arr_int, gen_bitmask, bod_bitmask
from sample_users import sample_users, sample_groups

#iterate through sample_users and populate user, photo, and group_user db entities (entities == tables)
def add_sample_users():
    #initiate counters to determine id"s for photo, social, and group_user entities
    photo_id = 1
    gu_id = 1
    social_id = 1

    #iterate through each user (dictionary) in sample_users
    for user in sample_users:
        #create User object
        body_type_int = bod_arr_int(user["body_type"])
        gen_pref_int = gen_arr_int(user["gender_pref"])
        newUser = User(user_id=user["user_id"], username=user["username"], email=user["email"],
            password=user["password"], first_name=user["first_name"], last_name=user["last_name"],
            display_name=user["display_name"], body_type=body_type_int, height=user["height"], weight=user["weight"],
            birth_date=user["birth_date"], gender=user["gender"], pronouns=user["pronouns"],
            sex_position=user["sex_position"], gender_pref=gen_pref_int,std_date=user["std_date"],
            have_std=user["have_std"], std_desc=user["std_desc"], prof_desc=user["prof_desc"],
            avatar_photo=user["avatar_photo"])

        #iterate through photo dictionary inside user dictionary
        for photo in user["photos"]["public"]:
            #create Photo object
            newPhoto = Photo(id=photo_id, user_id=user["user_id"], url=photo, private=False)
            photo_id += 1
            #add newPhoto to photo entity
            db.session.add(newPhoto)
            db.session.commit()
        for photo in user["photos"]["private"]:
            #create Photo object
            newPhoto = Photo(id=photo_id, user_id=user["user_id"], url=photo, private=True)
            photo_id += 1
            #add newPhoto to photo entity
            db.session.add(newPhoto)
            db.session.commit()

        for key in user["socials"]:
            #create SocialHandle object
            newSocialHandle = SocialHandle(id=social_id, user_id=user["user_id"], platform=key,
                handle=user["socials"][key])
            social_id += 1

            #add newSocialHandle to social_handle
            db.session.add(newSocialHandle)
            db.session.commit()

        #iterate through groups array in user dict
        for group in user["groups"]:
            newGroupUser = GroupUser(id=gu_id, group_id=group["group_id"], user_id= user["user_id"],
                admin=group["admin"], status="m",votes=None)
            gu_id += 1
            #add newGroupUser to group_user entity
            db.session.add(newGroupUser)
            db.session.commit()

        #add newUser to user entity
        db.session.add(newUser)
        db.session.commit()

#iterate through dictionaries in sample_groups and populate group entity
def add_sample_groups():
    for group in sample_groups:
        #create Group object
        bod_pref_int= bod_arr_int(group["body_pref"])
        gen_pref_int = gen_arr_int(group["gender_pref"])

        newGroup = Group(group_id=group["group_id"], group_name=group["group_name"], time=group["time"],
        group_desc=group["group_desc"],gender_pref=gen_pref_int, body_pref=bod_pref_int,size=group["size"],
        max_size=group["max_size"])

        #add newGroup to group entity
        db.session.add(newGroup)
        db.session.commit()

# gen_bitmask = {"woman": 16, "man": 8, "transw":4, "transm":2, "nonbin":1}
# def gen_arr_int(gen_arr):
#     gen_int = 0
#     for gender in gen_arr:
#         gen_int += gen_bitmask[gender]
#     return gen_int
#
# def gen_int_arr(gen_int):
#     gen_arr = []
#     for gender in gen_bitmask:
#         if (gen_int & gen_bitmask[gender] == gen_bitmask[gender]):
#             gen_arr.append(gender)
#     return gen_arr
#
# bod_bitmask = {"thin":128, "avg":64 ,"athletic":32,"toned":16, "muscular":8, "curvy":4, "thick":2, "plus":1}
# def bod_arr_int(arr):
#     db_val = 0
#     for body in arr:
#         db_val += bod_bitmask[body]
#     return db_val
#
# def bod_int_arr(db_val):
#     bod_arr = []
#     for body in bod_bitmask:
#         if (db_val & bod_bitmask[body] == bod_bitmask[body]):
#             bod_arr.append(body)
#     return bod_arr


#clear database of all existing entities
db.drop_all()
#create entities (defined in models.py) in db
db.create_all()
#populate entities with sample user tables
add_sample_users()
add_sample_groups()