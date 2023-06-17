create procedure getUserById(@uid varchar (255))

AS
BEGIN 


select * from Users where uid=@uid and isDeleted=0

END