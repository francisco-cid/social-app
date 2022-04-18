from flask import Flask, render_template, request, send_from_directory, make_response, session
from backend.models import app, db, User, Group, Photo, SocialHandle, GroupUser
from backend.queries import (get_all_users, add_user, get_one_user, check_cred, get_all_groups, get_one_group,
query_user_groups, edit_user, create_group, create_invitation, create_application, add_vote, create_rejection,
query_invites, query_applicants)

#GET: returns data for all users, POST: adds new user to db
@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        response = get_all_users()
        return make_response({
            'users': response
        }, 200)

    if request.method == 'POST':
        data = request.json
        new_user_id = add_user(data)
        session["user_id"] = new_user_id
        return make_response('user added',200)

#GET: returns data from user associated with given user_id
#POST: makes changes to user information
@app.route('/api/users/<int:user_id>', methods=['GET', 'POST'])
def get_user(user_id):
    if request.method == "GET":
        response = get_one_user(user_id)
        if response == "404 user not found":
            return make_response(response, 404)
        else:
            return make_response(response, 200)
    if request.method == "POST":
        data = request.json
        response = edit_user(user_id, data)
        if response == "404 user not found":
            return make_response(response, 404)
        else:
            return make_response(response, 200)

#GET: returns user data for user currently logged in
@app.route('/api/users/myprofile')
def get_profile():
    try:
        user_id = session["user_id"]
    except:
        user_id = 1
    response = get_one_user(user_id)
    return make_response(response, 200)

#PUT: makes changes to user information
@app.route('/api/users/edit', methods=['PUT'])
def edit_profile():
    data = request.json
    try:
        user_id = session['user_id']
    except:
        user_id = 1
    response = edit_user(user_id, data)
    return make_response(response, 200)


#POST: verifies user credentials (username/email, password) and checks that they match with a user in db
@app.route('/api/verify', methods=["POST"])
def verify_user():
    credentials = request.json
    verification, user_id = check_cred(credentials)
    if verification == "404 user not found":
        return make_response(verification, 404)
    elif verification == False:
        return make_response("401 credentials don't match", 401)
    elif verification == True:
        session["user_id"] = user_id
        return make_response("authenticated", 200)


#GET: returns data for all groups including all data for every user in each group
#POST: creates a new group
@app.route('/api/groups', methods=["GET", "POST"])
def groups():
    if request.method == "GET":
        response = get_all_groups()
        return make_response({'groups':response}, 200)
    elif request.method == "POST":
        data = request.json
        try:
            creator_id = session["user_id"]
        except:
            creator_id = 1
        create_group(data, creator_id)
        return make_response('group added', 200)
#GET: returns group data (along with member's user data) of group with given group_id
@app.route('/api/groups/<int:group_id>')
def get_group(group_id):
    response = get_one_group(group_id)
    if response=="404 group not found":
        return(response, 404)
    else:
        return make_response(response, 200)

#GET: returns all data for all groups a given user is in
@app.route('/api/users/<int:user_id>/groups')
def get_user_groups(user_id):
    response = query_user_groups(user_id)
    if response == "404 user not found":
        return(response, 404)
    else:
        return make_response({"groups":response}, 200)

#GET: returns all data for all groups the user that is logged in is a member of
@app.route('/api/users/mygroups')
def get_mygroups():
    try:
        user_id = session["user_id"]
    except:
        user_id = 1
    response = query_user_groups(user_id)
    return make_response({"groups":response}, 200)

#POST: invite user to a group
@app.route('/api/groups/invite', methods=['POST'])
def invite_user():
    data = request.json
    try:
        inviter = session["user_id"]
    except:
        inviter = 1
    response = create_invitation(data["group_id"], data["candidate_id"], inviter)
    return make_response(response, 200)

#POST: apply to a group or accept an invitation
@app.route('/api/groups/apply', methods=["POST"])
def apply_group():
    data = request.json
    response = create_application(data["group_id"],data["candidate_id"])
    return make_response(response, 200)

#PUT: user votes to include applicant to group
@app.route('/api/groups/vote', methods=["PUT"])
def vote_group():
    data = request.json
    try:
        voter_id = session["user_id"]
    except:
        voter_id = 2
    response = add_vote(data["group_id"], data["candidate_id"], voter_id)
    return make_response(response[0], response[1])

#PUT: votes no on on accepting an applicant, rejecting them from group
@app.route('/api/groups/reject', methods=['PUT'])
def reject_applicant():
    data = request.json
    response = create_rejection(data["group_id"], data["candidate_id"])
    print(response)
    return make_response(response[0],response[1])

#GET: returns group info of groups have who sent invitations to logged in user
@app.route('/api/users/invitations', methods=['GET'])
def get_invitations():
    try:
        user_id = session["user_id"]
    except:
        user_id = 1
    response = query_invites(user_id)
    return make_response(response[0], response[1])

#GET: returns user info for applicants to a group
@app.route('/api/groups/<int:group_id>/applicants', methods=['GET'])
def get_applicants(group_id):
    response = query_applicants(group_id)
    return make_response(response[0], response[1])
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, threaded=True, debug=True)