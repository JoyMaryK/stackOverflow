create procedure getAllUsers 

AS
BEGIN 


select * from Users WHERE isDeleted = 0

END