create procedure addUser (@uid VARCHAR(255) , @username VARCHAR(255), 
@email VARCHAR(255) ,@password VARCHAR(100))
AS
BEGIN 
INSERT INTO Users(uid,username,email,password)
VALUES( @uid, @username,@email, @password)
END