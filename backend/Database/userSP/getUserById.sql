create procedure getUserById(@uid varchar (255))

AS
BEGIN 


select * from Users where uid=@uid

END