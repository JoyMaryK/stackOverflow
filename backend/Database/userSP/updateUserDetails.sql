create or alter procedure updateUserDetails (@uid VARCHAR(255) , @username VARCHAR(255), 
@email VARCHAR(255) ,@location varchar(255), @about varchar(255))

AS
BEGIN 

update Users
set username= @username,email=@email,location=@location,about=@about
where uid=@uid
END