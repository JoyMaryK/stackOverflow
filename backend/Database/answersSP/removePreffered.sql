create procedure removePreffered( @aid varchar(255))
as 
begin
update Answers set isPrefered =0
where aid=@aid
end