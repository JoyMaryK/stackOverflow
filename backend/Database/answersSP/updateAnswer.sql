create procedure updateAnswer (@aid varchar(255), @uid varchar(255), @answer text)
as 
begin
update  Answers set answer=@answer 
where aid=@aid and uid=@uid
end