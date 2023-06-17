create procedure deleteAnswer (@aid varchar(255))
as 
begin
update  Answers set isDeleted=1
where aid=@aid 
end