create procedure deleteUser (@uid VARCHAR(255))

AS
BEGIN 

update Users set isDeleted =1 where uid=@uid

END