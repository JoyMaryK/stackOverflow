create proc getUsersForWelcome
AS
begin
 SELECT * FROM USERS WHERE emailSent=0
	end