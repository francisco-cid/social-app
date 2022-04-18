#create a dictionary for each sample user
user1 = {"user_id":1, "username":"hrc2016", "email":"hillary@gmail.com", "password":"fuckdonaldtrump",
"first_name":"Hillary", "last_name":"Clinton", "display_name":"Hillary", "body_type":[], "height":64, "weight":None,
"birth_date":"1947/10/26", "gender":"woman", "pronouns":"she/her", "gender_pref":["man", "transm"],
"sex_position":None, "std_date":"2021-01-13", "have_std": False, "std_desc":None,
"prof_desc": "Looking to get fucked by someone other than the James Comey",
"avatar_photo":"https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg",
"photos":{
    "public":["https://cdn.britannica.com/54/128454-050-6442E633/Hillary-Rodham-Clinton-2009.jpg","https://www.washingtonian.com/wp-content/uploads/2020/05/Hillary_Clinton_healthcare_presentation_53520u_cropped1.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScGthlZkZsChrTOHvpRXRk8Y9_msYI72YDtw&usqp=CAU","https://media.glamour.com/photos/582514aff3a4c6895754b464/6:7/w_552,h_644,c_limit/hillary-clinton-woods-hiking.jpg"],
    "private":["https://whyy.org/wp-content/uploads/2020/07/Hillary_Clinton_30648676192.jpg","https://s-media-cache-ak0.pinimg.com/564x/f9/95/d7/f995d7b1c09e8227364c8b1a190ee43c.jpg","https://s7d2.scene7.com/is/image/TWCNews/hillary_clinton_2016jpg"]
    },
"socials":{"twitter":"@HillaryClinton","instagram":"@HillaryClinton"},
"groups":[{"group_id":1, "admin":True}]
}

user2 = {"user_id":2, "username":"bernie99","email":"bsanders@yahoo.com", "password":"fuckbillionaires",
"first_name":"Bernard", "last_name":"Sanders", "display_name":"Bernie", "body_type":["avg","muscular"],
"height":72, "weight":None, "birth_date":"1941-09-08", "gender":"man", "pronouns":"he/his",
"gender_pref":["woman", "man"], "sex_position":"top", "std_date":None, "have_std":False, "std_desc":None,
"prof_desc":"Not into billionaires. Collapse on this dick so the middle class wont collapse on itself ",
"avatar_photo":"https://upload.wikimedia.org/wikipedia/commons/0/02/Bernie_Sanders_in_March_2020.jpg",
"photos":{
    "public":["https://upload.wikimedia.org/wikipedia/commons/0/02/Bernie_Sanders_in_March_2020.jpg","https://image.cnbcfm.com/api/v1/image/106828879-1611351385639-bern.jpg?v=1611783695","https://media.vanityfair.com/photos/60ec643874d0350a93317c64/master/pass/Sanders7.12.jpg","https://www.thenation.com/wp-content/uploads/2021/06/bernie-sanders-senate-ap-img.jpg"],
    "private":["https://media.vanityfair.com/photos/60ec643874d0350a93317c64/master/pass/Sanders7.12.jpg","https://i.guim.co.uk/img/media/bd2ec10cb2e37f0947c14797ce17ca21f0dfae22/864_217_2018_1208/master/2018.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&s=8e12a9b828ea717c5aabde7cc4342b31"]
    },
"socials":{"twitter":"@BernieSanders","instagram":"@berniesanders"},
"groups":[{"group_id":1, "admin":False}, {"group_id":2, "admin":True}]
}

user3 = {"user_id":3, "username":"cruz2024","email":"racist@gmail.com", "password":"fuckimmigrants",
"first_name":"Rafael", "last_name":"Cruz", "display_name":"Ted", "body_type":["thick"], "height":69, "weight":185,
"birth_date":"1970-12-22", "gender":"man","pronouns":"he/his", "gender_pref":["man", "transm"], "sex_position":"bottom",
"std_date":"2021-04-05", "have_std":True, "std_desc":"chlamydia",
"prof_desc":"I will kiss your ass just like I did Donalds. Cancun vacay anyone?",
"avatar_photo":"https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1618340280/photos/299677_original.jpg",
"photos":{
    "public":["https://res.cloudinary.com/culturemap-com/image/upload/ar_4:3,c_fill,g_faces:center,w_980/v1618340280/photos/299677_original.jpg","https://www.biography.com/.image/t_share/MTgxNDM0ODYxNjc0ODMzODY3/gettyimages-1211620932-copy.jpg","https://media.gq.com/photos/57294848ac40e82f45630ef2/master/pass/BrowserPreview_tmp.jpg","https://pyxis.nymag.com/v1/imgs/f9c/6a1/e17d68e4b3fb4d47bcaad78596be15c649-ted-cruz.rsquare.w1200.jpg","https://progresstexas.org/sites/default/files/styles/blog_large__830x437_/public/images/blog/abbott_peeweeherman.png?itok=cSjxlmzk"],
    "private":["https://media.gq.com/photos/57294848ac40e82f45630ef2/master/pass/BrowserPreview_tmp.jpg","https://pyxis.nymag.com/v1/imgs/f9c/6a1/e17d68e4b3fb4d47bcaad78596be15c649-ted-cruz.rsquare.w1200.jpg","https://progresstexas.org/sites/default/files/styles/blog_large__830x437_/public/images/blog/abbott_peeweeherman.png?itok=cSjxlmzk"]
    },
"socials":{"twitter":"@tedcruz"},
"groups":[{"group_id":1, "admin":False}, {"group_id":3, "admin":False}, {"group_id":4, "admin":True}]
}

user4 = {"user_id":4, "username":"mromney","email":"mromney@hotmail.com", "password":"fuckobama",
"first_name":"Mitt", "last_name":"Romney", "display_name":"Mitt", "body_type":["avg"], "height":74, "weight":175,
"birth_date":"1947-03-12", "gender":"man","pronouns":None, "gender_pref":["woman"],  "sex_position":None,
"std_date":None, "have_std":False, "std_desc":None,
"prof_desc":"Experienced in group activities. Let me fuck you good like I did the GOP #impeach",
"avatar_photo":"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mitt_Romney_official_US_Senate_portrait.jpg/1200px-Mitt_Romney_official_US_Senate_portrait.jpg",
"photos":{
    "public":["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mitt_Romney_official_US_Senate_portrait.jpg/1200px-Mitt_Romney_official_US_Senate_portrait.jpg","https://bostonglobe-prod.cdn.arcpublishing.com/resizer/O8gI3jt82NZ81NtDig8kwi9FJ7o=/1440x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/RCD5ODRH2EI6FBE6IVG75EDBGY.jpg","https://www.nydailynews.com/resizer/a857GkJ1tMlljU9tuEyyampuBY0=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/DTMG3KCAODD36ZK2W2T6X6Y7HI.jpg","https://static.politico.com/dims4/default/51ea2a5/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F29%2F22%2Fbfda8c5f4be09affff34c75295a1%2F180608-mitt-romney-gty-1160.jpg"],
    "private":["https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mitt_Romney_official_US_Senate_portrait.jpg/1200px-Mitt_Romney_official_US_Senate_portrait.jpg","https://bostonglobe-prod.cdn.arcpublishing.com/resizer/O8gI3jt82NZ81NtDig8kwi9FJ7o=/1440x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/RCD5ODRH2EI6FBE6IVG75EDBGY.jpg","https://static.politico.com/dims4/default/51ea2a5/2147483647/resize/1160x%3E/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F29%2F22%2Fbfda8c5f4be09affff34c75295a1%2F180608-mitt-romney-gty-1160.jpg"]
    },
"socials":{}, "groups":[{"group_id":1, "admin":False}, {"group_id":2, "admin":False}]
}

user5 = {"user_id":5, "username":"lindseyg","email":"lgraham@gmail.com", "password":"lovemedonald",
"first_name":"Lindsey", "last_name":"Graham", "display_name":"Lindsey", "body_type":["thin"], "height":67,
"weight":None, "birth_date":"1955-07-09", "gender":"man","pronouns":"He/His", "gender_pref":["woman","man","transw"],
"sex_position":"verse", "std_date":None, "have_std":True, "std_desc":"herpes",
"prof_desc":"My lack of spine let's me bend all sorts of ways (;",
"avatar_photo":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg/1200px-U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg",
"photos":{
    "public":["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg/1200px-U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg","https://static01.nyt.com/images/2020/11/03/us/politics/03dc-southcarolina-senate-sub1/merlin_179550639_86034e42-eca0-4303-80da-7ed8f548c559-mediumSquareAt3X.jpg","https://turnto10.com/resources/media2/16x9/full/1015/center/80/53e55aad-8413-45a2-a481-1d82724e638b-large16x9_AP20085146686513.jpg","https://images.axios.com/TN1P71k3PE4_5U0B3xHahb-96Zk=/fit-in/1366x1366/2020/10/09/1602285345672.jpg"],
    "private":["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg/1200px-U.S._Senator_Lindsey_Graham%2C_Official_Photo%2C_113th_Congress.jpg","https://turnto10.com/resources/media2/16x9/full/1015/center/80/53e55aad-8413-45a2-a481-1d82724e638b-large16x9_AP20085146686513.jpg","https://images.newrepublic.com/d87a878af72395f9ddd0b706d9e699e005222b3d.jpeg?w=1109&h=577&crop=faces&fit=crop&fm=jpg"]
    },
"socials":{"twitter":"@lindseygrahamsc"},
"groups":[{"group_id":2, "admin":True}, {"group_id":3, "admin":False},{"group_id":4, "admin":False}]
}

user6 = {"user_id":6, "username":"grassleysenate","email":"cgrassley@sbcglobal.net", "password":"iloveiowa",
"first_name":"Charles", "last_name":"Grassley", "display_name":"Chuck G", "body_type":["avg"],
"height":70, "weight":None, "birth_date":"1933-09-17", "gender":"man","pronouns":"they/them",
"gender_pref":["woman", "man"],  "sex_position": "top", "std_date":"2018-07-21", "have_std":False, "std_desc":None,
"prof_desc":"Let me suck on that cob like we do in Iowa",
"avatar_photo":"https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Chuck_Grassley.jpg",
"photos":{
    "public":["https://s3.amazonaws.com/ballotpedia-api4/files/thumbs/200/300/Chuck_Grassley.jpg","https://www.rollingstone.com/wp-content/uploads/2018/11/angry-chuck-grassley-supports-racist-steve-king.jpg","https://images.wsj.net/im-261389?width=1280&size=1","https://www.bleedingheartland.com/static/media/2021/03/ChuckGrassleycampaignFacebook-cropped-700x478.jpg","https://cdn.theatlantic.com/thumbor/V2wn-C56FZv8lyFx7Qlh-LFJVBA=/59x92:1139x1172/1080x1080/media/img/mt/2016/04/AP040629015534/original.jpg"],
    "private":["https://www.rollingstone.com/wp-content/uploads/2018/11/angry-chuck-grassley-supports-racist-steve-king.jpg","https://images.wsj.net/im-261389?width=1280&size=1","https://www.bleedingheartland.com/static/media/2021/03/ChuckGrassleycampaignFacebook-cropped-700x478.jpg"]
    },
"socials":{"instagram":"@senatorchuckgrassley"},
"groups":[{"group_id":3, "admin":True}, {"group_id":4, "admin":False}]
}

user7 = {"user_id":7, "username":"amyk","email":"aklobuckar@senate.gov", "password":"password123",
"first_name":"Amy", "last_name":"Klobuchar", "display_name":"Amy", "body_type":["athletic","curvy"],
"height":63, "weight":None, "birth_date":"1960-05-25", "gender":"woman",
"pronouns":"she/hers", "gender_pref":["woman", "transw"],
"sex_position":"top", "std_date":None, "have_std":False, "std_desc":None,
"prof_desc":"Looking for a fun group of gals",
"avatar_photo":"https://static01.nyt.com/images/2021/07/18/us/politics/18dc-hulse1/merlin_190928565_8ce4c8b2-c5d0-473b-9a15-c1f09e5c35ea-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
"photos":{
    "public":["https://static01.nyt.com/images/2021/07/18/us/politics/18dc-hulse1/merlin_190928565_8ce4c8b2-c5d0-473b-9a15-c1f09e5c35ea-articleLarge.jpg?quality=75&auto=webp&disable=upscale","https://amyklobuchar.com/wp-content/uploads/2020/05/20180601_AJK_family-5849-3.jpg","https://cdn.britannica.com/36/216136-050-2FDC0E79/Minnesota-Senator-Amy-Klobuchar-2019.jpg","https://static.billboard.com/files/media/Senator-Amy-Klobuchar-nov-2019-billboard-1548-compressed.jpg"],
    "private":["https://static01.nyt.com/newsgraphics/2019/08/01/candidate-pages/10b3bbadbaa79dd75c549bc03e7846162fc074ce/klobuchar.jpg","https://assets.vogue.com/photos/5c3ccc17337cb72ccf20a6f1/1:1/w_3039,h_3039,c_limit/amy-klobuchar.jpg","https://www.gannett-cdn.com/presto/2019/09/21/PDEM/e5e1239d-8ace-44e7-9594-019ff629e565-0921_steakfry_080.JPG"]
    },
"socials":{}, "groups":[{"group_id":1, "admin":False},{"group_id":3, "admin":True}]
}

user8 = {"user_id":8, "username":"diannecali","email":"dfeinstein@senate.gov", "password":"grandma69",
"first_name":"Dianne", "last_name":"Feinstein", "display_name":"Dianne", "body_type":["thin"],
"height":None, "weight":None, "birth_date":"1933-06-22", "gender":"nonbin","pronouns":"she/hers",
"gender_pref":["man", "nonbin"], "sex_position":None, "std_date":"1998-11-27", "have_std":False, "std_desc":None,
"prof_desc":"I may be old but I'm feisty",
"avatar_photo":"https://cdn.britannica.com/16/115816-050-43698D68/Dianne-Feinstein.jpg",
"photos":{
    "public":["https://cdn.britannica.com/16/115816-050-43698D68/Dianne-Feinstein.jpg","https://ww2.hdnux.com/photos/74/04/52/16400373/5/900x0.jpg?555","https://www.mercurynews.com/wp-content/uploads/2020/12/SJM-Z-WALTERS-1215-1.jpg?w=1555","https://project-orion-production.s3.amazonaws.com/uploads/content/3185/DianneFeinsteinProfile.jpg","https://cdn.theatlantic.com/thumbor/6hDNNcLw7uRHh3qmhIepr1r0Ai0=/237x0:3264x2270/1200x900/media/img/mt/2019/02/RTR37JHY/original.jpg"],
    "private":["https://ww2.hdnux.com/photos/74/04/52/16400373/5/900x0.jpg?555","https://www.mercurynews.com/wp-content/uploads/2020/12/SJM-Z-WALTERS-1215-1.jpg?w=1555","https://cdn.theatlantic.com/thumbor/6hDNNcLw7uRHh3qmhIepr1r0Ai0=/237x0:3264x2270/1200x900/media/img/mt/2019/02/RTR37JHY/original.jpg"]},
"socials":{"twitter":"@SenFeinstein"}, "groups":[{"group_id":3, "admin":False}]
}

user9 = {"user_id":9, "username":"jhlovestrump","email":"jhawley@trump.com", "password":"rigged",
"first_name":"Joshua", "last_name":"Hawley", "display_name":"Josh", "body_type":["thin","athletic","toned"],
"height":75, "weight":None, "birth_date":"1979-12-31", "gender":"transm","pronouns":"they/them",
"gender_pref":["woman","man", "transw","transm", "nonbin"], "sex_position":"bottom", "std_date":"2021-03-21",
"std_date":None, "have_std":True, "std_desc":"xenophobia",
"prof_desc":"I may have gone to Yale, but I'm a fucking jackass",
"avatar_photo":"https://upload.wikimedia.org/wikipedia/commons/3/31/Josh_Hawley%2C_official_portrait%2C_116th_congress.jpg",
"photos":{
    "public":["https://upload.wikimedia.org/wikipedia/commons/3/31/Josh_Hawley%2C_official_portrait%2C_116th_congress.jpg","https://bloximages.newyork1.vip.townnews.com/columbiamissourian.com/content/tncms/assets/v3/editorial/4/da/4da220ee-e252-11e8-be86-5fb3cd93f391/5be2801e95dc3.image.jpg","https://images.newrepublic.com/f56b2bac46a74269d17df6ad7a4641d1d6f03cc5.jpeg?w=1109&h=577&crop=faces&fit=crop&fm=jpg","https://ca-times.brightspotcdn.com/dims4/default/cccb299/2147483647/strip/true/crop/6000x4000+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdf%2Fc6%2Fd0ac57ad448cbd7a6dfe92767e23%2Fgettyimages-1189430885.jpg","https://callnewspapers.com/wp-content/uploads/HawleyInBallwin_32-e1541696808594-683x1024.jpg"],
    "private":["https://reason.com/wp-content/uploads/2020/05/Screen-Shot-2020-05-08-at-12.31.28-PM-1200x630.jpeg","https://images.newrepublic.com/f56b2bac46a74269d17df6ad7a4641d1d6f03cc5.jpeg?w=1109&h=577&crop=faces&fit=crop&fm=jpg","https://ca-times.brightspotcdn.com/dims4/default/cccb299/2147483647/strip/true/crop/6000x4000+0+0/resize/1486x991!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fdf%2Fc6%2Fd0ac57ad448cbd7a6dfe92767e23%2Fgettyimages-1189430885.jpg","https://callnewspapers.com/wp-content/uploads/HawleyInBallwin_32-e1541696808594-683x1024.jpg"]
    },
"socials":{"twitter":"@HawleyMO"}, "groups":[{"group_id":3, "admin":False},{"group_id":4, "admin":False}]
}

user10 = {"user_id":10, "username":"apadilla","email":"alexpadilla@senate.gov", "password":"filibuster",
"first_name":"Alejandro", "last_name":"Padilla", "display_name":"Alex", "body_type":["thin","avg"],
"height":72, "weight":None, "birth_date":"1973-03-22", "gender":"nonbin", "pronouns":"they/them",
"gender_pref":["woman", "transw", "nonbin"], "sex_position":None,
"std_date":"2020-01-15", "have_std":False, "std_desc":None, "prof_desc":"Cali born and raised",
"avatar_photo":"http://www.padilla.senate.gov/wp-content/uploads/Padilla_Alex-Headshot-2021-3-scaled.jpg",
"photos":{
    "public":["http://www.padilla.senate.gov/wp-content/uploads/Padilla_Alex-Headshot-2021-3-scaled.jpg","https://i1.wp.com/calmatters.org/wp-content/uploads/2020/12/AP_AlexPadilla_2019_01.jpg?fit=1200%2C850&ssl=1","https://ww2.kqed.org/app/uploads/sites/10/2016/02/Padilla-1440x883.jpg","https://www.californiamuseum.org/sites/main/files/imagecache/lightbox/main-images/alex-padilla-opt.png"],
    "private":["https://i1.wp.com/calmatters.org/wp-content/uploads/2020/12/AP_AlexPadilla_2019_01.jpg?fit=1200%2C850&ssl=1","https://ww2.kqed.org/app/uploads/sites/10/2016/02/Padilla-1440x883.jpg","https://www.gannett-cdn.com/presto/2021/07/17/PVIT/81e190fd-511a-44bf-84c8-fa3917570395-0716_DosPalos-water_5495.jpg"]
    },
"socials":{}, "groups":[{"group_id":2, "admin":False}, {"group_id":3, "admin":False}]
}


#create a dictionary for each sample group
group1 = {"group_id":1, "group_name":"Failed Prez Candidates", "time":"2021-08-16 05:00:24",
"group_desc":"We lost hard races, now we ride hard c***s.",
"gender_pref":["woman","man","transw","transm","nonbin"],
"body_pref":["thin","avg","athletic","toned","muscular","curvy","thick","plus"], "size":5 ,"max_size":10}

group2 = {"group_id":2, "group_name":"BudgetHoes", "time":"2021-08-12 16:25:00",
"group_desc":"Reconciliate it with us", "gender_pref":["woman", "man"],
"body_pref":["thin","avg","athletic","toned","muscular","thick"],  "size":4 ,"max_size":8}

group3 = {"group_id":3, "group_name":"JudiciarySluts", "time":"2021-07-12 16:25:00",
"group_desc":"After years of overseeing the department of justice, we've begun overseeing our bodies(;",
"gender_pref":["woman","man", "transm", "nonbin"],
"body_pref":["thin","avg","athletic","toned","muscular","curvy","thick","plus"], "size":7 ,"max_size":8}

group4 = {"group_id":4, "group_name":"Trump's Babes", "time":"2021-08-12 00:25:00",
"group_desc":"We simp for daddy Trump. Don't apply if you're vaxxed.", "gender_pref":["woman","man","transw","nonbin"],
"body_pref":["thin","avg","athletic","toned","muscular","curvy","thick","plus"], "size":4, "max_size":10}


sample_users = []
sample_groups = []
def main():
    #create list of user dictionaries
    sample_users.append(user1)
    sample_users.append(user2)
    sample_users.append(user3)
    sample_users.append(user4)
    sample_users.append(user5)
    sample_users.append(user6)
    sample_users.append(user7)
    sample_users.append(user8)
    sample_users.append(user9)
    sample_users.append(user10)

   #create list of group dictionaries
    sample_groups.append(group1)
    sample_groups.append(group2)
    sample_groups.append(group3)
    sample_groups.append(group4)
main()