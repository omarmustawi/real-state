

http://127.0.0.1:8000/ {
    api/{
        register/ ==> post ,in body: full_name, email, and password.
        login/ ==>post , in body:   email, and password.
        users/ ==> get , token's owner in header .
        users/<int:pk>/ ===> { 
            get --> token in header. (info detail about user someone)
            delete --> token's owner in header . 
        }
        property-list/ ==> {
            get --> there is no need to pass anything (get all advertisment)
            post --> token's user and id user for adviser field (create advertisment)
        },
        property-detail/<int:pk>/ ==> {
            get --> token's user
            put --> token's advisr, and all fields in body
            delete --> token if you adviser or owner, you can delete 
        }
        my-properties/<int:pk>/ ==> {
            get --> You have to pass token in header. the response will content all property that the owner of token created
        }
    }
}