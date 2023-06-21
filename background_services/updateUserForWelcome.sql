create proc updateUserForWelcome(@uid varchar(255))
as 
begin 
UPDATE Users SET emailSent=1 WHERE uid=@uid
end