create procedure getUserByEmail(@email varchar (255))

AS
BEGIN 


select * from Users where email=@email and isDeleted=0

END