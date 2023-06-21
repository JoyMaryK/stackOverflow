create proc updateUserForPreferred(@uid varchar(255), @aid varchar(255))
as 
begin 
UPDATE Answers SET emailSent=1 WHERE uid=@uid and aid=@aid
end