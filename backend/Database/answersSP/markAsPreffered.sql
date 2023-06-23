create procedure markAsPreffered( @aid varchar(255))
as 
begin
update Answers set isPrefered =1
where aid=@aid
end